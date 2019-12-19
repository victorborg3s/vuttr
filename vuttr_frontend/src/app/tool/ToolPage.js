import React, { useState, useEffect } from "react";
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
  CardText,
  Spinner
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import * as _ from "lodash/core";
import ToolModalForm from "./ToolModalForm";
import * as ToolActions from "./ToolActions";
import { DataStatus } from "../../utils";
import "./ToolPage.css";

const ToolPage = ({
  dataStatus,
  dataHasMore,
  actions,
  dataPage,
  filteredData,
  searchOnlyTags,
  searchTerm,
  isFormOpen
}) => {
  useEffect(() => {
    window.onscroll = () => {
      if (
        dataHasMore &&
        dataStatus === DataStatus.LOADED &&
        window.innerHeight + document.documentElement.scrollTop >=
          0.7 * document.documentElement.offsetHeight
      ) {
        actions.fetch(dataPage, false);
      }
    };
    return () => {
      window.onscroll = undefined;
    }
  });

  useEffect(() => {
    actions.fetch(0);
  }, [actions]);

  const [tool, setTool] = useState({
    title: "",
    link: "",
    description: "",
    tags: ""
  });

  const toggleSearchOnlyTags = () => {
    actions.applyFilter(!searchOnlyTags, searchTerm);
  };
  const onSearchTermChange = event => {
    actions.applyFilter(searchOnlyTags, event.target.value);
  };

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
        if id is empty, react will launch a warning:
        "Each child in a list should have a unique "key" prop."
      */
      id: _.uniqueId(),
      tags: tool.tags.split(" ")
    };
    actions.save(newTool);
    setTool({ title: "", link: "", description: "", tags: "" });
  };

  let loading = "";
  if (dataStatus !== DataStatus.LOADED) {
    loading = (
      <Row>
        <Col style={{ textAlign: "center" }}>
          <Spinner color="primary" />
        </Col>
      </Row>
    );
  }

  return (
    <>
      <ToolModalForm
        isOpen={isFormOpen}
        toggle={actions.toggleForm}
        tool={tool}
        inputChangeHandler={toolInputChange}
        onSave={toolSave}
        onCancel={actions.toggleForm}
      />
      <Row>
        <Col>
          <Input
            type="search"
            name="search"
            id="search"
            placeholder="search"
            value={searchTerm}
            onChange={onSearchTermChange}
          />
        </Col>
        <Col className="vcenter">
          <Label check>
            <Input
              type="checkbox"
              value={searchOnlyTags}
              onChange={toggleSearchOnlyTags}
            />{" "}
            search in tags only
          </Label>
        </Col>
        <Col className="vcenter">
          <div className="float-right">
            <Button onClick={actions.toggleForm} color="primary">
              <MdAdd color="white" />
              add
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <TransitionGroup className="todo-list">
            {filteredData.map(tool => (
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
                      <Button onClick={() => actions.remove(tool)} color="link">
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
