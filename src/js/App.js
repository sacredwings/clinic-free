import React, {} from 'react';
import {connect} from "react-redux";
import {BrowserRouter as Router, Route, Redirect, Switch, Link} from 'react-router-dom';
import OrgAdd from "./hfOrg/Add";
import OrgGet from "./hfOrg/Get";
import OrgContractGet from "./hfContract/Get";
import OrgContractAdd from "./hfContract/Add";
import HfUserAdd from "./hfUser/Add";
import HfUserGet from "./hfUser/Get";

import Admin from "./admin/init";

import MenuTop from "./element/MenuTop";
import Footer from "./element/Footer";
import Landing from "./element/Landing";

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
            {path: '/', component: Landing},

            //организации
            {path: '/org/add', component: OrgAdd},
            {path: '/org', component: OrgGet},

            //договора
            {path: '/org-:id/contract', component: OrgContractGet},
            {path: '/org-:id/contract/add', component: OrgContractAdd},

            //клиенты организации
            {path: '/contract-:id/user', component: HfUserGet},
            {path: '/contract-:id/user/add', component: HfUserAdd},

            {path: '/admin', component: Admin},
        ];
        //формирование
        pages = pages.map(function (page, i) {
            return <Route exact key={i} path={page.path} component={page.component} />
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