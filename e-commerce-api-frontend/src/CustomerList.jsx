import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { array, func } from 'prop-types';
import { Button, Container, ListGroup, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate();

    const fetchCustomers = async() => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/customers`);
            setCustomers(response.data);
        } catch(error) {
            console.log("Error fetching products: ", error);
        }
    };

    useEffect(() => {
        fetchCustomers();
        console.log(customers);
    }, []);

    return (
        <Container>
            <Row>
                <Col className='mt-4'>
                    <h2>Customers</h2>
                    <ListGroup className='my-4'>
                        {customers.map(customer => (
                            <ListGroup.Item key={customer.id} className="d-flex justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded">
                                {customer.name} | ID: {customer.id}
                                <div>
                                    <Button variant='secondary' className='me-2' onClick={() => navigate(`/customer-details/${customer.id}`)}>View Details</Button>
                                    <Button variant='primary' className='me-2' onClick={() => navigate(`/customer-form/${customer.id}`)}>Edit</Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
    
};
CustomerList.propTypes = {
    customers: array,
    onEditCustomer: func
}
export default CustomerList;