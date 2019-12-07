import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import MdAdd from "react-ionicons/lib/MdAdd";
import {
  Col,
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
import * as _ from "lodash/core";
import ToolModalForm from "./ToolModalForm";
import * as ToolActions from "./ToolActions";
import "./ToolPage.css";

const ToolPage = props => {
  useEffect(() => {
    if (props.fetchState === "todo") {
      props.actions.fetchTools(undefined, 0, 999);
    }
  });

  const [tool, setTool] = useState({
    title: "",
    link: "",
    description: "",
    tags: ""
  });
  const toolInputChange = event => {
    event.persist();
    setTool(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
  };

  const toolSave = event => {
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
    };
    props.actions.saveTool(newTool);
    setTool({ title: "", link: "", description: "", tags: "" });
  };

  let loading = "";
  if (props.fetchState === "loading") {
    loading = (
      <Row>
        <Col>Loading...</Col>
      </Row>
    );
  }

  return (
    <>
      <ToolModalForm
        isOpen={props.isToolFormOpen}
        toggle={props.actions.toggleToolForm}
        tool={tool}
        inputChangeHandler={toolInputChange}
        onSave={toolSave}
        onCancel={props.actions.toggleToolForm}
      />
      <Row>
        <Col>
          <Input type="search" name="search" id="search" placeholder="search" />
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
                      <Button onClick={() => props.actions.deleteTool(tool)} color="link">
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
    </>
  );
};

const mapStateToProps = state => state.ToolReducer;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ToolActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ToolPage);
