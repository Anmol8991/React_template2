import { Card, CardHeader, Col, Row, Input } from "reactstrap";
import { CustomButton } from "@/components/common/CustomButton";

export const PageHeader = ({
  pageHeading,
  linkText,
  pathName,
  isLink,
  bulkBtn,
  linkIcon,
  points,
  searchBar,
  searchOnChange,
  searchValue,
  btn,
}) => {
  return (
    <Col md={12} lg={12}>
      <Card id="invoiceList">
        <CardHeader className="border-0">
          <Row className="d-flex align-items-center justify-content-between gap-2 gap-md-0">
            <Col md={6}>
              <h4 className=" mb-0 flex-grow-1 text-dark">{pageHeading}</h4>
            </Col>
            <Col md={6}>
              <div className="d-flex flex-wrap align-items-center gap-2 justify-content-md-end">
                {isLink && (
                  <CustomButton
                    btnText={linkText}
                    btnClassNames="btn btn-danger"
                    btnIcon={linkIcon}
                    path={pathName}
                    isLink
                  />
                )}
                {bulkBtn && (
                  <button className="btn btn-primary m-2">
                    <span>Bulk Upload</span>
                  </button>
                )}
                {points && (
                  <span className="btn btn-primary">Points {points}</span>
                )}
                {searchBar && (
                  <div className="search-box">
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Search..."
                      value={searchValue}
                      onChange={searchOnChange}
                    />
                    <i className="ri-search-line search-icon"></i>
                  </div>
                )}
                {btn && btn}
              </div>
            </Col>
          </Row>
        </CardHeader>
      </Card>
      {/* </Col> */}
    </Col>
  );
};
