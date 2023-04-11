import React, { useState } from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import CustomForm from './CustomForm';
import CustomNavBar from '../Common/CustomNavBar';
import axios from "axios";

import typeSwitcherMap from '../res/typeSwitcherMap';
import Footer from '../Common/Footer';

const AddProducts = () => {
    const [error, setError] = useState(null);
    const [selectedOption, setSelectedOption] = useState('Type Switcher');
    const [sku, setSku] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [customFormValues, setCustomFormValues] = useState({});

    const navigate = useNavigate();
    const handleOptionChange = (event) => {
        setCustomFormValues({});
        const selectedOptionValue = event.target.value;
        if (selectedOptionValue === 'Type Switcher') {
            setSelectedOption('');
        }
        setSelectedOption(event.target.value);
    };

    const checkFieldsFilled = () => {
        if (sku.trim() === '' || name.trim() === '' || price.trim() === '' || selectedOption.trim() === 'Type Switcher') {
            return false;
        }
        const filledInputsInCustomForm = Object.entries(customFormValues).length;
        const compulsoryInputSet = typeSwitcherMap.get(selectedOption).formData.length;
        if (compulsoryInputSet !== filledInputsInCustomForm) {
            return false;
        }
        return true;
    }

    const addProduct = async () => {
        const nameIdMap = new Map();
        typeSwitcherMap.get(selectedOption).formData.forEach(field => {
            nameIdMap.set(field.name, field.id);
        });

        const data = {
            sku,
            name,
            price,
            type: selectedOption,
        };

        Object.keys(customFormValues).forEach(name => data[nameIdMap.get(name)] = customFormValues[name]);

        try {
            const res = await axios.post(process.env.REACT_APP_ROOT_URL + '?add', data);
            return true;
        } catch (error) {
            console.log(error, 'error');
            setError("SKU already exists please use a different SKU !");
            return false;
        }

    }

    const submitForm = async () => {
        if (!checkFieldsFilled()) {
            return;
        }
        const result = await addProduct();
        if (!result) {
            return;
        }
        resetValues();
        navigate("/");
    };

    const resetValues = () => {
        const form = document.getElementById('product_form');
        form.reset();
        setSelectedOption('Type Switcher');
        setName('');
        setSku('');
        setPrice('');
        setCustomFormValues({});
    };


    return (
        <Container className="">
            <br />
            <CustomNavBar title="Product List">
                <Button variant="primary" onClick={submitForm}>Save</Button>
                <Link className="mx-2" to="/">
                    <Button className="mx-2" variant="danger" >
                        Cancel
                    </Button>
                </Link>
            </CustomNavBar>
            <Container className="border-bottom  pb-4 min-height">
                <Form id="product_form" className="d-inline-block">
                    <Form.Group className='d-inline-flex'>
                        <Form.Label className="col-3">SKU</Form.Label>
                        <div className="form-control-feedback-container">
                            <Form.Control
                                isInvalid={!sku.length}
                                onChange={event => setSku(event.target.value)}
                                id='sku' className="col-9" type="text" placeholder="Enter SKU" />
                            <Form.Control.Feedback type="invalid">
                                Please, submit required SKU
                            </Form.Control.Feedback>
                        </div>
                    </Form.Group>
                    <br /><br />
                    <Form.Group className='d-inline-flex'>
                        <Form.Label className="col-3">Name</Form.Label>
                        <div className="form-control-feedback-container">
                            <Form.Control isInvalid={!name.length}
                                onChange={event => setName(event.target.value)}
                                id='name' className="col-9" type="text" placeholder="Enter name" />
                            <Form.Control.Feedback type="invalid">
                                Please, submit required Name
                            </Form.Control.Feedback>
                        </div>
                    </Form.Group>
                    <br /><br />
                    <Form.Group className='d-inline-flex'>
                        <Form.Label className="col-3">Price</Form.Label>
                        <div className="form-control-feedback-container">
                            <Form.Control
                                isInvalid={!price.length}
                                onChange={event => setPrice(event.target.value)}
                                id='price' className="col-9" type="number" min="0" placeholder="Enter price" />
                            <Form.Control.Feedback type="invalid">
                                Please, submit required Price
                            </Form.Control.Feedback>
                        </div>
                    </Form.Group>
                    <br /><br />
                    <Form.Group controlId="productType" className='d-inline-flex'>
                        <Form.Label className="col-4">Type</Form.Label>
                        <div className="form-control-feedback-container">
                            <Form.Select isInvalid={selectedOption === 'Type Switcher'} className="col-8" onChange={handleOptionChange}>
                                <option>Type Switcher</option>
                                <option>DVD</option>
                                <option>Book</option>
                                <option>Furniture</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Please,select a type
                            </Form.Control.Feedback>
                        </div>
                        <br />
                        <br />
                    </Form.Group>
                </Form>
                {typeSwitcherMap.get(selectedOption) !== undefined ?
                    <CustomForm setCustomFormValues={setCustomFormValues} formDescription={typeSwitcherMap.get(selectedOption).formDescription} inputs={typeSwitcherMap.get(selectedOption).formData} /> : ''}
                {error &&
                    <Alert variant={'danger'} dismissible onClose={() => setError('')}>
                        {error}
                    </Alert>}
            </Container>
            <Footer></Footer>
        </Container>
    );
}

export default AddProducts;