import React, { useEffect, useState } from "react";
import Refer from "@/components/utility/activities/Refer";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import RegisterEvent from "../../../../components/utilities/twin/activities/RegisterEvent";
import { useLocation, useParams } from "react-router-dom";
import { getActivityInfo } from "../../../../api/utilityApi";
import Loader from "../../../../components/common/Loader";

const EventRegisterForm = () => {
  const { activityId } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [activityData, setActivityData] = useState([]);
  useEffect(() => {
    setLoading(true);
    getActivityInfo(activityId)
      .then((res) => {
        if (res.success) {
          setActivityData(res?.data[0]);
        } else {
          notify(res.message, false);
        }
      })
      .catch((e) => notify(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="page-content">
      <Container fluid>
        <Card id="invoiceList">
          <CardHeader className="bg-light">
            <Row className="px-3 d-flex justify-content-between">
              <Col md={8}>
                <h2>{activityData?.activityName}</h2>
                <p className="text-muted">
                  {activityData?.activityDescription}
                  <br />
                  <b>
                    Date:{" "}
                    {new Date(
                      activityData?.eventInfo?.eventStartDateTime
                    ).toLocaleDateString("en-US")}{" "}
                    -{" "}
                    {new Date(
                      activityData?.eventInfo?.eventEndDateTime
                    ).toLocaleDateString("en-US")}{" "}
                    <br /> Location: {activityData?.eventInfo?.eventLocation}
                  </b>
                </p>
              </Col>
              <Col
                md={4}
                className="d-flex flex-column justify-content-center align-items-end"
              >
                <p className="d-flex fs-4 text-info align-items-center gap-1 ">
                  <i className="ri-coin-fill text-warning align-middle"></i>
                  <span>{activityData?.activityPoints}</span>
                </p>
                <p
                  className="py-2 bg-soft-info rounded-5 px-4 fs-6"
                  style={{ fontWeight: "500" }}
                >
                  Event
                </p>
              </Col>
            </Row>
          </CardHeader>
          <CardBody className="d-flex justify-content-center align-items-center ">
            {/* <Refer /> */}
            <RegisterEvent data={activityData} />
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default EventRegisterForm;
