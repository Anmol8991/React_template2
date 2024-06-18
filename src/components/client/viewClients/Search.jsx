import React, { useState } from "react";
import {
  Col,
  Row,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import { Link } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import Select from "react-select";

const Search = () => {
  const [isStatus, setisStatus] = useState("All");

  function handleisStatus(isStatus) {
    setisStatus(isStatus);
  }

  const EarnedPoints = [
    {
      options: [
        { label: "All", value: "All" },
        { label: "Challenge Name", value: "Challenge Name" },
        { label: "Points", value: "Points" },
      ],
    },
  ];
  const RedeemedPoints = [
    {
      options: [
        { label: "All", value: "All" },
        { label: "Gift Card", value: "Gift Card" },
        { label: "Donation", value: "Donation" },
        { label: "Attend event", value: "Attend event" },
      ],
    },
  ];
  const Activities = [
    {
      options: [
        { label: "All", value: "All" },
        { label: "Name", value: "Name" },
        { label: "Description", value: "Description" },
        { label: "Points", value: "Points" },
      ],
    },
  ];
  return (
    <React.Fragment>
      <Col sm={4} xxl={3}>
        <Flatpickr
          className="form-control bg-light border-light"
          id="datepicker-publish-input"
          placeholder="Choose range"
          options={{
            altInput: true,
            altFormat: "F j, Y",
            mode: "range",
            dateFormat: "d.m.y",
          }}
        />
      </Col>

      <Col sm={4} xxl={3}>
        <div className="input-light">
          <Select
            value={isStatus}
            onChange={() => {
              handleisStatus();
            }}
            options={Activities}
            name="choices-single-default"
            id="idStatus"
          ></Select>
        </div>
      </Col>

      <Col sm={4} xxl={1}>
        <Button color="primary" className="w-100">
          <i className="ri-equalizer-fill me-1 align-bottom"></i>
        </Button>
      </Col>
    </React.Fragment>
  );
};

export default Search;
