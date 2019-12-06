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

const ToolModalForm = props => {
  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}>
        <MdAdd color="black" />
        Add new tool
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="toolTitle">Tool Name</Label>
            <Input
              type="text"
              name="title"
              id="toolTitle"
              onChange={props.inputChangeHandler}
              value={props.tool.title}
            />
          </FormGroup>
          <FormGroup>
            <Label for="toolLink">Tool Link</Label>
            <Input
              type="text"
              name="link"
              id="toolLink"
              onChange={props.inputChangeHandler}
              value={props.tool.link}
            />
          </FormGroup>
          <FormGroup>
            <Label for="toolDescription">Tool Description</Label>
            <Input
              type="textarea"
              name="description"
              id="toolDescription"
              onChange={props.inputChangeHandler}
              value={props.tool.description}
            />
          </FormGroup>
          <FormGroup>
            <Label for="toolTags">Tags</Label>
            <Input
              type="text"
              name="tags"
              id="toolTags"
              onChange={props.inputChangeHandler}
              value={props.tool.tags}
            />
            <FormText color="muted">
              Put any number of tags separated by one white space between each
              one
            </FormText>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={props.onSave}>
          Save
        </Button>{" "}
        <Button color="secondary" onClick={props.onCancel}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ToolModalForm;
