import React, { useState, useEffect } from 'react';
import { Container, Form, FormGroup, FormText } from 'react-bootstrap';

function CustomForm({ inputs, formDescription, setCustomFormValues }) {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});

    function handleChange(e) {
        const { name, value } = e.target;
        setValues({ ...removeUnwantedValues(), [name]: value });
    }

    useEffect(() => {
        inputs.map(e => e.name)
        const newErrors = {};
        inputs.forEach(input => {
            if (input.required && !values[input.name]) {
                newErrors[input.name] = input.errorMessage;
            }
        });
        setErrors(newErrors);
        setCustomFormValues(values)
    }, [values, inputs]);

    const removeUnwantedValues = () => {
        if (!Object.keys(values).length) {
            return;
        }
        const updatedObj = Object.fromEntries(
            Object.entries(values).filter(([key]) => inputs.map(e => e.name).includes(key))
        );
        return updatedObj;
    };

    return (
        <Container width="auto" className="pt-5 pb-5">
            <Form id="custom_form" className="d-inline-block border border-primary rounded p-5">
                {inputs.map((input, index) => (
                    <div key={index} >
                        <FormGroup key={index} className='d-inline-flex ' >
                            <Form.Label className="" >{input.name}</Form.Label>
                            <Form.Control className="" placeholder={"Enter " + input.name}
                                id={input.id}
                                name={input.name}
                                type={input.type}
                                value={values[input.name] || ''}
                                onChange={handleChange} />
                        </FormGroup><br />
                        {errors[input.name] && (
                            <p style={{ color: 'red' }}>{errors[input.name]}</p>
                        )} <br />
                    </div>
                ))}
                <FormText className="">
                    {formDescription}
                </FormText>
            </Form>
        </Container>
    );
}

export default CustomForm;
