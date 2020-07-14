import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class Home extends Component {
    render() {
        return (
            <div>
                <Header />
                <div>
                    <div className="jumbotron jumbotron-fluid">
                        <div className="container text-center">
                            <h1 className="display-4">Welcome to pyCHAT</h1>
                            <p className="lead">share your thoughts with friends securely!</p>
                            <div className="mt-4">
                                <Link className="btn btn-primary px-5 mr-3" to="/signup">Create New Account</Link>
                                <Link className="btn px-5" to="/login">Login to Your Account</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}