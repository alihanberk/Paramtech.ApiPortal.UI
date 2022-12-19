import { Card, Row, Col } from "antd";
import organizations from "data/organizations.data.json";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentOrganization } from "store/features/organization";

const Organizations = () => {
  const
    navigate = useNavigate(),
    dispatch = useDispatch(),
    intl = useIntl(),

    onOrganizationClick = organization => {
      dispatch(setCurrentOrganization(organization));
      navigate(`/organizations/${organization.id}`);
    };

  return (
    <div className="container">
      <Row gutter={[80, 80]} align="middle" className="full-height pointer">
        {
          organizations.map(organization =>
            <Col onClick={() => onOrganizationClick(organization)} xs={24} sm={8} key={organization.id} className="tile">
              <Card
                title={organization.name}
              >
                <p>{intl.formatMessage({id: organization.description})}</p>
              </Card>
            </Col>
          )
        }
      </Row>
    </div>
  )
};

export default Organizations;