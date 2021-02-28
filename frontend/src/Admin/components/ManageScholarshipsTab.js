import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'reactstrap'

import ScholarshipSelectorTable from "../../shared/components/ScholarshipSelectorTable";
import ScholarshipSelectorCard from "../../shared/components/ScholarshipSelectorCard";
import Loading from "../../shared/components/Loading";
import PortfolioPeriodCard from "./PortfolioPeriodCard";
import { withRouter } from 'react-router-dom';

class ManageScholarshipsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {selected: {}};
  }

  static propTypes = {
    scholarships: PropTypes.array.isRequired,
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

  onDelete = dataPoint => {
    console.log("OnDelete");
    console.log(dataPoint);
  };

  onEdit = dataPoint => {
    console.log("OnEdit");
    console.log(dataPoint);
    this.props.history.push("/scholarship/" + dataPoint.id + "/edit");
  };

  render () {
    const { loading, scholarships } = this.props;
    return (
      <Row>
        <Col>
          {loading ? (
            <Loading />
          ) : (
            <ScholarshipSelectorTable
              selected={this.state.selected}
              dataPoints={scholarships}
              unique={"id"}
              cardTemplate={ScholarshipSelectorCard}
              onChange={this.onChange}
              cardTemplateProps={{
                onDelete: this.onDelete,
                onEdit: this.onEdit,
              }}
            />
          )}
        </Col>
      </Row>
    );
  }
}

export default withRouter(ManageScholarshipsTab)
