import React from 'react'
import PropTypes from 'prop-types'

import CheckboxTable from 'shared/components/CheckboxTable'

const ScholarshipsTable = props => (
  <CheckboxTable
    columns={props.studentView ? ([{
      Header: 'Scholarship Name',
      accessor: 'name'
    },
    {
      Header: 'Required Photos',
      accessor: 'requiredPhotos'
    }])
      : ([
        {
          Header: 'Scholarship Name',
          accessor: 'name'
        }])
    }
    data={props.scholarships}
    unique='id'
    selected={props.selected}
    onChange={props.onChange}
  />
)

ScholarshipsTable.propTypes = {
  scholarships: PropTypes.array.isRequired,
  selected: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  studentView: PropTypes.bool.isRequired
}

ScholarshipsTable.defaultProps = {
  scholarships: [],
  selected: {}
}

export default ScholarshipsTable
