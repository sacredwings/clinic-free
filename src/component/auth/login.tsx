'use client'

import Link from "next/link"
import {useState} from 'react'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { AuthSet } from '@/store/myUser'
import config from '../../../config.json'
import {useRouter} from "next/navigation";
import {ServerAuthLogin} from "@/component/function/url_api";
//https://oauth.vk.com/token?grant_type=password&client_id=2274003&client_secret=hHbZxrka2uZ6jB1inYsH&username=%D0%9B%D0%9E%D0%93%D0%98%D0%9D&password=%D0%9F%D0%90%D0%A0%D0%9E%D0%9B%D0%AC&captcha_key=q24yud&captcha_sid=656412648896

export default function (props) {
    let [form, setForm] = useState({
        login: '',
        password: '',
        remember: true
    })
    let formErrDefault = {
        login: false,
        password: false,
    }

    let [formErr, setFormErr] = useState(formErrDefault)

    const router = useRouter()
    const dispatch = useAppDispatch()

    const onClickAuth = async (e) => {
        e.preventDefault()


        //выходим ошибки формы
        if (form.login.length < 5)
            setFormErr(prevState => ({...prevState, login: true}))
        if (form.password.length < 8)
            setFormErr(prevState => ({...prevState, password: true}))

        //системная ошибка
        if ((form.login.length < 5) || (form.password.length < 8)) {
            return
        }

        //проверка ответа сервера
        //await ToastSystemAdd(result.data)
        let response = await ServerAuthLogin({
            login: form.login,
            password: form.password,
        })

        //авторизация в сторе
        if (!response) return

        dispatch(AuthSet({
            _id: response._id,
            login: response.login,

            tokenId: response.tid,
            tokenKey: response.tkey,
            remember: form.remember
        }))

        //router.push('/game')
    }

    const onChange = (event) => {
        const name = event.target.name;
        let value = event.target.value

        //удаление пробелов
        if (name === 'login')
            value = value.replace(/\s/g, '');

        //выходим если длиньше 32
        if (event.target.value.length > 32) return

        //сбрасываем ошибки
        setFormErr(formErrDefault)

        setForm(prevState => ({...prevState, [name]: value}))
    }

    const onChangeRemember = (event) => {
        setForm(prevState => ({
            ...prevState, remember: !prevState.remember
        }))
    }

    return (
        <div className="card">
            <div className="card-body">
                <form onSubmit={onClickAuth}>

                    <div className="mb-3">
                        <label htmlFor="profileLogin" className="form-label">Логин</label>
                        <input type="text" className={`form-control ${formErr.login ? `is-invalid`: null }`} id="login" name="login" minLength={5} value={form.login} onChange={onChange}/>
                        <div id="validationServer03Feedback" style={formErr.login ? {display: 'block'} : null} className={`invalid-feedback`}>
                            Введите более 5 символов
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="profilePassword" className="form-label">Пароль</label>
                        <input type="password" className={`form-control ${formErr.password ? `is-invalid`:null}`} id="password" name="password" minLength={8} value={form.password} onChange={onChange} autoComplete="password"/>
                        <div id="validationServer03Feedback" style={formErr.password ? {display: 'block'} : null} className={`invalid-feedback`}>
                            Введите более 8 символов
                        </div>
                    </div>

                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="remember" checked={form.remember} onChange={onChangeRemember}/>
                        <label className="form-check-label" htmlFor="remember">Запомнить меня</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Войти</button>&nbsp;

                </form>
            </div>
        </div>

    )
}