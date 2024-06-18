import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../../../styles/custom.scss";
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

import { PageHeader } from "@/components/common/PageHeader";

import { addProtocolApi } from "../../../api/dectecApi";
import defaultImage from "@/assets/images/defaultImage.png";
import FormImage from "../../../components/common/FormImage";
import ErrorBox from "../../../components/common/ErrorBox";
import { notify } from "../../../utils/toastify";
import DatePicker from "react-flatpickr";
export const EditActivity = () => {
  const history = useNavigate();

  const [activities, setActivities] = useState({
    url: "http://www.sample.edu/meeting?curve=slip",
    name: "TechConvergence: Where Tech Worlds Collide",
    category: "Event",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione facere aspernatur amet reiciendis deserunt fugiat",
    point: "1234",
    startDate: "10-07-2023",
    endDate: "08-12-2023",
    logo: null,
    limit: "3",
  });
  const [currentActivityType, setCurrentActivityType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    history("/dashboard");
  };

  const ActivityCard = () => {
    const index = 0;
    return (
      <div className="col-md-12">
        <Card>
          <CardBody>
            <Row>
              <Row>
                <Col lg={8}>
                  <Row>
                    <Col lg={6} className="mb-2">
                      <Label htmlFor="activityName" className="form-label fs-6">
                        Activity Type <span className="text-primary"></span>
                      </Label>
                      <Input
                        required
                        type="text"
                        name="name"
                        id="activityType"
                        className="form-control  bg-light"
                        placeholder="Activity Type"
                        value={activities.category}
                        maxLength={100}
                        minLength={3}
                        disabled
                      />
                    </Col>
                    <Col lg={6} className="mb-2">
                      <Label htmlFor="activityName" className="form-label fs-6">
                        Activity Name <span className="text-primary">*</span>
                      </Label>
                      <Input
                        required
                        type="text"
                        name="name"
                        id="activityName"
                        className="form-control  bg-light"
                        placeholder="Enter Activity Name"
                        value={activities.name}
                        maxLength={100}
                        minLength={3}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={4} className="mb-2">
                      <Label htmlFor="activityUrl" className="form-label fs-6">
                        Activity URL <span className="text-primary">*</span>
                      </Label>
                      <Input
                        required
                        type="url"
                        name="url"
                        id="activityUrl"
                        className="form-control  bg-light"
                        placeholder="Enter Activity URL"
                        value={activities.url}
                        maxLength={100}
                        minLength={3}
                      />
                    </Col>
                    <Col lg={4} className="mb-2">
                      <Label
                        htmlFor="activityPoints"
                        className="form-label fs-6"
                      >
                        Points <span className="text-primary">*</span>
                      </Label>
                      <Input
                        required
                        type="number"
                        name="point"
                        id="activityPoints"
                        className="form-control  bg-light"
                        placeholder="Enter Points"
                        value={activities.point}
                      />
                    </Col>

                    <Col lg={4} className="mb-2">
                      <Label
                        htmlFor="activityLimit"
                        className="form-label fs-6"
                      >
                        Activity Frequency Limit{" "}
                        <span className="text-primary">*</span>
                      </Label>
                      <Input
                        required
                        type="number"
                        name="limit"
                        id="activityLimit"
                        className="form-control  bg-light"
                        placeholder="Enter Limit"
                        value={activities.limit}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={6}>
                      <div className="mb-2">
                        <Label htmlFor="startDate" className="form-label fs-6">
                          Start Date <span className="text-primary">*</span>
                        </Label>

                        <DatePicker
                          name="startDate"
                          id="startDate"
                          className="form-control  bg-light"
                          defaultValue="Select Start Date"
                          value={activities.startDate}
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-2">
                        <Label htmlFor="endDate" className="form-label fs-6">
                          End Date <span className="text-primary">*</span>
                        </Label>
                        <DatePicker
                          name="endDate"
                          id="endDate"
                          className="form-control  bg-light"
                          defaultValue="Select End Date"
                          value={activities.endDate}
                        />
                      </div>
                    </Col>
                  </Row>
                  <div className="mb-2">
                    <Label
                      htmlFor="activityDescription"
                      className="form-label fs-6"
                    >
                      Activity Description{" "}
                      <span className="text-primary">*</span>
                    </Label>
                    <Input
                      type="textarea"
                      rows={3}
                      required
                      className="form-control pt-3 bg-light"
                      placeholder="Enter Activity Description"
                      name="description"
                      id="activityDescription"
                      value={activities.description}
                      maxLength={500}
                      minLength={20}
                    />
                  </div>
                </Col>

                <Col
                  lg={4}
                  className="d-flex flex-column justify-content-between py-4"
                >
                  <FormImage
                    label="Activity Image"
                    image={activities.logo}
                    onChange={(e) => {
                      if (e.target.files[0].size / 1024 > 1024) {
                        notify("Please select image less than 1MB", false);
                      } else if (!e.target.files[0].type.startsWith("image/")) {
                        notify("Please select a valid image", false);
                      } else {
                        setActivities({
                          ...activities,
                          logo: e.target.files[0],
                        });
                      }
                    }}
                  />
                  <div className="hstack gap-3 justify-content-center">
                    <button
                      className="btn btn-light py-1 px-3"
                      disabled={loading}
                      onClick={() => history("/dashboard")}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary py-1 px-3"
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Submit"}
                    </button>
                  </div>
                </Col>
              </Row>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <PageHeader pageHeading="Edit Activity" isLink={false} />
          <Form onSubmit={handleSubmit}>
            <ActivityCard />
          </Form>
        </Container>
      </div>
      <Row></Row>
    </React.Fragment>
  );
};
