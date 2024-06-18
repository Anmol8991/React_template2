import React from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

const ActionButton = () => {
  const history = useNavigate();

  return (
    <UncontrolledDropdown>
      <DropdownToggle tag="a" className="btn btn-soft-secondary btn-sm">
        <i className="ri-more-fill align-middle"></i>
      </DropdownToggle>
      <DropdownMenu className="dropdown-menu-end">
        <li>
          <DropdownItem
            onClick={() => {
              history("/view-user");
            }}
          >
            <i className="ri-eye-fill align-bottom me-2 text-muted"></i> View
          </DropdownItem>
        </li>
        <li>
          <DropdownItem
            className="edit-item-btn"
            href="#showModal"
            data-bs-toggle="modal"
          >
            <i className="ri-pencil-fill align-bottom me-2 text-muted"></i> Edit
          </DropdownItem>
        </li>
        <li>
          <DropdownItem
            className="remove-item-btn"
            data-bs-toggle="modal"
            href="#deleteOrder"
          >
            <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
            Delete
          </DropdownItem>
        </li>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default ActionButton;
