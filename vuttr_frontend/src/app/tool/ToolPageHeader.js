import React from "react";
import MdAdd from "react-ionicons/lib/MdAdd";
import {
  Col,
  Row,
  Input,
  Label,
  Button,
} from "reactstrap";

const ToolPageHeader = ({
  searchTerm,
  searchOnlyTags,
  onSearchTermChange,
  toggleSearchOnlyTags,
  onAddClick,
}) => {
  return (
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
          <Button onClick={onAddClick} color="primary">
            <MdAdd color="white" />
            add
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default ToolPageHeader;
