import React from 'react';
import { BrowserRouter } from "react-router-dom";
import * as AppActions from '../';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { 
  Row,
  Col,
} from 'reactstrap'
import './ToolsList.css';

export function ToolsList(props) {

  return (
    <BrowserRouter>
      <Row>
        <Col>
          ToolsList here!
        </Col>
      </Row>
    </BrowserRouter>
  );
}

const mapStateToProps = state => state.AppReducer;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolsList)