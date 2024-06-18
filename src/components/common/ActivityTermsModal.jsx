import React, { useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";

const ActivityTermsModal = (props) => {
  const [open, setOpen] = useState("1");
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  const closeBtn = (
    <span
      className="p-1 rounded-circle bg-soft-info d-flex justify-content-center align-items-center"
      onClick={() => props.setShowModal(false)}
      type="button"
    >
      <i className="bx bx-x m-0 p-0 fs-5"></i>
    </span>
  );

  return (
    <Modal isOpen={props.showModal} toggle={() => props.setShowModal(false)}>
      <ModalHeader toggle={() => props.setShowModal(false)} close={closeBtn}>
        How it works?
      </ModalHeader>
      <ModalBody>
        <p>
          To earn points on our platform, you have the opportunity to engage in
          various activities and tasks. Each completed activity will contribute
          to your points accumulation, bringing you closer to unlocking exciting
          rewards such as gift cards, event passes, and more.
        </p>

        <h4>F&Q</h4>
        <Accordion open={open} toggle={toggle}>
          <AccordionItem>
            <AccordionHeader targetId="1">
              How can I earn points on the platform?
            </AccordionHeader>
            <AccordionBody accordionId="1">
              You can earn points by performing various activities and tasks
              available on our platform. Each completed activity will contribute
              to your points accumulation.
            </AccordionBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader targetId="2">
              Are there any fees associated with earning points?
            </AccordionHeader>
            <AccordionBody accordionId="2">
              Yes, there is a transaction fee associated with earning points.
              When you complete an activity and earn points, a small transaction
              fee will be deducted from the total points earned.
            </AccordionBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader targetId="3">
              How is the transaction fee calculated?
            </AccordionHeader>
            <AccordionBody accordionId="3">
              The transaction fee is calculated based on the current blockchain
              gas fee rate, which can vary over time. The gas fee is the cost
              required to process and validate transactions on the blockchain
              network. Our platform dynamically adjusts the transaction fee to
              align with the prevailing gas fee rate, ensuring transparency and
              fairness in the fee calculation.
            </AccordionBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader targetId="4">
              Can I redeem rewards without using my points?
            </AccordionHeader>
            <AccordionBody accordionId="4">
              No, rewards can only be redeemed using the points you have
              accumulated. The points system allows you to earn and accumulate
              points, which can then be exchanged for a variety of rewards such
              as gift cards and event passes.
            </AccordionBody>
          </AccordionItem>
        </Accordion>
      </ModalBody>
    </Modal>
  );
};

export default ActivityTermsModal;
