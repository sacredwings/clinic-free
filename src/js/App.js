import React, {useEffect} from 'react'
import {connect, useStore} from "react-redux"
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import OrgAdd from "./hfOrg/Add"
import OrgGet from "./hfOrg/Get"

import OrgContractGet from "./hfContract/Get"
import OrgContractAdd from "./hfContract/Add"

import HfUserAdd from "./hfUser/Add"
import HfUserGet from "./hfUser/Get"
import HfUserGetById from "./hfUser/GetById"

import HfUserFizGet from "./hfUserFiz/Get"
import HfUserFizPrice from "./hfUserFiz/Price"

import Hf from "./hf/Index"
import HfUpdate from "./hf/harmfulFactor/Update"
import HfUpdateResearch from "./hf/research/Update"
import HfUpdateSpecialist from "./hf/specialist/Update"

import OrgPrice from "./hfOrg/Price"
import OrgPriceTotal from "./hfOrg/PriceTotal"

import Admin from "./admin/init"

import MenuTop from "./element/MenuTop"
import Footer from "./element/Footer"
import Landing from "./element/Landing"

function App(props) {

    useEffect(async () => {
    }, [props])

    //страницы с авторизацией
    const pageAuth = () => {
        //массив
        let pages = [
            //{path: '/organization', element: Organization},

        ];
        //формирование
        pages = pages.map(function (page, i) {
            return <Route exact key={i} path={page.path} element={page.element} />
        });
        //вывод
        return pages
    }

    //страницы без авторизации
    const pageNoAuth = () => {
        //массив
        let pages = [
            {path: '/', element: <Landing />},

            {path: '/hf', element: <Hf />},
            {path: '/hf/update', element: <HfUpdate />},
            {path: '/hf/update-research', element: <HfUpdateResearch />},
            {path: '/hf/update-specialist', element: <HfUpdateSpecialist />},

            //организации
            {path: '/org/add', element: <OrgAdd/>},
            {path: '/org', element: <OrgGet/>},

            //договора
            {path: '/org-:id/contract', element: <OrgContractGet/>},
            {path: '/org-:id/contract/add', element: <OrgContractAdd/>},
            {path: '/org/price', element: <OrgPrice/>},

            //клиенты организации
            {path: '/contract-:id/user', element: <HfUserGet/>},
            {path: '/contract-:id/user/add', element: <HfUserAdd/>},

            //клиенты
            {path: '/prof-fiz/user/add', element: <HfUserAdd/>},
            {path: '/prof-fiz/user/get', element: <HfUserFizGet/>},
            {path: '/prof-fiz/price', element: <HfUserFizPrice/>},

            //1 клиент организации
            {path: '/contract-:contract_id/user-:user_id', element: <HfUserGetById/>},

            {path: '/admin', element: <Admin/>},
        ];
        //формирование
        pages = pages.map(function (page, i) {
            return <Route exact key={i} path={page.path} element={page.element} />
        });
        //вывод
        return pages
    }

    return (
        <BrowserRouter>
            <MenuTop/>

            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <Routes>

                            {pageNoAuth()}

                        </Routes >
                    </div>

                </div>
            </div>

            <Footer/>
        </BrowserRouter>
    )
}

export default App