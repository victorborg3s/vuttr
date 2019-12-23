import React from "react";
import {
  Col,
  Row,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardText
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import * as _ from "lodash/core";
import { HighlightedSpan } from '../commons';

const ToolList = ({ data, onRemove, searchTerm, searchOnlyTags }) => {
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
                      {searchOnlyTags
                        ? tool.title
                        : <HighlightedSpan text={tool.title} highlight={searchTerm} />
                      }
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
                    {searchOnlyTags
                        ? tool.description
                        : <HighlightedSpan text={tool.description} highlight={searchTerm} />
                      }
                    <br />
                    <br />
                    {tool.tags.map(tag => {
                      if (tag.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return <HighlightedSpan key={_.uniqueId("tag_")} text={"#"+tag} highlight={searchTerm} />
                      } else {
                        return (
                          <span key={_.uniqueId("tag_")}>
                            {"#" + tag}&nbsp;
                          </span>
                        );
                      }
                    })}
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
