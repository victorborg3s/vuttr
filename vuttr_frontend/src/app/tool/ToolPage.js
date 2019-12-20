import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Col, Row, Spinner } from "reactstrap";
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
  isFormOpen,
  fieldsValidity,
  tool
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
        fieldsValidity={fieldsValidity}
        inputChangeHandler={event => {
          event.persist();
          actions.inputChangeHandler(event);
        }}
        onSave={actions.save}
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
