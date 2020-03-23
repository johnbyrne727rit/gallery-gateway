import { compose } from 'recompose'
import { connect } from 'react-redux'
import { graphql } from "react-apollo";

import ScholarshipsQuery from "../queries/scholarships.graphql"
import ViewScholarshipsTab from "../components/ViewScholarshipsTab";
import { displayError } from "../../shared/actions";

const mapDispatchToProps = dispatch => ({
  handleError: message => dispatch(displayError(message))
});

export default compose(
  connect(null, mapDispatchToProps),
  graphql(ScholarshipsQuery, {
    props: ({ ownProps, data: { scholarship, loading, error } }) => ({
      scholarship,
      loading,
      error
    }),
    options: ownProps => ({
      variables: {
        periodId: ownProps.id
      }
    })
  })
)(ViewScholarshipsTab)
