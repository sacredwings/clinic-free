import React, {} from 'react';
import {connect} from "react-redux";
import {BrowserRouter as Router, Route, Redirect, Switch, Link} from 'react-router-dom';

function MenuTop(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">ООО "Пульсар"</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link active" aria-current="page" to="/">Главная</Link>
                        <Link className="nav-link active" aria-current="page" to="/org">Организации</Link>
                        <Link className="nav-link active" aria-current="page" to="/org/add">Добавить организацию</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default connect (
    state => ({
        myUser: state.myUser,
    }),
    dispatch => ({

    })
)(MenuTop);