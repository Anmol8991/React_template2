import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Row,
  TabContent,
  Table,
  TabPane,
  UncontrolledCollapse,
  UncontrolledDropdown,
} from "reactstrap";
import classnames from "classnames";
import Flatpickr from "react-flatpickr";

export const EditProfileForm = () => {
  return (
    <React.Fragment>
      <Card className="">
        <CardHeader>
          <h5>Edit Personal Info</h5>
        </CardHeader>
        <CardBody className="p-2">
          <Form>
            <Row style={{ textAlign: "left" }}>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="firstnameInput" className="form-label">
                    First Name
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="firstnameInput"
                    placeholder="Enter your firstname"
                    defaultValue="Alex"
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="lastnameInput" className="form-label">
                    Last Name
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="lastnameInput"
                    placeholder="Enter your lastname"
                    defaultValue="Smith"
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="phonenumberInput" className="form-label">
                    Phone Number
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="phonenumberInput"
                    placeholder="Enter your phone number"
                    defaultValue="+(1) 987 6543"
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="emailInput" className="form-label">
                    Email Address
                  </Label>
                  <Input
                    type="email"
                    className="form-control"
                    id="emailInput"
                    placeholder="Enter your email"
                    defaultValue="alexSmith@gmail.com"
                  />
                </div>
              </Col>
              {/* <Col lg={12}>
                        <div className="mb-3">
                            <Label htmlFor="JoiningdatInput" className="form-label">Joining
                                Date</Label>
                            <Flatpickr
                                className="form-control"
                                options={{
                                    dateFormat: "d M, Y"
                                }}
                            />
                        </div>
                    </Col> */}

              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="cityInput" className="form-label">
                    City
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="cityInput"
                    placeholder="City"
                    defaultValue="California"
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="countryInput" className="form-label">
                    Country
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="countryInput"
                    placeholder="Country"
                    defaultValue="United States"
                  />
                </div>
              </Col>
              <Col lg={12}>
                <div className="mb-3">
                  <Label htmlFor="zipcodeInput" className="form-label">
                    Zip Code
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    minLength="5"
                    maxLength="6"
                    id="zipcodeInput"
                    placeholder="Enter zipcode"
                    defaultValue="90011"
                  />
                </div>
              </Col>

              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  <button type="button" className="btn btn-primary">
                    Save changes
                  </button>
                  <button type="button" className="btn btn-soft-dark">
                    Cancel
                  </button>
                </div>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};
