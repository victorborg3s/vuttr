import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ModalDialogType = {
  YES_NO: "DIALOG_YES_NO",
  OK: "DIALOG_OK",
  OK_CANCEL: "DIALOG_OK_CANCEL"
};

const ModalDialogFooter = ({
  dialogType,
  onOkClick,
  onYesClick,
  onNoClick,
  onCancelClick
}) => {
  if (dialogType === ModalDialogType.OK) {
    return (
      <ModalFooter>
        <Button color="primary" onClick={onOkClick}>
          Ok
        </Button>
      </ModalFooter>
    );
  } else if (dialogType === ModalDialogType.YES_NO) {
    return (
      <ModalFooter>
        <Button color="primary" onClick={onYesClick}>
          Yes
        </Button>{" "}
        <Button color="secondary" onClick={onNoClick}>
          No
        </Button>
      </ModalFooter>
    );
  } else {
    return (
      <ModalFooter>
        <Button color="primary" onClick={onOkClick}>
          Ok
        </Button>{" "}
        <Button color="secondary" onClick={onCancelClick}>
          Cancel
        </Button>
      </ModalFooter>
    );
  }
};

const ModalDialog = ({
  isOpen,
  onClose,
  dialogType,
  message,
  header,
  onOkClick,
  onYesClick,
  onNoClick,
  onCancelClick
}) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalHeader>{header}</ModalHeader>
      <ModalBody>{message}</ModalBody>
      <ModalDialogFooter
        dialogType={dialogType}
        onOkClick={() => {
          if (onOkClick) onOkClick();
          onClose();
        }}
        onYesClick={() => {
          if (onYesClick) onYesClick();
          onClose();
        }}
        onNoClick={() => {
          if (onNoClick) onNoClick();
          onClose();
        }}
        onCancelClick={() => {
          if (onCancelClick) onCancelClick();
          onClose();
        }}
      />
    </Modal>
  );
};

export { ModalDialog, ModalDialogType };
