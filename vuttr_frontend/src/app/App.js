import React, { useEffect } from 'react';
import { BrowserRouter } from "react-router-dom";
import * as AppActions from './AppActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Row,
  Col,
} from 'reactstrap'
import './App.css';

export function App(props) {

  useEffect(() => {
    if (props.fetchState === "todo") {
      props.actions.fetchTools(undefined, 0, 999);
    }
  });

  let loading = "";
  if (props.fetchState === "loading") {
    loading = (
      <Row>
        <Col>
          Loading...
        </Col>
      </Row>
    );
  }

  return (
    <BrowserRouter>
      {loading}
      <Row>
        <Col>
          <ul>
            {props.tools.map(tool =>
              <li key={tool.id}>
                {tool.title}
              </li>
            )}
          </ul>
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
)(App)