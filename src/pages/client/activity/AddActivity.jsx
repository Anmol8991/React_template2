import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  Form,
  Container,
  Input,
  Label,
  Row,
} from "reactstrap";

import defaultLogo from "@/assets/images/default_person.png";
import { PageHeader } from "@/components/common/PageHeader";
import { CustomButton } from "@/components/common/CustomButton";

const bgGray = {
    backgroundColor: "rgba(0,0,0,0.3)",
  };
const AddActivity = (props) => {
  const history = useNavigate();
  const [clientName, setCientName] = useState("");
  const [clientDescription, setClientDescription] = useState("");
  const [clientLogo, setClientLogo] = useState(defaultLogo);
  const [pointsBought, setPointsBought] = useState("");

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <PageHeader pageHeading="Add Activity" isLink={false} />
          <Row>
            <Col>
              <div className="h-100">
                <Row>
                  <Col lg={12}>
                    <Card id="invoiceList">
                      <CardBody className="pt-0">
                        <div>
                          <Card className="">
                            <CardBody className="p-2">
                              <Form>
                                <Row style={{ textAlign: "left" }}>
                                  <Col lg={9}>
                                    {/* <Col lg={12} className="d-flex"> */}
                                      <Col lg={12}>
                                        <div className="mb-3">
                                            <Label
                                            htmlFor="firstnameInput"
                                            className="form-label fs-5"
                                            >
                                            Name{" "}
                                            <span className="text-danger">*</span>
                                            </Label>
                                            <Input
                                            onChange={(e) =>
                                                setCientName(e.target.value)
                                            }
                                            required
                                            type="text"
                                            className="form-control "
                                            id="nameInput"
                                            placeholder="Enter activity name"
                                            value={clientName}
                                            invalid={clientName.length === 0}
                                            maxLength={100}
                                            />
                                            {/* <FormFeedback>
                                            This Field is Required.
                                            </FormFeedback> */}
                                        </div>
                                      </Col>
                                      <Col lg={12}>
                                        <div className="mb-3">
                                            <Label
                                            htmlFor="firstnameInput"
                                            className="form-label fs-5" 
                                            >
                                            Description{" "}
                                            <span className="text-danger">*</span>
                                            </Label>
                                            <Input
                                            onChange={(e) =>
                                                setCientName(e.target.value)
                                            }
                                            required
                                            type="textarea"
                                            className="form-control "
                                            id="nameInput"
                                            placeholder="Enter activity description"
                                            value={clientName}
                                            invalid={clientName.length === 0}
                                            maxLength={1000}
                                            />
                                            {/* <FormFeedback>
                                            This Field is Required.
                                            </FormFeedback> */}
                                        </div>
                                      </Col>
                                    {/* </Col> */}

                                    <Row>
                                      <Col>
                                        <div className="mb-3">
                                            <Label
                                            htmlFor="firstnameInput"
                                            className="form-label fs-5"
                                            >
                                            Points {" "}
                                            </Label>
                                            <Input
                                                style={bgGray}
                                                type="number"
                                                className="form-control "
                                                id="nameInput"
                                                placeholder="0"
                                                value={pointsBought}
                                                onChange={(e) =>
                                                setPointsBought(e.target.value)
                                                }
                                            />
                                        </div>
                                      </Col>
                                      
                                    </Row>
                                  </Col>

                                  <Col lg={3}>
                                    <div className="mb-3">
                                      <Label
                                        htmlFor="logoInput"
                                        className="form-label fs-5 d-flex justify-content-center"
                                      >
                                        <img
                                          src={clientLogo}
                                          height={120}
                                          width={120}
                                          style={{
                                            borderRadius: "50%",
                                            position: "relative",
                                          }}
                                        />
                                        <i
                                          className="ri-pencil-fill align-bottom ms-2 text-white fs-5 cursor-pointer"
                                          style={{
                                            position: "absolute",
                                            right: 75,
                                          }}
                                        ></i>
                                      </Label>

                                      <Input
                                        type="file"
                                        className="form-control d-none"
                                        id="logoInput"
                                        placeholder="Enter your protocol name"
                                        filename=""
                                        accept=".jpg,.jpeg,.png"
                                        onChange={(e) => {
                                          setClientLogo(
                                            URL.createObjectURL(
                                              e.target.files[0]
                                            )
                                          );
                                        }}
                                      />
                                      <div className="my-1 text-muted">
                                        <p>Note:</p>
                                        <ul>
                                          <li>
                                            Minimum size 5KB and Maximum size
                                            1MB allowed.
                                          </li>
                                          <li>
                                            Accepted file formats are jpg, jpeg,
                                            png.
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </Col>

                                  <Col lg={12}>
                                    <div className="hstack gap-2 justify-content-end">
                                      <CustomButton
                                        btnText="Save Changes"
                                        btnClassNames="btn btn-primary"
                                        btnClickHandler={() =>
                                          history("/users")
                                        }
                                        btnDisabled={
                                          clientName.length === 0 ||
                                          clientDescription.length === 0
                                        }
                                      />
                                      <CustomButton
                                        btnText="Cancel"
                                        btnClassNames="btn btn-soft-dark"
                                        btnClickHandler={() =>
                                          history("/users")
                                        }
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </Form>
                            </CardBody>
                          </Card>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Row></Row>
    </React.Fragment>
  );
};
export default AddActivity;
