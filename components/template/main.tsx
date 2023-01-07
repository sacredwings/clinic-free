import Head from "next/head" //заголовок
import {useEffect, useState} from "react"
import { useRouter } from 'next/router' //переход по url
import axios from "axios"

import Top from '../menu/top' //верхнее меню
import Footer from './footer' //левое меню
//import "bootstrap/dist/css/bootstrap.min.css" //стили bootstrap

//store
import {useAppSelector, useAppDispatch} from "../../store/hooks"
import {Login as myUserLogin, Logout as myUserLogout} from "../../store/myUser"

export default function ({children, title}) {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const myUser = useAppSelector((state) => state.myUser)

    useEffect(() => {
        (async () => {
            //подключение bootstrap
            typeof document !== undefined ? require('bootstrap/dist/js/bootstrap') : null

            //загрузка
            await getUser()
        })()

    }, [])

    const getUser = async () => {
        //если уже загружено / не загружаем
        if (myUser.auth) return

        let result = await axios.get(`/api/auth/getById`)
        //getResponse(result.data.response)

        if (result.data.response)
            Login(
                result.data.response._id,
                result.data.response.login
            )

    }

    const Login = (_id, login) => {
        dispatch(myUserLogin({
            _id: _id,
            login: login,
        }))
    }

    const Logout = async () => {
        await router.push('/')
        dispatch(myUserLogout())
    }

    return <>
        <Head>
            <title>{title}</title>
        </Head>

        <Top user={myUser} Logout={Logout} />

        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    {children}
                </div>
            </div>
        </div>

        <Footer />
    </>
}