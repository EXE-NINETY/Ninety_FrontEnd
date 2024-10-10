import React from 'react';
import { FaShieldAlt, FaTrophy, FaUsers } from 'react-icons/fa';

const HomePage = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className="card border-warning" style={{ width: "100%", borderWidth: '3px' }}>
                        <div className="card-body">
                            <h5 className="card-title">
                                <FaTrophy style={{ color: 'gold' }} /> Card title
                            </h5>
                            <p className="card-text">
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </p>
                            <a href="#" className="btn btn-primary">
                                Go somewhere
                            </a>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card border-primary" style={{ width: "100%", borderWidth: '3px' }}>
                        <div className="card-body">
                            <h5 className="card-title">
                                <FaShieldAlt style={{ color: 'blue' }} /> Team
                            </h5>
                            <p className="card-text">
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </p>
                            <a href="/teams" className="btn btn-primary">
                                Go somewhere
                            </a>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card border-danger" style={{ width: "100%", borderWidth: '3px' }}>
                        <div className="card-body">
                            <h5 className="card-title">
                                <FaUsers style={{ color: 'red' }} /> Card title
                            </h5>
                            <p className="card-text">
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </p>
                            <a href="#" className="btn btn-primary">
                                Go somewhere
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
