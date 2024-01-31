// @ts-nocheck
import Link from "next/link"
import {useState} from 'react'
import axios from "axios"
//import {reCaptchaExecute} from 'recaptcha-v3-react-function-async'

//store
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { Auth } from '../../store/myUser'
import Joi from "joi";
//import appConfig from '../../appconfig.json'

//https://oauth.vk.com/token?grant_type=password&client_id=2274003&client_secret=hHbZxrka2uZ6jB1inYsH&username=%D0%9B%D0%9E%D0%93%D0%98%D0%9D&password=%D0%9F%D0%90%D0%A0%D0%9E%D0%9B%D0%AC&captcha_key=q24yud&captcha_sid=656412648896

export default function ManagerAdd (props) {
    let [form, setForm] = useState({
        login: '',
        password: '',

        first_name: '',
        last_name: '',
        second_name: ''
    })
    let formErrDefault = {
        login: false,
        password: false,
        first_name: false,
        last_name: false,
        second_name: false
    }
    let [formErr, setFormErr] = useState(formErrDefault)
    const dispatch = useAppDispatch()

    const onClickAuth = async (e) => {
        e.preventDefault()

        //выходим ошибки формы
        if (form.login.length < 3)
            setFormErr(prevState => ({...prevState, login: true}))
        if (form.password.length < 1)
            setFormErr(prevState => ({...prevState, password: true}))

        //системная ошибка
        if ((form.login.length < 5) || (form.password.length < 8)) {
            /*await ToastSystemAdd({
                msg: 'Форма заполнена не верно',
                type: "danger"
            })*/
            return
        }

        //let gtoken = await reCaptchaExecute(appConfig.reCaptcha, 'auth')

        //запрос
        let result = await axios.post(`/api/manager/add`, form)

        //проверка ответа сервера
        //await ToastSystemAdd(result.data)
        let response = result.data.response

        //авторизация в сторе
        if (!result.data.code)
            dispatch(Auth({
                _id: response._id,
                login: response.login,
                tokenId: response.tid,
                tokenKey: response.token,
                remember: form.remember
            }))
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



    return <form onSubmit={onClickAuth}>

        <div className="mb-3">
            <label htmlFor="profileLogin" className="form-label">Логин</label>
            <input type="text" className={`form-control ${formErr.login ? `is-invalid`: null }`} id="login" name="login" minLength={5} value={form.login} onChange={onChange}/>
            <div id="validationServer03Feedback" style={formErr.login ? {display: 'block'} : null} className={`invalid-feedback`}>
                Введите более 5 символов
            </div>
        </div>

        <div className="mb-3">
            <label htmlFor="password" className="form-label">Пароль</label>
            <input type="password" className={`form-control ${formErr.password ? `is-invalid`:null}`} id="password" name="password" minLength={8} value={form.password} onChange={onChange} autoComplete="password"/>
            <div id="validationServer03Feedback" style={formErr.password ? {display: 'block'} : null} className={`invalid-feedback`}>
                Введите более 8 символов
            </div>
        </div>

        <div className="mb-3">
            <label htmlFor="first_name" className="form-label">Имя</label>
            <input type="first_name" className={`form-control ${formErr.first_name ? `is-invalid`:null}`} id="first_name" name="first_name" minLength={8} value={form.first_name} onChange={onChange} autoComplete="first_name"/>
            <div id="validationServer03Feedback" style={formErr.first_name ? {display: 'block'} : null} className={`invalid-feedback`}>
                Введите более 8 символов
            </div>
        </div>

        <div className="mb-3">
            <label htmlFor="last_name" className="form-label">Фамилия</label>
            <input type="last_name" className={`form-control ${formErr.last_name ? `is-invalid`:null}`} id="last_name" name="last_name" minLength={8} value={form.last_name} onChange={onChange} autoComplete="last_name"/>
            <div id="validationServer03Feedback" style={formErr.last_name ? {display: 'block'} : null} className={`invalid-feedback`}>
                Введите более 8 символов
            </div>
        </div>

        <div className="mb-3">
            <label htmlFor="second_name" className="form-label">Отчество</label>
            <input type="second_name" className={`form-control ${formErr.second_name ? `is-invalid`:null}`} id="second_name" name="second_name" minLength={8} value={form.second_name} onChange={onChange} autoComplete="second_name"/>
            <div id="validationServer03Feedback" style={formErr.second_name ? {display: 'block'} : null} className={`invalid-feedback`}>
                Введите более 8 символов
            </div>
        </div>

        <button type="submit" className="btn btn-primary">Добавить</button>
    </form>
}