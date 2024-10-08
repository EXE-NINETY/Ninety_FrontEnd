import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Image } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5090/api/auth/login', {
                username: username,
                password: password,
            });
            console.log('Login successful:', response.data);
            sessionStorage.setItem('accountDTO', JSON.stringify(response.data.accountDTO));
            toast.success('Sign in successful!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            navigate('/');
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
                                        type="email"
                                        id="form1Example13"
                                        className="form-control-lg"
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
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
                                    />
                                </Form.Group>

                                <div className="d-flex justify-content-around align-items-center mb-4">
                                    <Form.Check
                                        type="checkbox"
                                        id="form1Example3"
                                        label="Remember me"
                                        defaultChecked
                                    />
                                    <a href="#!">Forgot password?</a>
                                </div>

                                <Button type="submit" className="btn-lg btn-block me-2">
                                    Sign in
                                </Button>

                                <Button className="btn-lg btn-success" href='/Sign-up'>
                                    Sign up
                                </Button>

                                <div className="divider d-flex align-items-center my-4">
                                    <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                                </div>

                                <Button
                                    className="btn-lg btn-block me-1"
                                    style={{ backgroundColor: '#3b5998' }}
                                    href="#!"
                                >
                                    <i className="fab fa-facebook-f me-2"></i>Continue with Facebook
                                </Button>
                                <Button
                                    className="btn-lg btn-block"
                                    style={{ backgroundColor: '#55acee' }}
                                    href="#!"
                                >
                                    <i className="fab fa-twitter me-2"></i>Continue with Twitter
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Login;
