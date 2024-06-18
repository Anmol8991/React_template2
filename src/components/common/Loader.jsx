import React from "react";
import { Card, Spinner } from "reactstrap";

const Loader = () => {
  return (
    <Card className="w-100 h-100 d-flex flex-col gap-3 justify-content-center align-items-center py-4">
      <Spinner animation="border" role="status"></Spinner>
      <span>Loading please wait...</span>
    </Card>
  );
};

export default Loader;
