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
  Row,
  Input,
  Label,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardText
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Login } from "./auth";
import { Routes } from "../routes";
import { ToolModalForm } from "./tool";
import "./App.css";

function App(props) {

  useEffect(() => {
    if (props.fetchState === "todo") {
      props.actions.fetchTools(undefined, 0, 999);
    }
  });
  
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const toggleMenu = () => setMenuIsOpen(!menuIsOpen);

  const [tool, setTool] = useState({title: '', link: '', description: '', tags: ''});
  const toolInputChange = (event) => {
    event.persist();
    setTool(inputs => ({...inputs, [event.target.name]: event.target.value}));
  }
  
  const toolSave = (event) => {
    if (event) {
      event.preventDefault();
    }
    let newTool = {
      ...tool,
      /*
        if it's empty, react will launch a warning:
        "Each child in a list should have a unique "key" prop."
      */
      id: _.uniqueId(),
      tags: tool.tags.split(" ")
    }
    props.actions.saveTool(newTool);
  }

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
      <ToolModalForm
        isOpen={props.isToolFormOpen}
        toggle={props.actions.toggleToolForm}
        tool={tool}
        inputChangeHandler={toolInputChange}
        onSave={toolSave}
        onCancel={props.actions.toggleToolForm}
      />
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
              <Button onClick={props.actions.toggleToolForm} color="primary">
                <MdAdd color="white" />
                add
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <TransitionGroup className="todo-list">
              {props.tools.map(tool => (
                <CSSTransition key={tool.id} timeout={500} classNames="item">
                  <Card className="tool-card">
                    <CardHeader>
                      <div className="float-left">
                        <Button
                          color="link"
                          onClick={() => window.open(tool.link, "_blank")}
                        >
                          {tool.title}
                        </Button>
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
                </CSSTransition>
              ))}
            </TransitionGroup>
          </Col>
        </Row>
        {loading}
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
