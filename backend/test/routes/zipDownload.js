/* eslint-disable no-unused-expressions */

import { expect } from 'chai'
import crypto from 'crypto'
import fs from 'fs'
import tar from 'tar'
import path from 'path'
import request from 'supertest'

import server from '../../server'
import config from '../../config'
import { fakeShow, fakeImageEntry, fakeGroup, fakeUser } from '../factories'
import User from '../../models/user'
import { signToken } from '../../helpers/jwt'
import { ADMIN, STUDENT } from '../../constants'
import { doesNotMatch } from 'assert'

const binaryParser = (res, callback) => {
  // taken from https://stackoverflow.com/q/13573315
  res.setEncoding('binary')
  res.data = ''
  res.on('data', function (chunk) {
    res.data += chunk
  })
  res.on('end', function () {
    callback(null, Buffer.from(res.data, 'binary'))
  })
}

const hash = (data) => crypto.createHash('md5').update(data).digest('hex')

describe('downloading a zip file', () => {
  const fileAPath = path.join(config.get('upload:imageDir'), 'imageA.jpg')
  const fileBPath = path.join(config.get('upload:imageDir'), 'imageB.jpg')
  const fileAHash = hash(fs.readFileSync(path.join(__filename, '../../resources/validTest.jpg')))
  const fileBHash = hash(fs.readFileSync(path.join(__filename, '../../resources/validTest2.jpg')))
  const token = signToken({type: ADMIN, username: 'myuser1'})

  before(() => {
    // move the test resources into place, as if they were uploaded
    fs.copyFileSync(
      path.join(__filename, '../../resources/validTest.jpg'),
      fileAPath
    )
    fs.copyFileSync(
      path.join(__filename, '../../resources/validTest2.jpg'),
      fileBPath
    )
  })

  after(() => {
    fs.unlinkSync(fileAPath)
    fs.unlinkSync(fileBPath)
  })

  it('forbids non-admins', () =>
    request(server)
      .get(`/zips/1?token=${signToken({type: STUDENT, username: 'myuser2'})}`)
      .expect(401)
  )

  it('requires a token', () =>
    request(server)
      .get(`/zips/1`)
      .expect(401)
  )

  it('404s on non-existing shows', () =>
    request(server)
      .get(`/zips/1?token=${token}`)
      .expect(404)
  )

  it('Downloads an empty zip for a show with no submissions', (done) => {
    fakeShow({name: 'myShow'})
      .then(show => {
        var files = [];
        request(server)
          .get(`/zips/${show.id}?token=${token}`)
          .buffer().pipe(tar.t()).on('entry', entry => {
            files.push(entry.path)
          })
          setTimeout(()=>{
            expect(files.length)
            .to.eq(0, 'Files Present: ' + files.length + '\nshould have no files')
            done()
          }, 500)
        })
  })
  

  it('Downloads a single student submitted image', (done) => {
    fakeShow({name: 'Honors Show'})
      .then((show) =>
        fakeImageEntry({invited: true, path: 'imageA.jpg', show})
          .then(entry =>
            User.findById(entry.studentUsername)
              .then(user => {
                var files = []
                request(server)
                  .get(`/zips/${entry.showId}?token=${token}`)
                  .buffer()
                  .pipe(tar.t()).on('entry', entry => {
                    files.push(entry.path)
                  })
                  setTimeout(()=>{
                    expect(files.length).to.eq(1, 'Files Present: ' + files.length + '\nshould have one file')
                    expect(files).to.include(`${show.name}/Invited/${user.lastName}, ${user.firstName} - ${entry.title}.jpg`
                    , 'Files Present: ' + files + `\nshould contain file:\n ${show.name}/Invited/${user.lastName}, ${user.firstName} - ${entry.title}.jpg\n`)
                    done()
                  }, 500)
                  
                })
              )
          )
              })
  

  it('downloads a single group-submitted image', (done) => {
    fakeUser({
      username: 'jxs9324',
      firstName: 'John',
      lastName: 'Smith'
    })
      .then(user => Promise.all([fakeShow({name: 'Honors Show'}), fakeGroup({user})])
        .then(([show, group]) => [show, group, user]))
      .then(([show, group, user]) =>
        fakeImageEntry({invited: true, path: 'imageB.jpg', group, show, user})
          .then(entry =>{
            var files = []
              request(server)
                .get(`/zips/${entry.showId}?token=${token}`)
                .buffer().pipe(tar.t()).on('entry', entry => {
                    files.push(entry.path)
                })
                setTimeout(()=>{
                  expect(files.length).to.eq(1, 'Files Present: ' + files.length + '\nshould have one file')
                  expect(files).to.include(`${show.name}/Invited/${user.lastName}, ${user.firstName} & ${group.participants} - ${entry.title}.jpg`
                  , 'Files Present: ' + files + `\nshould contain file:\n ${show.name}/Invited/${user.lastName}, ${user.firstName} & ${group.participants} - ${entry.title}.jpg\n`)
                  done()
                }, 500)
              })
          )
            })
  

  it('disambiguates untitled submissions', (done) => {
    Promise.all([fakeShow({name: 'Honors Show'}), fakeUser()])
      .then(([show, user]) =>
        Promise.all([
          fakeImageEntry({title: 'Untitled', path: 'imageA.jpg', invited: true, user, show}),
          fakeImageEntry({title: 'Untitled', path: 'imageB.jpg', invited: true, user, show})
        ]).then(([entry1, entry2]) => {
          var files = []
            request(server)
              .get(`/zips/${entry1.showId}?token=${token}`)
              .buffer().pipe(tar.t()).on('entry', entry => {
                  files.push(entry.path)
              })
              setTimeout(()=>{
              expect(files.length).to.eq(2, 'Files Present: ' + files.length + '\nshould have two files')
              expect(files).to.include(`${show.name}/Invited/${user.lastName}, ${user.firstName} - Untitled.jpg`
              , 'Files Present: ' + files + `\nshould contain file:\n ${show.name}/Invited/${user.lastName}, ${user.firstName} - Untitled.jpg\n`)
              expect(files).to.include(`${show.name}/Invited/${user.lastName}, ${user.firstName} - Untitled (1).jpg`
              , 'Files Present: ' + files + `\nshould contain file:\n ${show.name}/Invited/${user.lastName}, ${user.firstName} - Untitled (1).jpg\n`)
              done()
              }, 500)
            })
        )
          })
  

  it('creates non-invited folder for submissions correctly', (done) => {
    Promise.all([fakeShow({name: 'Honors Show'}), fakeUser()])
    .then(([show, user]) =>
      Promise.all([
        fakeImageEntry({title: 'Untitled', path: 'imageA.jpg', invited: true, user, show}),
        fakeImageEntry({title: 'Titled', path: 'imageB.jpg', invited: false, user, show})
      ]).then(([entry1, entry2]) => {
        var files = [];
          request(server)
            .get(`/zips/${entry1.showId}?token=${token}`)
            .buffer().pipe(tar.t()).on('entry', entry => {
                files.push(entry.path)
            })
            setTimeout(()=>{
              expect(files.length).to.eq(2, 'Files Present: ' + files.length + '\nshould have two files')
              expect(files).to.include(`${show.name}/Invited/${user.lastName}, ${user.firstName} - Untitled.jpg`
              , 'Files Present: ' + files + `\nshould contain file:\n ${show.name}/Invited/${user.lastName}, ${user.firstName} - Untitled.jpg\n`)
              expect(files).to.include(`${show.name}/Not Invited/${user.lastName}, ${user.firstName} - Titled.jpg`
              , 'Files Present: ' + files + `\nshould contain file:\n ${show.name}/Not Invited/${user.lastName}, ${user.firstName} - Titled.jpg\n`)
              done()
            }, 500)
          })
      )
        })

  it('supports submissions that have emoji in their title', (done) => {
    Promise.all([fakeShow({name: 'Honors Show'}), fakeUser({firstName: '☕️', lastName: '🍰'})])
      .then(([show, user]) =>
        fakeImageEntry({invited: true, path: 'imageA.jpg', title: '🚀🌈❤️', show, user})
          .then(entry =>{
            var files = []
              request(server)
                .get(`/zips/${entry.showId}?token=${token}`)
                .buffer().pipe(tar.t()).on('entry', entry => {
                    files.push(entry.path)
                })
                setTimeout(()=>{
                  expect(files.length).to.eq(1, 'Files Present: ' + files.length + '\nshould have one file')
                  expect(files).to.include(`${show.name}/Invited/${user.lastName}, ${user.firstName} - 🚀🌈❤️.jpg`
                  , 'Files Present: ' + files + `\nshould contain file:\n ${show.name}/Invited/${user.lastName}, ${user.firstName} - 🚀🌈❤️.jpg\n`)
                  done()
                }, 500)
              })
          )
            })
})
