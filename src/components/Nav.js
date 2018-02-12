import React from 'react';
import Auth from '../modules/Auth';

function checkAuth() {
    if(Auth.isUserAuthenticated()) {
        return (
            <ul className="nav navbar-nav">
                <li role="presentation" className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" href="#">
                        Browse Recipes<span className="caret"></span>
                    </a>
                    <ul className="dropdown-menu">
                        <li role="presentation"><a href="/recipes">All Recipes</a></li>
                        <li role="presentation"><a href="#">Coffee</a></li>
                        <li role="presentation"><a href="#">Hot Chocolate</a></li>
                        <li role="presentation"><a href="#">Punch</a></li>
                        <li role="presentation"><a href="#">Mocktails</a></li>
                        <li role="presentation"><a href="#">Smoothies</a></li>
                        <li role="presentation"><a href="#">Tea</a></li>
                        <li role="presentation"><a href="#">Other</a></li>
                    </ul>
                </li>
                <li role="presentation"><a href="/submit">Submit a Recipe</a></li>
                <li className="nav-link"><a href="/" onClick={logout}>Logout</a></li>
                <li role="presentation"><a href="#">About</a></li>
            </ul>
        );
    } else {
        return (
            <ul className="nav navbar-nav">
                <li role="presentation" className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" href="#">
                        Browse Recipes<span className="caret"></span>
                    </a>
                    <ul className="dropdown-menu">
                        <li role="presentation"><a href="/recipes">All Recipes</a></li>
                        <li role="presentation"><a href="#">Coffee</a></li>
                        <li role="presentation"><a href="#">Hot Chocolate</a></li>
                        <li role="presentation"><a href="#">Punch</a></li>
                        <li role="presentation"><a href="#">Mocktails</a></li>
                        <li role="presentation"><a href="#">Smoothies</a></li>
                        <li role="presentation"><a href="#">Tea</a></li>
                        <li role="presentation"><a href="#">Other</a></li>
                    </ul>
                </li>            <li role="presentation"><a href="/login">Login</a></li>
                <li role="presentation"><a href="/signup">Sign Up</a></li>
                <li role="presentation"><a href="#">About</a></li>
            </ul>
        );
    }
}

function logout(e) {
    //remove authentication token
    Auth.deauthenticateUser();
}

const Nav = ({ children }) => (
  <nav className="navbar navbar-default navbar-static-top">
    <div className="container-fluid">
        <div className="navbar-header">
            <button type="button" className="navbar-toggle pull-right" data-toggle="collapse" data-target="#myNavbar">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
            </button>
            <a href="/" className="navbar-left">
                <img className="img-responsive logo" alt="logo" src="images/logo.png" />
            </a>
        </div>
        <div className="collapse navbar-collapse" id="myNavbar">
            {checkAuth()}
            <div className="col-sm-3 col-md-3 pull-right">
                <form className="navbar-form navbar-right" role="search">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Search" name="srch-term" id="srch-term" />
                        <div className="input-group-btn">
                            <button className="btn btn-default" type="submit"><i className="glyphicon glyphicon-search"></i></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  </nav>
);

export default Nav;