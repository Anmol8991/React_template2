import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
//SimpleBar
import { Link } from "react-router-dom";
import topartWork from "@/components/protocol/dashboard/HighPaidClients";
// Import Chart
//SimpleBar

import CountriesCharts from "@/components/common/charts/BarChart";

import { fetchUsersByCountries } from "../../../api/protocolApi";
import ErrorBox from "../../common/ErrorBox";
import Loader from "../../common/Loader";

const UsersByCountry = () => {
	const [usersByCountry, setUsersByCountry] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	useEffect(() => {
		setLoading(true);
		fetchUsersByCountries()
			.then((res) => {
				if (res.success) {
					setUsersByCountry(res.data);
				} else {
					setError(res?.message);
				}
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	const { data, countriesList } = usersByCountry.reduce(
		(acc, { countryName, count }) => ({
			...acc,
			data: [...acc.data, count],
			countriesList: [...acc.countriesList, countryName],
		}),
		{ data: [], countriesList: [] }
	);

	const series = [
		{
			data: data,
		},
	];
	// const countriesList = ["United States", "Canada", "Vietnam", "UK"];

	return (
		<React.Fragment>
			<Card>
				<div className="card-header align-items-center d-flex">
					<h4 className="card-title mb-2 mt-2 flex-grow-1 text-dark">
						Users by Countries
					</h4>
				</div>

				<div className="card-body p-0">
					{loading ? (
						<Loader />
					) : error ? (
						<ErrorBox error={error} />
					) : (
						<div>
							<CountriesCharts
								dataColors='[ "--vz-primary", "--vz-info",  "--vz-danger", "--vz-success"]'
								series={series}
								categories={countriesList}
								height={300}
								width={"85%"}
							/>
						</div>
					)}
				</div>
			</Card>
		</React.Fragment>
	);
};

export default UsersByCountry;
