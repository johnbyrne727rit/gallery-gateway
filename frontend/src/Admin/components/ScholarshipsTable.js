import React from 'react'
import PropTypes from 'prop-types'

import CheckboxTable from 'shared/components/CheckboxTable'

const columns = [
  {
    Header: 'Scholarship',
    accessor: 'name'
  },
  {
    Header: 'Description',
    accessor: 'description'
  }
]

const ScholarshipsTable = props => (
  <CheckboxTable
    columns={columns}
    data={props.scholarships}
    unique='id'
    selected={props.selected}
    onChange={props.onChange}
    defaultSorted={[{ id: 'name', desc: false }]}
  />
)

ScholarshipsTable.propTypes = {
  scholarships: PropTypes.array.isRequired,
  selected: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

ScholarshipsTable.defaultProps = {
  scholarships: [],
  selected: {}
}

export default ScholarshipsTable
