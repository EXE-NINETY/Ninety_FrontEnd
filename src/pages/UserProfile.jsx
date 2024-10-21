import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';


const countries = [
    { code: "US", name: "United States of America" },
    { code: "VN", name: "Viet Nam" },
    { code: "JP", name: "Japan" },
    { code: "FR", name: "France" },
];

const Profile = () => {
    const [profile, setProfile] = useState({
        name: '',
        dob: '',
        nationality: '',
        gender: '',
        phoneNumber: '',
    });

    useEffect(() => {
        const accountDTO = JSON.parse(sessionStorage.getItem('accountDTO'));
        console.log(accountDTO.id);

        axios.get(`https://ninety-bzfzbhe0dzgdd0hb.southeastasia-01.azurewebsites.net/api/user/${accountDTO.id}`)
            .then(response => {
                const userData = response.data.data;
                setProfile({
                    name: userData.name || '',
                    dob: userData.dateOfBirth ? userData.dateOfBirth.split('T')[0] : '',
                    nationality: userData.nationality || '',
                    gender: userData.gender || '',
                    phoneNumber: userData.phoneNumber || '',
                });
            })
            .catch(error => {
                console.error('There was an error fetching the user data!', error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prevProfile => ({
            ...prevProfile,
            [name]: value
        }));
    };

    const handleSaveProfile = () => {
        const accountDTO = JSON.parse(sessionStorage.getItem('accountDTO'));

        const updatedProfile = {
            id: accountDTO.id,
            name: profile.name,
            dateOfBirth: profile.dob,
            password: accountDTO.password,
            nationality: profile.nationality,
            gender: profile.gender,
            phoneNumber: profile.phoneNumber,
        };

        axios.put(`https://ninety-bzfzbhe0dzgdd0hb.southeastasia-01.azurewebsites.net/api/user/${accountDTO.id}`, updatedProfile)
            .then(response => {
                console.log('Profile updated successfully:', response.data);
                toast.success('Update profile successful!');
            })
            .catch(error => {
                console.error('There was an error updating the profile!', error);
            });
    };

    return (
        <Container className="rounded bg-white mt-5 mb-5">
            <Row>
                <Col md={3} className="border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        <Image
                            className="rounded-circle mt-5"
                            width="150px"
                            src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                        />
                        <span className="font-weight-bold text-dark">{profile.name}</span>
                        <span className="text-dark">{profile.phoneNumber}</span>
                    </div>
                </Col>
                <Col md={9} className="border-right">
                    <div className="p-3 py-5">
                        <h4 className="text-right mb-3 text-dark">Profile Settings</h4>
                        <Form>
                            <Row className="mt-2">
                                <Col md={12}>
                                    <Form.Group>
                                        <Form.Label className="labels text-dark">Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="first name"
                                            value={profile.name}
                                            name="name"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className="mt-3">
                                <Col md={12}>
                                    <Form.Group>
                                        <Form.Label className="labels text-dark">Mobile Number</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="enter phone number"
                                            value={profile.phoneNumber}
                                            name="phoneNumber"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md={12}>
                                    <Form.Group>
                                        <Form.Label className="labels text-dark">Date of birth</Form.Label>
                                        <Form.Control
                                            type="date"
                                            placeholder="enter date of birth"
                                            value={profile.dob}
                                            name="dob"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group>
                                        <Form.Label className="labels text-dark">Gender</Form.Label>
                                        <Form.Select
                                            aria-label="Select gender"
                                            name="gender"
                                            value={profile.gender}
                                            onChange={handleChange}
                                        >
                                            <option value="" disabled>Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>

                                {/* <Col md={9}>
                                    <Form.Group>
                                        <Form.Label className="labels text-dark">Nationality</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="nationality"
                                            value={profile.nationality}
                                            name="nationality"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col> */}
                                <Col md={9}>
                                    <Form.Group>
                                        <Form.Label className="labels text-dark">Nationality</Form.Label>
                                        <Form.Select
                                            aria-label="Select nationality"
                                            name="nationality"
                                            value={profile.nationality}
                                            onChange={handleChange}
                                        >
                                            <option value="" disabled>Select Nationality</option>
                                            {countries.map(country => (
                                                <option key={country.name} value={country.name}>
                                                    {country.name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <div className="mt-5 text-center">
                                <Button className="profile-button" type="button" onClick={handleSaveProfile}>
                                    Save Profile
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
