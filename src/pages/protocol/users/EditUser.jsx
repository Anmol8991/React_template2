import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { countries } from "../../../data/countryData";

import FormImage from "../../../components/common/FormImage";
import { notify } from "../../../utils/toastify";
import { editProfileApi, viewProfileInfo } from "../../../api/dectecApi";
import Loader from "../../../components/common/Loader";

export const EditUser = () => {
  const history = useNavigate();
  const { userId } = useParams();
  const [userValues, setUserValues] = useState({
    userId,
    photo: null,
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    viewProfileInfo(userId)
      .then((res) => {
        if (res.success) {
          const {
            profilePic,
            name,
            email,
            password,
            address,
            city,
            state,
            country,
            zipcode,
          } = res?.data[0];
          setUserValues({
            ...userValues,
            photo: profilePic,
            name,
            email,
            password,
            address,
            city,
            country:
              countries?.findIndex(
                (obj) => obj.country.toLowerCase() === country.toLowerCase()
              ) ?? "",
            state:
              countries[
                countries?.findIndex(
                  (obj) => obj.country.toLowerCase() === country.toLowerCase()
                ) ?? ""
              ]?.states?.indexOf(state) ?? "",
            zipcode,
          });
        } else {
          setError(message);
          console.log(message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setUserValues({ ...userValues, [e.target.name]: e.target.value });
  };
  console.log(userValues);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    editProfileApi({
      ...userValues,
      country: countries[userValues.country].country,
      state: countries[userValues.country].states[userValues.state],
    })
      .then((res) => {
        console.log(res);
        if (res.success) {
          console.log(res);
          notify(res.message, true);
          history("/users");
        } else {
          console.log(res.message);
          setError(res.message);
          notify(res.message, true);
        }
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        notify(error.message, true);
      })
      .finally(() => {
        setSaving(false);
      });
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <PageHeader pageHeading="Edit User" isLink={false} />
          <Col>
            <Card>
              <CardBody>
                {loading ? (
                  <Loader />
                ) : (
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col lg={8}>
                        <Row>
                          <Col lg={6}>
                            <div className="mb-2">
                              <Label
                                htmlFor="firstnameInput"
                                className="form-label fs-6 "
                              >
                                Name <span className="text-primary">*</span>
                              </Label>
                              <Input
                                type="text"
                                onKeyPress={(e) =>
                                  !/^[a-zA-Z0-9@\-_\$\#\.\s]+$/.test(e.key) &&
                                  e.preventDefault()
                                }
                                pattern="^[a-zA-Z0-9@-_$#.\s]+$"
                                required
                                name="name"
                                className="form-control  bg-light"
                                id="nameInput"
                                placeholder="Enter Name"
                                value={userValues.name}
                                onChange={handleChange}
                                maxLength={100}
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-2">
                              <Label
                                htmlFor="firstnameInput"
                                className="form-label fs-6"
                              >
                                Email <span className="text-primary">*</span>
                              </Label>
                              <Input
                                onChange={handleChange}
                                required
                                type="email"
                                name="email"
                                className="form-control  bg-light"
                                pattern="^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$"
                                placeholder="Enter Email Eg. example@mail.com"
                                id="nameInput"
                                value={userValues.email}
                                maxLength={100}
                              />
                            </div>
                          </Col>
                        </Row>

                        <Row lg={12} className="d-flex justify-content-between">
                          <Col md={4} lg={4}>
                            <div className="mb-2">
                              <Label
                                htmlFor="country"
                                className="form-label fs-6"
                                onClick={() => console.log(userValues.country)}
                              >
                                Country
                              </Label>
                              <select
                                type="select"
                                id="country"
                                name="country"
                                className=" bg-light form-control cursor-pointer"
                                value={userValues.country}
                                onChange={handleChange}
                              >
                                <option value="" disabled hidden>
                                  Select Country
                                </option>
                                {countries.map((item, i) => (
                                  <option key={i} value={i}>
                                    {item.country}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </Col>
                          <Col md={4} lg={4}>
                            <div className="mb-2">
                              <Label
                                htmlFor="firstnameInput"
                                className="form-label fs-6 "
                              >
                                State
                              </Label>

                              <select
                                type="select"
                                name="state"
                                id="nameInput"
                                className=" bg-light form-control cursor-pointer"
                                value={userValues.state}
                                defaultValue=""
                                onChange={handleChange}
                              >
                                <option value="" disabled hidden>
                                  {userValues.country
                                    ? "Select State"
                                    : "Choose Country First"}
                                </option>
                                {countries[userValues.country]?.states.map(
                                  (item, i) => (
                                    <option key={i} value={i}>
                                      {item}
                                    </option>
                                  )
                                )}
                              </select>
                            </div>
                          </Col>
                          <Col md={4} lg={4}>
                            <div className="mb-2">
                              <Label
                                htmlFor="firstnameInput"
                                className="form-label fs-6 "
                              >
                                City
                              </Label>
                              <Input
                                type="text"
                                name="city"
                                className="form-control   bg-light"
                                id="nameInput"
                                placeholder="Enter City"
                                value={userValues.city}
                                onChange={handleChange}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row lg={12} className="d-flex justify-content-between">
                          <Col md={8} lg={8}>
                            <div className="mb-2">
                              <Label
                                htmlFor="lastnameInput"
                                className="form-label fs-6"
                              >
                                Address
                              </Label>
                              <Input
                                type="textarea"
                                name="address"
                                className="form-control   bg-light"
                                id="lastnameInput"
                                placeholder="Enter Address"
                                maxLength={1000}
                                onChange={handleChange}
                                value={userValues.address}
                                rows={2}
                              />
                            </div>
                          </Col>

                          <Col md={4} lg={4}>
                            <div className="mb-2">
                              <Label
                                htmlFor="firstnameInput"
                                className="form-label fs-6 "
                              >
                                Zip Code
                              </Label>
                              <Input
                                type="number"
                                name="zipcode"
                                className="form-control  bg-light"
                                id="nameInput"
                                placeholder="Enter Zip Code"
                                onChange={handleChange}
                                value={userValues.zipcode}
                              />
                            </div>
                          </Col>
                        </Row>
                      </Col>

                      <Col
                        lg={4}
                        className="d-flex flex-column justify-content-between "
                      >
                        <FormImage
                          isSmall
                          label="User Image"
                          image={userValues.photo}
                          onChange={(e) => {
                            if (e.target.files[0].size / 1024 > 1024) {
                              notify(
                                "Please select image less than 1MB",
                                false
                              );
                            } else if (
                              !e.target.files[0].type.startsWith("image/")
                            ) {
                              notify("Please select a valid image", false);
                            } else {
                              setUserValues({
                                ...userValues,
                                photo: e.target.files[0],
                              });
                            }
                          }}
                        />

                        <div className="hstack gap-3 justify-content-center">
                          <button
                            className="btn btn-light py-1 px-3"
                            disabled={loading}
                            onClick={() => history("/users")}
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
                  </Form>
                )}
              </CardBody>
            </Card>
          </Col>
        </Container>
      </div>
      <Row></Row>
    </React.Fragment>
  );
};
