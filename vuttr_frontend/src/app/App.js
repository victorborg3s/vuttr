import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import * as AppActions from "./AppActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Col,
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Row,
} from "reactstrap";
import { Login } from "./auth";
import { Routes } from "../routes";
import "./App.css";

function App(props) {

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const toggleMenu = () => setMenuIsOpen(!menuIsOpen);

  return (
    <BrowserRouter>
      <Container>
        <Row>
          <Col>
            <Navbar color="light" light={true} expand="md" fixed="fixed">
              <Container>
                <NavbarBrand href="/">VUTTR</NavbarBrand>
                <NavbarToggler onClick={toggleMenu} />
                <Collapse isOpen={menuIsOpen} navbar>
                  <Nav className="mr-auto" navbar></Nav>
                  <Nav>
                    <Login />
                  </Nav>
                </Collapse>
              </Container>
            </Navbar>
          </Col>
        </Row>
        <Row>
          <Col className="page-title">
            <h3>Very Useful Tools to Remember</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col>
            <Routes {...props} />
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
}

const mapStateToProps = state => state.AppReducer;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
