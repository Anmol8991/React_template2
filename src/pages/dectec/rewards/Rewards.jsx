import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
	CardBody,
	Row,
	Col,
	Card,
	Container,
	CardHeader,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from "reactstrap";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableContainer from "@/components/dectec/rewards/TableContainer";

import company1 from "@/assets/images/companies/img-1.png";
import company2 from "@/assets/images/companies/img-2.png";
import company3 from "@/assets/images/companies/img-3.png";
import company5 from "@/assets/images/companies/img-5.png";
import company8 from "@/assets/images/companies/img-8.png";

import protocol from "@/assets/images/demo/perk.png";
import sophiaDao from "@/assets/images/demo/sophiaDao.png";
import dereal from "@/assets/images/demo/dereal.jpg";
import dope from "@/assets/images/demo/dope.png";
import devnet from "@/assets/images/demo/devnet.png";
import company4 from "@/assets/images/demo/company1.png";
import company6 from "@/assets/images/demo/company2.png";
import company7 from "@/assets/images/demo/company3.jpg";
import company9 from "@/assets/images/demo/company4.jpg";
import company10 from "@/assets/images/demo/company5.png";
import arrow_company from "@/assets/images/demo/arrow-company.png";

import avatar1 from "@/assets/images/users/avatar-1.jpg";
import avatar2 from "@/assets/images/users/avatar-2.jpg";
import avatar3 from "@/assets/images/users/avatar-3.jpg";
import avatar4 from "@/assets/images/users/avatar-4.jpg";
import avatar5 from "@/assets/images/users/avatar-5.jpg";
import avatar6 from "@/assets/images/users/avatar-6.jpg";
import avatar7 from "@/assets/images/users/avatar-7.jpg";
import avatar8 from "@/assets/images/users/avatar-8.jpg";

import { PageHeader } from "../../../components/common/PageHeader";

import { GridTable } from "../../../components/dectec/rewards/GridTable";

const Rewards = () => {
	const [totalPoints, setTotalPoints] = useState(null);
	const points = `63 K`;
	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<PageHeader
						pageHeading="Points Rewarded"
						isLink={false}
						points={points}
					/>

					<Col>
						<Card>
							<CardBody className="pt-0">
								<div>
									<GridTable setTotalPoints={setTotalPoints} />
								</div>
							</CardBody>
						</Card>
					</Col>
				</Container>
			</div>
		</React.Fragment>
	);
};

export default Rewards;
