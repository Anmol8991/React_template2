import React, { useEffect, useState } from "react";

import { Card, CardHeader, Col, Container, Row } from "reactstrap";
import { useParams } from "react-router-dom";

import { notify } from "../../../../utils/toastify";
import Loader from "../../../../components/common/Loader";
import { getActivityList } from "../../../../api/utilityApi";
import UploadsCard from "../../../../components/activities/UploadsCard";

const DataUploadsActivity = () => {
  const { activityId } = useParams();
  const categoryId = activityId;

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);



  
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
      {loading ? <Loader/> : 
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
          <UploadsCard data={activities?.activityData} />
        </Col>
      </Container>}
    </div>
  );
};

export default DataUploadsActivity;
