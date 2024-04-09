import { useContext, useEffect, useState } from "react";
import api from "../../../../services/api";
import { Row, Col } from 'react-bootstrap';
import styles from './Dashboard.module.css';
import AppContext from "../../../../AppContext/Context";

const Index = () => {
    const { token } = useContext(AppContext);
    const [report, setReport] = useState({});
    useEffect(() => {
        api.get('/candies/report', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            console.log(response.data);
            setReport(response.data);
        });
    }, []);

    const renderTotalByCategory = () => {
        return report?.total_by_category?.map(item => {
            return (
                <Card
                    key={item.category}
                    label={item.category}
                    value={item.total}
                />
            );
        });
    }

    const Card = ({label, value}) => {
        return (
            <Col md={3}>
                <div className={styles.CardDashboard}>
                    <span className={styles.CardDashboardLabel}>{label}</span>
                    {value}
                </div>
             </Col>
        );
    }
    return (
        <div>
            <Row>
                <Card
                    label={'Total de doces'}
                    value={report?.total_candies}
                />
            </Row>

            <Row>
                {renderTotalByCategory()}
            </Row>

        </div>
    );
}

export default Index;