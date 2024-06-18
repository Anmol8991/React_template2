import React from "react";
import { Card } from "reactstrap";

const ErrorBox = ({ error }) => {
  return (
    <Card className="w-100 h-100 d-flex flex-col gap-3 justify-content-center align-items-center py-4">
      <span>
        <i className="bx bxs-error"></i> Something went wrong!
      </span>
      <span>{error}</span>
    </Card>
  );
};

export default ErrorBox;
