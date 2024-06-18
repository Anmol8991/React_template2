import React, { useEffect, useState } from "react";
import Refer from "@/components/utility/activities/Refer";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { useLocation, useParams } from "react-router-dom";
import Events from "../../../../components/activities/Events";
import { notify } from "../../../../utils/toastify";
import Loader from "../../../../components/common/Loader";
import { getActivityList } from "../../../../api/utilityApi";

const EventActivity = () => {
  const { activityId } = useParams();
  const categoryId = activityId;
  const location = useLocation();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const actLogo =
    "https://img.freepik.com/free-vector/illustrated-woman-being-intern-company_23-2148726151.jpg?size=626&ext=jpg&ga=GA1.1.884270935.1680350144&semt=sph";
  const data = location.state?.data;

  useEffect(() => {
    setLoading(true);
    getActivityList(categoryId)
      .then((res) => {
        if (res.success) {
          setActivities(res?.data[0]);
        } else {
          notify(res.message, false);
        }
      })
      .catch((e) => notify(e.message, false))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-content">
      {loading ? (
        <Loader />
      ) : (
        <Container fluid>
          <Col>
            <Card className="" id="invoiceList">
              <CardHeader className="bg-light">
                <div className="px-3 d-flex gap-3 flex-column flex-sm-row align-items-center">
                  <img
                    src={activities?.categoryInfo?.categoryLogo}
                    alt=""
                    className="avatar-sm rounded-circle"
                  />
                  <div className="">
                    <h5 className="card-title mb-0 flex-grow-1 text-dark">
                      {activities?.categoryInfo?.categoryName}
                    </h5>
                    <p className="text-muted m-0">
                      {activities?.categoryInfo?.categoryDescription}
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Col>
          <Col>
            <Events data={activities?.activityData} />
          </Col>
        </Container>
      )}
    </div>
  );
};

export default EventActivity;
