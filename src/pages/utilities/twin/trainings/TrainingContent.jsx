import React from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { PageHeader } from "@/components/common/PageHeader";
import ChatWindow from "../../../../components/utilities/chatBox/ChatWindow";
import { useLocation } from "react-router-dom";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const TrainingContent = () => {
	const CustomPluginRenderers = [
		...DocViewerRenderers,
		// { name: "Header", component: () => null },
	];

	const location = useLocation();
	const data = location.state?.data;
	console.log({ data });
	const docs = [
		{ uri: data?.fileUrl }, // Remote file
	];

	return (
		<div className="page-content">
			<Container fluid>
				<Row>
					<Col lg={6}>
						<Card style={{ height: "600px" }}>
							<CardHeader className="bg-light">
								<h3>{data?.fileName}</h3>
							</CardHeader>
							<CardBody
								style={{
									overflowY: "scroll",
									height: "100%",
								}}
							>
								<div className="bg-light p-3 h-100 w-100 rounded">
									<DocViewer
										documents={docs}
										pluginRenderers={CustomPluginRenderers}
										initialActiveDocument={docs[0]}
										className="h-100 w-100 text-light"
									/>
									;
								</div>
							</CardBody>
						</Card>
					</Col>
					<Col lg={6}>
						<ChatWindow height={"600px"} data={data} />
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default TrainingContent;
