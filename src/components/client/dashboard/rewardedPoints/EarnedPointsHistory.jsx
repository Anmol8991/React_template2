import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Row,
  CardHeader,
  Container,
} from "reactstrap";
// import Flatpickr from "react-flatpickr";
import { ToastContainer } from "react-toastify";
import TableContainer from "./TableContainer";
import {activitiesData, userData, date} from "@/data/dashboardData"
import activity1 from "@/assets/images/brands/slack.png";
import activity2 from "@/assets/images/brands/dribbble.png";
import activity3 from "@/assets/images/brands/dropbox.png";
import activity4 from "@/assets/images/brands/bitbucket.png";
export const EarnedPointsHistory = () => {
  // let history = useHistory();
  const [justifyTab, setjustifyTab] = useState("1");
  const justifyToggle = (tab) => {
    if (justifyTab !== tab) {
      setjustifyTab(tab);
    }
  };
  const data = [
    {
      activityName: activitiesData[0].name,
      activityLogo: activity1,
      points: 1356,
      userName: userData[0].title,
      userImg: userData[0].img,
      date: date[0].date,
    },
    {
      activityName: activitiesData[1].name,
      activityLogo: activity2,
      userName: userData[9].title,
      userImg: userData[9].img,
      points: 1676,
      date: date[1].date,
    },
    {
      activityName: activitiesData[2].name,
      activityLogo: activity3,
      points: 2100,
      date: date[2].date,
      userName: userData[8].title,
      userImg: userData[8].img,
    },
    {
      activityName: activitiesData[3].name,
      activityLogo: activity4,
      points: 2156,
      userName: userData[7].title,
      userImg: userData[7].img,
      date: date[3].date,
    },
    {
      activityName: activitiesData[2].name,
      activityLogo: activity3,
      points: 2100,
      userName: userData[6].title,
      userImg: userData[6].img,
      date: date[4].date,
    },
    {
      activityName: activitiesData[1].name,
      activityLogo: activity2,
      points: 1676,
      userName: userData[0].title,
      userImg: userData[0].img,
      date: date[0].date,
    },
    {
      activityName: activitiesData[0].name,
      activityLogo: activity1,
      userName: userData[9].title,
      userImg: userData[9].img,
      points: 2100,
      date: date[1].date,
    },
    {
      activityName: activitiesData[1].name,
      activityLogo: activity2,
      points: 1676,
      date: date[2].date,
      userName: userData[8].title,
      userImg: userData[8].img,
    },
    {
      activityName: activitiesData[2].name,
      activityLogo: activity3,
      points: 2100,
      userName: userData[7].title,
      userImg: userData[7].img,
      date: date[3].date,
    },
    {
      activityName: activitiesData[3].name,
      activityLogo: activity4,
      points: 2156,
      userName: userData[6].title,
      userImg: userData[6].img,
      date: date[4].date,
    },
  ];
  /**
   * Formats the size
   */
  return (
    <React.Fragment>
      <div className="">
        <Container fluid>
          <Row>
            <Card>
              <CardHeader className="border-1">
                  <div className="d-flex align-items-center">
                      <h5 className="card-title mb-0 flex-grow-1 text-dark">Rewarded Points History</h5>
                  </div>
              </CardHeader>
              <CardBody className="pt-0">
                <div>
                  {/* <DataTable
                    tableData={tableData}
                    tableFilter={true}
                    pagination={true}
                  /> */}
                  <TableContainer data={data} index={2} />
                  <ToastContainer closeButton={false} limit={1} />
                </div>
              </CardBody>
            </Card>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};
