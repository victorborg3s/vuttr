import React from "react";
import {
  Input,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  FormText
} from "reactstrap";
import MdAdd from "react-ionicons/lib/MdAdd";

const ToolModalForm = ({
  isOpen,
  toggle,
  inputChangeHandler,
  tool,
  onSave,
  onCancel,
  fieldsValidity
}) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        <MdAdd color="black" />
        Add new tool
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="toolTitle">Name</Label>
            <Input
              type="text"
              name="title"
              id="toolTitle"
              onChange={inputChangeHandler}
              value={tool.title}
            />
            <FormText color="danger">{fieldsValidity.title}</FormText>
          </FormGroup>
          <FormGroup>
            <Label for="toolLink">Link</Label>
            <Input
              type="text"
              name="link"
              id="toolLink"
              onChange={inputChangeHandler}
              value={tool.link}
            />
            <FormText color="danger">{fieldsValidity.link}</FormText>
          </FormGroup>
          <FormGroup>
            <Label for="toolDescription">Description</Label>
            <Input
              type="textarea"
              name="description"
              id="toolDescription"
              onChange={inputChangeHandler}
              value={tool.description}
            />
            <FormText color="danger">{fieldsValidity.description}</FormText>
          </FormGroup>
          <FormGroup>
            <Label for="toolTags">Tags</Label>
            <Input
              type="text"
              name="tags"
              id="toolTags"
              onChange={inputChangeHandler}
              value={tool.tags}
            />
            <FormText color="danger">{fieldsValidity.tags}</FormText>
            <FormText color="muted">
              Put any number of tags separated by one white space between each
              one
            </FormText>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onSave}>
          Save
        </Button>{" "}
        <Button color="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ToolModalForm;
