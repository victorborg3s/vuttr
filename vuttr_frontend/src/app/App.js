import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import * as AppActions from "./AppActions";
import * as _ from "lodash/core";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import MdAdd from "react-ionicons/lib/MdAdd";
import {
  Col,
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Input,
  Label,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardText
} from "reactstrap";
import "./App.css";

export function App(props) {
  useEffect(() => {
    if (props.fetchState === "todo") {
      props.actions.fetchTools(undefined, 0, 999);
    }
  });

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  let loading = "";
  if (props.fetchState === "loading") {
    loading = (
      <Row>
        <Col>Loading...</Col>
      </Row>
    );
  }

  return (
    <BrowserRouter>
      <Container>
        <Row>
          <Col>
            <Navbar color="light" light expand="md">
              <NavbarBrand href="/">VUTTR</NavbarBrand>
              <NavbarToggler onClick={toggle} />
              <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Options
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>Option 1</DropdownItem>
                      <DropdownItem>Option 2</DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>Reset</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </Collapse>
            </Navbar>
          </Col>
        </Row>
        <Row>
          <Col className="page-title">
            <h3>Very Useful Tools to Remember</h3>
            <hr></hr>
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              type="search"
              name="search"
              id="search"
              placeholder="search"
            />
          </Col>
          <Col className="vcenter">
            <Label check>
              <Input type="checkbox" /> search in tags only
            </Label>
          </Col>
          <Col className="vcenter">
            <div className="float-right">
              <Button color="primary">
                <MdAdd color="white" />
                add
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            {props.tools.map(tool => (
              <Card key={tool.id} className="tool-card">
                <CardHeader>
                  <div className="float-left">
                    <Button color="link" onClick={()=> window.open(tool.link, "_blank")}>{tool.title}</Button>
                  </div>
                  <div className="float-right">
                    <Button color="link">
                      <span className="x">x</span>&nbsp;remove
                    </Button>
                  </div>
                </CardHeader>
                <CardBody>
                  <CardText>
                    <span>{tool.description}</span>
                    <br />
                    <br />
                    {tool.tags.map(tag => (
                      <span key={_.uniqueId("tag_")} className="tag">
                        {"#" + tag}&nbsp;
                      </span>
                    ))}
                  </CardText>
                </CardBody>
              </Card>
            ))}
          </Col>
        </Row>
        {loading}
      </Container>
    </BrowserRouter>
  );
}

const mapStateToProps = state => state.AppReducer;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
