import React, { useState } from "react";
import {
	Col,
	Row,
	Button,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownItem,
	DropdownMenu,
} from "reactstrap";
import { Link } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import Select from "react-select";
import { CustomButton } from "../../common/CustomButton";
import ExportButtons from "../../common/ExportButtons";

const Search = ({ setprotocols, setclients, setType }) => {
	const [activeClients, setactiveClients] = useState(false);
	const onchangeClients = (e) => {
		if (e.target.value === "clients") {
			setclients(true);
		} else {
			setclients(false);
		}
	};
	const onchangeProtocols = (e) => {
		if (e.target.value === "protocols") {
			setprotocols(true);
			setclients(true);
			setactiveClients(false);
		} else {
			setprotocols(false);
			setclients(true);
			setactiveClients(true);
		}
	};

	const onChangeType = (e) => {
		setType(e.target.value);
	};

	return (
		<React.Fragment>
			<Col lg={2} sm={4}>
				<label htmlFor="idStatus">Select Date Range</label>
				<Flatpickr
					className="form-control"
					placeholder="Select Date Range"
					options={{
						mode: "range",
						dateFormat: "d M, Y",
					}}
				/>
			</Col>
			<Col lg={2} sm={4}>
				<label htmlFor="redemptionType">Redemption Type</label>
				<div className="input-light">
					<select
						className="form-control"
						onChange={onChangeType}
						data-choices
						data-choices-search-false
						name="choices-single-default"
						id="redemptionType"
					>
						<option value="0">Redemption Type</option>
						<option value="1">Event</option>
						<option value="2">Donation</option>
						<option value="3">Gift Card</option>
					</select>
				</div>
			</Col>
			<Col lg={2} sm={4}>
				<label htmlFor="idStatus">Protocols</label>
				<div className="input-light">
					<select
						className="form-control"
						data-choices
						data-choices-search-false
						name="choices-single-default"
						id="idStatus"
					>
						<option defaultValue="protocols">Protocols</option>
						<option value="PERK">PERK</option>
						<option value="SophiaDao">SophiaDao</option>
						<option value="DOPE">DOPE</option>
						<option value="DeReal">DeReal</option>
						<option value="DVNet">DVNet</option>
					</select>
				</div>
			</Col>

			<Col lg={1} sm={4}>
				<label htmlFor="rows">Rows</label>
				<div className="input-light">
					<select
						className="form-control"
						data-choices
						data-choices-search-false
						name="choices-single-default"
						id="rows"
					>
						<option defaultValue="clients">10</option>
						<option value="Open">50</option>
						<option value="Inprogress">100</option>
						<option value="Closed">500</option>
					</select>
				</div>
			</Col>
			<Col xs={3} sm={2} lg={1}>
				<label htmlFor="idStatus">Clear</label>
				<CustomButton
					btnText=""
					btnClassNames="btn btn-danger w-75"
					btnIcon={<i className="ri-filter-fill me-1 align-bottom" />}
				/>
			</Col>
			<Col lg={2}>
				<ExportButtons />
			</Col>
		</React.Fragment>
	);
};

export default Search;
