import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../services/firebase';
import { logout } from '../helpers/auth';

function Header() {
    return(
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">pyCHAT</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    {
                        auth().currentUser ?
                            <div className="navbar-nav">
                                <Link className="nav-item nav-link" to="/chat">Profile</Link>
                                <button className="btn btn-light" onClick={() => logout()}>Logout</button>
                            </div>
                            :
                            <div className="navbar-nav">
                                <Link className="nav-item nav-link" to="/login">Log in</Link>
                                <Link className="nav-item nav-link" to="/signup">Sign up</Link>
                            </div>
                    }
                </div>
            </nav>
        </header>
    );
}
export default Header;