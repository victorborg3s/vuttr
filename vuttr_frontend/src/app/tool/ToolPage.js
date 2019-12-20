import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Col, Row, Spinner } from "reactstrap";
import * as _ from "lodash/core";
import ToolModalForm from "./ToolModalForm";
import ToolPageHeader from "./ToolPageHeader";
import ToolList from "./ToolList";
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
    };
  });

  useEffect(() => {
    actions.fetch(0);
  }, [actions]);

  useEffect(() => {
    if (filteredData && filteredData.length < 15 && dataHasMore) {
      actions.fetch(dataPage + 1, false);
    }
  }, [actions, filteredData, dataPage, dataHasMore]);

  const [tool, setTool] = useState({
    title: "",
    link: "",
    description: "",
    tags: ""
  });

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
        inputChangeHandler={event => {
          event.persist();
          setTool(inputs => ({
            ...inputs,
            [event.target.name]: event.target.value
          }));
        }}
        onSave={toolSave}
        onCancel={actions.toggleForm}
      />
      <ToolPageHeader
        onAddClick={actions.toggleForm}
        searchTerm={searchTerm}
        searchOnlyTags={searchOnlyTags}
        toggleSearchOnlyTags={() =>
          actions.applyFilter(!searchOnlyTags, searchTerm)
        }
        onSearchTermChange={event =>
          actions.applyFilter(searchOnlyTags, event.target.value)
        }
      />
      <ToolList data={filteredData} onRemove={actions.remove} />
      {loading}
    </>
  );
};

const mapStateToProps = state => state.ToolReducer;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ToolActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ToolPage);
