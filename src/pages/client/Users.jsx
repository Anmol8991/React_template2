import React from "react";
import { CardBody, Row, Col, Card, Container, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { clientsData, userData } from "@/data/dashboardData/index";
import DataTable from "../../components/common/tables/DataTable";
import { PageHeader } from "../../components/common/PageHeader";
import  TableContainer  from '@/components/client/users/TableContainer';

const Users = () => {
  const tableData = [
    {
      title: "Name",
      data: [
        { value: userData[0].title, img: userData[0].img },
        { value: userData[6].title, img: userData[6].img },
        { value: userData[7].title, img: userData[7].img },
        { value: userData[8].title, img: userData[8].img },
        { value: userData[9].title, img: userData[9].img },
        { value: userData[0].title, img: userData[0].img },
        { value: userData[6].title, img: userData[6].img },
        { value: userData[7].title, img: userData[7].img },
        { value: userData[8].title, img: userData[8].img },
        { value: userData[9].title, img: userData[9].img },
      ],
    },
    {
      title: "Email",
      data: [
        { value: "sofiacunha6195@gmail.com" },
        { value: "luisrocha3692@gmail.com" },
        { value: "vitoriarodrigues3812@gmail.com" },
        { value: "vitoriarodrigues5688@gmail.com" },
        { value: "juliawilliam4322@gmail.com" },
        { value: "turnalsaw3695@gmail.com" },
        { value: "janshbrown1406@gmail.com" },
        { value: "susandenton9034@gmail.com" },
        { value: "prezywilliam2910@gmail.com" },
        { value: "donaldrisher5425@gmail.com" },
      ],
    },
    {
      title: "Phone",
      data: [
        { value: "+8248752804" },
        { value: "+8757925895" },
        { value: "+3449158255" },
        { value: "+7338924578" },
        { value: "+6015135704" },
        { value: "+9828424975" },
        { value: "+7636450715" },
        { value: "+9971354580" },
        { value: "+5960648686" },
        { value: "+5618913890" },
      ],
    },
    {
      title: "Earned Points",
      data: [
        { value: 1356 },
        { value: 9648 },
        { value: 2699 },
        { value: 6930 },
        { value: 9213 },
        { value: 6298 },
        { value: 1446 },
        { value: 3055 },
        { value: 1798 },
        { value: 2100 },
      ],
    },
    {
      title: "Redeemed Points",
      data: [
        { value: 7087 },
        { value: 3455 },
        { value: 2742 },
        { value: 1381 },
        { value: 3276 },
        { value: 4767 },
        { value: 5703 },
        { value: 8855 },
        { value: 6488 },
        { value: 2823 },
      ],
    },
    {
      title: "Action",
      data: [
        { value: "actionBtn" },
        { value: "actionBtn" },
        { value: "actionBtn" },
        { value: "actionBtn" },
        { value: "actionBtn" },
        { value: "actionBtn" },
        { value: "actionBtn" },
        { value: "actionBtn" },
        { value: "actionBtn" },
        { value: "actionBtn" },
      ],
    },
  ];

  const data = [
    {
      id: 1,
      clientImg: clientsData[1].logo,
      clientName: clientsData[1].name,
      userName: userData[1].title,
      userImg: userData[1].img,
      email: "Gift Card",
    },

    {
      id: 2,
      clientImg: clientsData[2].logo,
      clientName: clientsData[2].name,
      userName: userData[2].title,
      userImg: userData[2].img,
      email: "Donation",
    },

    {
      id: 3,
      clientImg: clientsData[3].logo,
      clientName: clientsData[3].name,
      userName: userData[3].title,
      userImg: userData[3].img,
      email: "Event",
    },

    {
      id: 4,
      clientImg: clientsData[4].logo,
      clientName: clientsData[4].name,
      userName: userData[4].title,
      userImg: userData[4].img,
      email: "Event",
    },

    {
      id: 5,
      clientImg: clientsData[5].logo,
      clientName: clientsData[5].name,
      userName: userData[5].title,
      userImg: userData[5].img,
      email: "Donation",
    },
    {
      id: 6,
      clientImg: clientsData[6].logo,
      clientName: clientsData[6].name,
      userName: userData[6].title,
      userImg: userData[6].img,
      email: "Gift Card",
    },

    {
      id: 7,
      clientImg: clientsData[7].logo,
      clientName: clientsData[7].name,
      userName: userData[7].title,
      userImg: userData[7].img,
      email: "Donation",
    },

    {
      id: 8,
      clientImg: clientsData[8].logo,
      clientName: clientsData[8].name,
      userName: userData[8].title,
      userImg: userData[8].img,
      email: "Event",
    },

    {
      id: 9,
      clientImg: clientsData[9].logo,
      clientName: clientsData[9].name,
      userName: userData[9].title,
      userImg: userData[9].img,
      email: "Event",
    },

    {
      id: 10,
      clientImg: clientsData[0].logo,
      clientName: clientsData[0].name,
      userName: userData[0].title,
      userImg: userData[0].img,
      email: "Donation",
    },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <PageHeader
            pageHeading="Users"
            linkText="Add User"
            pathName="add-user"
            isLink
            linkIcon={<i className="ri-add-line align-bottom me-1"></i>}
            bulkBtn
          />
          
          <Row>
            <Card>
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

export default Users;
