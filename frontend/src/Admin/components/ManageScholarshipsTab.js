import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'reactstrap'

import ScholarshipSelectorTable from "../../shared/components/ScholarshipSelectorTable";
import ScholarshipSelectorCard from "../../shared/components/ScholarshipSelectorCard";
import Loading from "../../shared/components/Loading";
import PortfolioPeriodCard from "./PortfolioPeriodCard";

class ManageScholarshipsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {selected: {}};
  }

  static propTypes = {
    scholarship: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object
  };

  static defaultProps = {
    scholarship: []
  };

  onChange = newSelected => {
    console.log(newSelected);
    this.setState({selected: newSelected})
  };

  render () {
    const { loading, scholarship } = this.props;
    return (
      <Row>
        <Col>
          {loading ? (
            <Loading />
          ) : (
            <ScholarshipSelectorTable
              selected={this.state.selected}
              dataPoints={scholarship}
              unique={"id"}
              onChange={this.onChange}
              cardTemplate={ScholarshipSelectorCard}/>
          )}
        </Col>
      </Row>
    );
  }
}

export default ManageScholarshipsTab
