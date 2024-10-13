import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { array, func } from 'prop-types';
import { Button, Modal, Container, Card, Row, Col, Alert, ListGroup } from 'react-bootstrap';
import axios from 'axios';

const CustomerDetail = () => {
    const [customer, setCustomer] = useState([]);
    const [customerAccount, setCustomerAccount] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchCustomerDetails = async(id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/customers/${id}`);
            setCustomer(response.data);
        } catch(error) {
            console.log("Error fetching products: ", error);
            setErrorMessage(error.message);
        }
    };

    const fetchCustomerAccount = async(id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/customeraccounts/customerId/${id}`);
            if(response.data.length > 0) {
                setCustomerAccount(response.data[0]);
                console.log(customerAccount);
            }
            else {
                setCustomerAccount(null);
            }
        } catch(error) {
            console.log("Error fetching products: ", error);
            setErrorMessage(error.message);
        }
    };
    const deleteCustomer = async(id) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/customers/${id}`);
            if(customerAccount != null) {
                await axios.delete(`http://127.0.0.1:5000/customeraccounts/${customerAccount.id}`);
            }
            setShowSuccessModal(true);
        } catch (error) {
            setErrorMessage(error.message);
        } 
    };

    useEffect(() => {
        if(id) {
            fetchCustomerDetails(id);
            fetchCustomerAccount(id);
        }
    }, [id]);

    const handleClose = () => {
        setShowSuccessModal(false);
        navigate('/customers');
    };

    return (
        <Container className='my-5'>
            <Row>
                <h3>Customer Details</h3>
            </Row>
            {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
            <Row className='my-3'>
                <Card className='shadow-lg rounded-3'>
                    <Card.Body>
                        <Card.Title><h4>{customer.name}</h4></Card.Title>
                        <Card.Text>
                                    Username: {customerAccount && customerAccount.username}
                                    Password: {customerAccount && customerAccount.password}
                                    Account ID: {customerAccount && customerAccount.id}
                        </Card.Text>
                        </Card.Body>
                </Card>
                
            </Row>
            <Row className='my-3'>
                <Col xs={12} md={4}> 
                <Button variant='secondary' className='mx-2 my-3' style={{minWidth: '60%',}} onClick={() => navigate(`/customers`)}>Return to Customer List</Button>
                </Col>
                <Col xs={12} md={4}>
                    <Button variant='primary' className='mx-2 my-3' style={{minWidth: '60%',}} onClick={() => navigate(`/edit-customer/${customer.id}`)}>Edit</Button>
                </Col>
                <Col xs={12} md={4}>
                    <Button variant='danger' className='mx-2 my-3' style={{minWidth: '60%',}} onClick={() => deleteCustomer(customer.id)}>Delete</Button>
                </Col>
            </Row>
            <Row>
                <Button variant='primary' onClick={() => navigate(`/add-order/${customer.id}`)}>Create Order</Button>
            </Row>
            <Modal show={showSuccessModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Product has been successfully deleted!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>

            </Modal>
        </Container>

    )
}

CustomerDetail.propTypes = {
    customerDetails: array,
    customerAccountDetails: array,
    onEditCustomer: func,
    onCustomerDeleted: func
}

export default CustomerDetail;
