// @ts-nocheck
'use client'

import TelegramLoginButton from 'react-telegram-login';
import {ServerAuthLogin, ServerAuthTelegram} from "@/component/function/url_api";
import {AuthSet} from "@/store/reducer/myUser";
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import {useRouter} from "next/navigation";
import config from "../../../config.json";

export default function Telegram (props) {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const handleTelegramResponse = async responseTg => {
        //await ServerAuthTelegram

        //проверка ответа сервера
        //await ToastSystemAdd(result.data)
        let response = await ServerAuthTelegram(responseTg)

        //авторизация в сторе
        if (!response) return

        dispatch(AuthSet({
            _id: response._id,
            login: response.login,

            tokenId: response.tid,
            tokenKey: response.tkey,
            remember: true
        }))

        router.push('/game')
    };

    return <>
        <TelegramLoginButton dataOnauth={handleTelegramResponse} botName={config.telegram.botName} lang={'ru'}/>
    </>
}