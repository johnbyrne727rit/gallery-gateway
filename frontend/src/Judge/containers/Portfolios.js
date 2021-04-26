import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { useParams } from 'react-router-dom'
import PortfoliosQuery from '../queries/portfolios.graphql'
import Portfolios from '../components/Portfolios'
import { displayError } from '../../shared/actions'


const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		handleError: message => dispatch(displayError(message)),
		id: ownProps.id
	};
};

export default compose(
	connect(null, mapDispatchToProps),
	graphql(PortfoliosQuery, {
		options: ownProps => ({
	  		variables: {
	    		"id": ownProps.id
	  		}
	    }),
	    props: ({ data: { portfolioPeriod, loading, error } }) => 
	    {
	    	console.log(loading)
	    	return{
		    	period: portfolioPeriod,
		    	loading,
		    	error
		    }
	    }
	})
)(Portfolios)
