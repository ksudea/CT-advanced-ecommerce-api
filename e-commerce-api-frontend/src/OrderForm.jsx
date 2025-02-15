import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { object, func } from 'prop-types';
import { Form, Button, Alert, Modal, Spinner, Container, FormGroup, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const OrderForm = () => {
    
    const [errors, setErrors] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState({
        customer_id: id, date: currentDate, product_ids: []
    });
    // dynamically updating the form: no set number of products to purchase, so dynamically update
    // product id fields using formValues
    const [formValues, setFormValues] = useState([0]);

    useEffect(() => {
        //getting and formatting current date
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if needed
        const day = today.getDate().toString().padStart(2, '0'); // Add leading zero if needed
        setCurrentDate(`${year}-${month}-${day}`);

    }, []);

    const validateForm = () => {
        let errors = {};
        if (!order.customer_id) errors.customer_id="Customer ID is required";
        if (formValues.length == 0) errors.product_id="Product ID cannot be empty & must be greater than 0";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!validateForm()) return;
        setSubmitting(true);
        try {
            if(id) {
                //updating date and product_ids to reflect current values
                order.date = currentDate;
                order.product_ids = formValues;
                console.log(order);
                await axios.post(`http://127.0.0.1:5000/orders`, order);
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
        setOrder(prevOrder => ({
            ...prevOrder,
            [name]: value
        }));
    };

    //record change in product_id input in formValues
    const handleChangeProductId = (i, e) => {
        const newFormValues = [...formValues];
        newFormValues[i] = e.target.value;
        setFormValues(newFormValues);
        console.log(formValues);
      }
    
    //add new product_id field
    const addFormFields = () => {
        setFormValues([...formValues, 0]);
    }

    //remove product_id form field
    const removeFormFields = (i) => {
        const newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues);
    }
    
    const handleClose = () => {
        setShowSuccessModal(false);
        setOrder({customer_id: '', date: '', product_ids: []});
        setSubmitting(false);
        navigate('/customers');
    };

    if (isSubmitting) return <p>Submitting order data...</p>

    return (
        <Container className='my-5'>
            <Form onSubmit={handleSubmit}>
                <h3 className='my-3'> Create New Order </h3>
                {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
                <Form.Group controlId="customerId" className='my-4'>
                    <Form.Label>Customer ID: </Form.Label>
                    <Form.Control type="text" name="customer_id" value={order.customer_id} onChange={handleChange} isInvalid={!!errors.customer_id}/>
                    <Form.Control.Feedback type='invalid'>
                        {errors.customer_id}
                    </Form.Control.Feedback>
                </Form.Group>
                {formValues.map((formValue, index) => (
                    <FormGroup key={index} className='my-3'>
                        <Col>
                        <Form.Label>Product ID: </Form.Label>
                        <Form.Control type="number" name="product_id" onChange={e => handleChangeProductId(index, e)} isInvalid={!!errors.product_id}/>
                        <Form.Control.Feedback type='invalid'>
                            {errors.product_id}
                        </Form.Control.Feedback>
                        <Button className='my-2' onClick={() => removeFormFields(index)}>Remove</Button>
                        </Col>
                    </FormGroup>
                ))}
                <Button variant='secondary' className='my-3 mx-2' size='sm' onClick={() => addFormFields()}>+ Add Another Product</Button>
                <Button variant='primary' className='my-3 mx-2' type='submit' disabled={isSubmitting}>
                    {isSubmitting ? <Spinner as='span' animation='border' size='sm'/> : 'Submit'}
                </Button>
            </Form>
            <Modal show={showSuccessModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Order has been successfully added!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

OrderForm.propTypes = {
    selectedOrder: object,
    onOrderUpdated: func
}

export default OrderForm;