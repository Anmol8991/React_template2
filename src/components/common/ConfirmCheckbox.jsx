import React from "react";
import { Input } from "reactstrap";

const ConfirmCheckbox = ({ onChangeFn, confirmCheck, disabled }) => {
  return (
    <label
      className="d-flex align-items-start gap-2 cursor-pointer"
      htmlFor="fee"
    >
      <Input
        disabled={disabled}
        type="checkbox"
        name=""
        id="fee"
        value={confirmCheck}
        onChange={(e) => onChangeFn(e.target.checked)}
      />
      I agree that the transaction fee will be deducted from the points I will
      earn after submitting this activity.
    </label>
  );
};

export default ConfirmCheckbox;
