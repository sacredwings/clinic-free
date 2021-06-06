import React, {} from 'react';
import {connect} from "react-redux";
import {BrowserRouter as Router, Route, Redirect, Switch, Link} from 'react-router-dom';
import OrganizationAdd from "./organization/Add";
import MenuTop from "./element/MenuTop";
import Footer from "./element/Footer";

function App(props) {

    //страницы с авторизацией
    const pageAuth = () => {
        //массив
        let pages = [
            //{path: '/organization', component: Organization},

        ];
        //формирование
        pages = pages.map(function (page, i) {
            return <Route exact key={i} path={page.path} component={page.component} />
        });
        //вывод
        return pages
    }

    //страницы без авторизации
    const pageNoAuth = () => {
        //массив
        let pages = [
            {path: '/organization/add', component: OrganizationAdd},
        ];
        //формирование
        pages = pages.map(function (page, i) {
            return <Route key={i} path={page.path} component={page.component} />
        });
        //вывод
        return pages
    }

    return (
        <Router>
            <MenuTop/>

            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <Switch>

                            {(props.myUser.auth) ? pageAuth() : pageNoAuth()}

                        </ Switch >
                    </div>

                </div>
            </div>

            <Footer/>
        </Router>
    )
}

export default connect (
    state => ({
        myUser: state.myUser,
    }),
    dispatch => ({

    })
)(App);