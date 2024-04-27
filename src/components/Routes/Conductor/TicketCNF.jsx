import React from "react";
import "./Modal.css";
import { Modal, Button } from 'react-bootstrap'


function TicketCNF()
{
  const [isShow, invokeModal] = React.useState(false)
  const initModal = () => {
    console.log("hrr");
    return invokeModal(!isShow)
  }
  return(
    <div>

<Button variant="success" onClick={initModal}>
        Open Modal
      </Button>
      <Modal show={isShow}>
        <Modal.Header closeButton onClick={initModal}>
          <Modal.Title>React Modal Popover Example</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={initModal}>
            Close
          </Button>
          <Button variant="dark" onClick={initModal}>
            Store
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default TicketCNF;
