import { Card, CardBody } from "reactstrap";

import { DataUploadsTable } from "../../../components/utilities/twin/DataUploadTable";

const DataUploads = () => {
  return (
    <div className="">
      <Card>
        <CardBody>
          <div className="" style={{ padding: "10px" }}></div>
        </CardBody>
      </Card>
      <DataUploadsTable />
    </div>
  );
};

export default DataUploads;
