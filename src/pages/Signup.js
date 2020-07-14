import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../helpers/auth';
import Header from '../components/Header';
import Footer from '../components/Footer';


export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            email: '',
            password: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });

    }
    async handleSubmit(event) {
        event.preventDefault();
        this.setState({
            error: '',
        });
        try {
            await signup(this.state.email, this.state.password);
        } catch (error) {
            this.setState({
                error: error.message,
            });
        }
    }
    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col col-md-6">
                            <form autoComplete='off' onSubmit={this.handleSubmit}>
                                <h1>Sign up to
                        <Link className="title ml-2" to='/'>pyCHAT</Link>
                                </h1>
                                <p>fill the form to create new Account</p>
                                <div className="form-group">
                                    <input className="form-control" placeholder="Email" name='email' type="email" onChange={this.handleChange} value={this.state.email}></input>
                                </div>
                                <div className="form-group">
                                    <input className="form-control" placeholder="Password" name='password' type="password" onChange={this.handleChange} value={this.state.password}></input>
                                </div>
                                <div>
                                    <button className="btn btn-primary" type='submit'>Sign up</button>
                                </div>
                                <div className="my-2 mx-1">
                                    {this.state.error ? <p className="col col-md-auto alert alert-danger" role="alert" >{this.state.error}</p> : null}
                                </div>
                                <hr></hr>
                                <p>Already have an account? <Link to="/login">Login</Link></p>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}