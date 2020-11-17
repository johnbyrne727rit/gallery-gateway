import React from "react";
import {
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container
} from "reactstrap";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

const ConfirmModal = ({
  isOpen,
  handleClose,
  submitPortfolio
}) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalHeader>
        Are you sure you want to submit?
      </ModalHeader>
      <ModalBody>
        <Container>
          <Row>
            You cannot edit your portfolio after submitting.
          </Row>
         
        </Container>
      </ModalBody>
      <ModalFooter>
	<Button color="primary" onClick={submitPortfolio}>Submit Portfolio</Button>
        <Button color='danger' onClick={handleClose}>Return to Editing</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmModal;