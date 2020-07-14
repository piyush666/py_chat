import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signin } from '../helpers/auth';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Login extends Component {
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
            await signin(this.state.email, this.state.password);
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
                                <h1>Login  to
                        <Link className="title ml-2" to='/'>pyCHAT</Link>
                                </h1>
                                <p>fill the form to log into your Account</p>
                                <div className="form-group">
                                    <input className="form-control" placeholder="Email" name='email' type="email" onChange={this.handleChange} value={this.state.email}></input>
                                </div>
                                <div className="form-group">
                                    <input className="form-control" placeholder="Password" name='password' type="password" onChange={this.handleChange} value={this.state.password}></input>
                                </div>
                                <div>
                                    <button className="btn btn-primary" type='submit'>Login</button>
                                </div>
                                <div className="my-2 mx-1">
                                {this.state.error ? <p className="col col-md-auto alert alert-danger" role="alert" >{this.state.error}</p> : null}
                                </div>
                                <hr></hr>
                                <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
export default Login;