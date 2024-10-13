import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { object, func } from 'prop-types';
import { Form, Button, Alert, Modal, Spinner } from 'react-bootstrap';
import axios from 'axios';

const CustomerForm = () => {
    const [customer, setCustomer] = useState({
        name: '', email: '', phone: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const [customerAccount, setCustomerAccount] = useState({
        username: '', password: '', customer_id: id
    });
    const [customerAccountId, setCustomerAccountId] = useState('');


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
                setCustomerAccountId(response.data[0].id);
                console.log(customerAccount);
            }
        } catch(error) {
            console.log("Error fetching products: ", error);
            setErrorMessage(error.message);
        }
    };
    useEffect(() => {
        if(id) {
            fetchCustomerDetails(id);
            fetchCustomerAccount(id);
        }
    }, [id]);

    const validateForm = () => {
        let errors = {};
        if (!customer.name) errors.name="Customer name is required";
        if (!customer.email) errors.email="Customer email is required";
        if (!customer.phone) errors.phone="Customer phone number is required";
        if (!customerAccount.username) errors.username="Customer username is required";
        if (!customerAccount.password) errors.password="Customer password is required";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmitAccountAdd = async() => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/customers/email/${customer.email}`)
            console.log(customer.email);
            if(response.data.length > 0) {
                customerAccount.customer_id = response.data[0].id;
                axios.post(`http://127.0.0.1:5000/customeraccounts`, customerAccount);
            }
        } catch(error) {
            console.log("Error adding account: ", error);
            setErrorMessage(error.message);
        }
    };

    const handleSubmitAccountEdit = async() => {
        try {
            const formattedCustomerAccount = {...customerAccount, name: customer.name}
            console.log(formattedCustomerAccount);
            await axios.put(`http://127.0.0.1:5000/customeraccounts/${customerAccount.id}`, formattedCustomerAccount);
        } catch(error) {
            console.log("Error updating account: ", error);
            setErrorMessage(error.message);
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!validateForm()) return;
        setSubmitting(true);
        console.log('hi');
        try {
            if(id) {
                await axios.put(`http://127.0.0.1:5000/customers/${id}`, customer);
                handleSubmitAccountEdit();
            } else {
                await axios.post(`http://127.0.0.1:5000/customers`, customer);
                handleSubmitAccountAdd();
            }
            setShowSuccessModal(true);
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCustomer(prevCustomer => ({
            ...prevCustomer,
            [name]: value
        }));
    };

    const handleChangeAccount = (event) => {
        const { name, value } = event.target;
        setCustomerAccount(prevCustomerAccount => ({
            ...prevCustomerAccount,
            [name]: value
        }));
    };

    const handleClose = () => {
        setShowSuccessModal(false);
        setCustomer({name: '', email: '', phone: ''});
        setCustomerAccount({username: '', password: '', customer_id: ''});
        setSubmitting(false);
        navigate(`/customers`);
    };

    if (isSubmitting) return <p>Submitting product data...</p>

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <h3>{id ? 'Edit' : 'Add'}</h3>
                {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
                <Form.Group controlId="customerName">
                    <Form.Label>Name: </Form.Label>
                    <Form.Control type="text" name="name" value={customer.name} onChange={handleChange} isInvalid={!!errors.name}/>
                    <Form.Control.Feedback type='invalid'>
                        {errors.name}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="customerEmail">
                    <Form.Label>E-mail: </Form.Label>
                    <Form.Control type="text" name="email" value={customer.email} onChange={handleChange} isInvalid={!!errors.email}/>
                    <Form.Control.Feedback type='invalid'>
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="customerPhone">
                    <Form.Label>Phone number: </Form.Label>
                    <Form.Control type="number" name="phone" value={customer.phone} onChange={handleChange} isInvalid={!!errors.phone}/>
                    <Form.Control.Feedback type='invalid'>
                        {errors.phone}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="customerAccountUsername">
                    <Form.Label>Username: </Form.Label>
                    <Form.Control type="text" name="username" value={customerAccount.username} onChange={handleChangeAccount} isInvalid={!!errors.username}/>
                    <Form.Control.Feedback type='invalid'>
                        {errors.username}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="customerAccountPassword">
                    <Form.Label>Password: </Form.Label>
                    <Form.Control type="text" name="password" value={customerAccount.password} onChange={handleChangeAccount} isInvalid={!!errors.password}/>
                    <Form.Control.Feedback type='invalid'>
                        {errors.password}
                    </Form.Control.Feedback>
                </Form.Group>
                <Button variant='primary' type='submit' disabled={isSubmitting}>
                    {isSubmitting ? <Spinner as='span' animation='border' size='sm'/> : 'Submit'}
                </Button>
            </Form>
            <Modal show={showSuccessModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Customer has been successfully {id ? 'updated' : 'added'}!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>

            </Modal>
        </>
    );
};

CustomerForm.propTypes = {
    selectedCustomer: object,
    onCustomerUpdated: func
}

export default CustomerForm;