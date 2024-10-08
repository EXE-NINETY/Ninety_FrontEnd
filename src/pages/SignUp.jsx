import axios from 'axios';
import React, { useState } from 'react'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUp = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5090/api/auth/sign-up', {
                name: name,
                password: password,
                email: email,
                role: role,
                phoneNumber: phoneNumber
            });
            toast.success('Sign up successful!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <>
            <section className="vh-100">
                <Container className="py-5 h-100">
                    <Row className="d-flex align-items-center justify-content-center h-100">
                        <Col md={8} lg={7} xl={6}>
                            <Image
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                fluid
                                alt="Phone image"
                            />
                        </Col>
                        <Col md={7} lg={5} xl={5} className="offset-xl-1">
                            <Form onSubmit={handleLogin}>
                                <Form.Group className="form-outline mb-4">
                                    <Form.Control
                                        type="text"
                                        id="form1Example13"
                                        className="form-control-lg"
                                        placeholder="Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="form-outline mb-4">
                                    <Form.Control
                                        type="email"
                                        id="form1Example13"
                                        className="form-control-lg"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="form-outline mb-4">
                                    <Form.Control
                                        type="text"
                                        id="form1Example13"
                                        className="form-control-lg"
                                        placeholder="Phone number"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        required
                                    />
                                </Form.Group>


                                <Form.Group className="form-outline mb-4">
                                    <Form.Control
                                        type="password"
                                        id="form1Example23"
                                        className="form-control-lg"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Select
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>
                                            Select Role
                                        </option>
                                        <option value="Host">Host</option>
                                        <option value="Participant">Participant</option>
                                    </Form.Select>
                                </Form.Group>

                                <Button className="btn-lg btn-block me-2" href='/Login'>
                                    Sign in
                                </Button>

                                <Button type="submit" className="btn-lg btn-success">
                                    Sign up
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default SignUp