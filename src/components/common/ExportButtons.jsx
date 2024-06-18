import React from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "reactstrap";
const ExportButtons = () => {
  const history = useNavigate();

  return (
        <Row className="mb-4 float-end">
            <Col style={{paddingRight:"0"}}>
                <label htmlFor="rows">Exports</label>
                <div className="dt-buttons " >
                    <button className="dt-button btn buttons-excel buttons-html5" style={{marginRight:"1rem"}}  type="button"><span>Excel</span></button>
                    <button className="dt-button btn buttons-pdf buttons-html5" style={{marginRight:"1rem"}}  type="button"><span>PDF</span></button> 
                </div>
            </Col>
        </Row>
    );
};

export default ExportButtons;
