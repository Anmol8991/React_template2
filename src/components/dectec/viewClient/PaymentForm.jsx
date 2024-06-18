import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import {
  clientBuyPoints,
  getPointsFromAmountPaidApi,
} from "../../../api/dectecApi";
import { notify } from "../../../utils/toastify";

export const PaymentForm = ({
  protocolId,
  clientId,
  close,
  setUpdatePayments,
}) => {
  const [loading, setLoading] = useState(false);
  const [amountPaid, setAmountPaid] = useState("");
  const [pointsBought, setPointsBought] = useState("");

  const getPoints = () => {
    setLoading(true);
    getPointsFromAmountPaidApi(protocolId, amountPaid)
      .then((res) => {
        setPointsBought(res?.data?.points);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    const getData = setTimeout(() => {
      if (amountPaid) {
        getPoints();
      } else {
        setPointsBought("");
      }
    }, 1000);

    return () => {
      clearTimeout(getData);
    };
  }, [amountPaid]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    clientBuyPoints({ clientId, amount: amountPaid, point: pointsBought })
      .then((res) => {
        if (res.success) {
          notify(res.message, true);
        } else {
          notify(res.message, false);
        }
      })
      .catch((err) => {
        notify(err.message, false);
      })
      .finally(() => {
        setLoading(false);
        close();
        setUpdatePayments(true);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Row style={{ textAlign: "left" }}>
        <Col lg={12}>
          <div className="mb-3">
            <Label htmlFor="phonenumberInput" className="form-label">
              Amount Paid
            </Label>
            <Input
              type="number"
              className="form-control"
              id="phonenumberInput"
              placeholder="Enter amount paid"
              value={amountPaid}
              onChange={(e) => setAmountPaid(e.target.value)}
              // onBlur={() => {
              //   if (amountPaid) {
              //     getPoints();
              //   } else {
              //     setPointsBought("");
              //   }
              // }}
            />
          </div>
        </Col>
        <Col lg={12}>
          <div className="mb-3">
            <Label htmlFor="firstnameInput" className="form-label">
              Points Bought
            </Label>
            <Input
              type="number"
              className="form-control"
              id="pointsInput"
              placeholder="Enter points bought"
              value={pointsBought}
            />
          </div>
        </Col>

        <Col lg={12}>
          <div className="hstack gap-2 justify-content-end">
            <span
              onClick={() => close()}
              type="button"
              className="btn btn-light py-1 px-3"
            >
              Cancel
            </span>
            <button
              disabled={loading}
              type="submit"
              className="btn btn-primary py-1 px-3"
            >
              {loading ? (
                <span>
                  <Spinner size="sm" /> Fetching Points
                </span>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </Col>
      </Row>
    </form>
  );
};
