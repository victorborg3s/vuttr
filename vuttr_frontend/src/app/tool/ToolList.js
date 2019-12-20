import React from "react";
import {
  Col,
  Row,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardText,
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import * as _ from "lodash/core";

const ToolList = ({
  data,
  onRemove,
}) => {
  return (
    <Row>
      <Col>
        <TransitionGroup className="todo-list">
          {data.map(tool => (
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
                    <Button onClick={() => onRemove(tool)} color="link">
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
  );
};

export default ToolList;
