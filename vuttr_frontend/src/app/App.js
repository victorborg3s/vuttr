import React, { useEffect, useState } from "react";
import { useToolForm } from './useToolForm';
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
  CardText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  FormText,
} from "reactstrap";
import { Login } from './auth';
import { Routes } from "../routes";
import "./App.css";

export function App(props) {
  useEffect(() => {
    if (props.fetchState === "todo") {
      props.actions.fetchTools(undefined, 0, 999);
    }
  });

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const createTool = () => {
    let tool = {
      title: inputs.title,
      link: inputs.link,
      description: inputs.description,
      tags: inputs.tags.split(' ')
    };
    console.log(tool);
    props.actions.saveTool(tool);
  }
  const { handleSubmit, handleInputChange, inputs } = useToolForm(createTool);

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
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggle}><MdAdd color="black" />Add new tool</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="toolTitle">Tool Name</Label>
              <Input type="text" name="title" id="toolTitle" onChange={handleInputChange} value={inputs.title} />
            </FormGroup>
            <FormGroup>
              <Label for="toolLink">Tool Name</Label>
              <Input type="text" name="link" id="toolLink" onChange={handleInputChange} value={inputs.link} />
            </FormGroup>
            <FormGroup>
              <Label for="toolDescription">Tool Description</Label>
              <Input type="textarea" name="description" id="toolDescription" onChange={handleInputChange} value={inputs.description} />
            </FormGroup>
            <FormGroup>
              <Label for="toolTags">Tags</Label>
              <Input type="text" name="tags" id="toolTags" onChange={handleInputChange} value={inputs.tags} />
              <FormText color="muted">
                Put any number of tags separated by one white space between each one
              </FormText>
            </FormGroup>
            <Button onClick={handleSubmit}>Submit</Button>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
      <Container>
        <Row>
          <Col>
            <Navbar color="light" light={true} expand="md" fixed="fixed">
              <Container>
                <NavbarBrand href="/">VUTTR</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                  <Nav className="mr-auto" navbar>
                  </Nav>
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
              <Button onClick={toggleModal} color="primary">
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
                    <Button color="link" onClick={() => window.open(tool.link, "_blank")}>{tool.title}</Button>
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
