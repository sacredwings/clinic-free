// @ts-nocheck
//обработка результатов ответа сервера на запросы

import { useAppSelector, useAppDispatch, useAppStore } from '@/store/hooks'
import { Add, Del } from '@/store/reducer/toastSystem'

async function ToastSystemAdd ({code, msg}) {
    const dispatch = useAppDispatch()
    dispatch(
        Add({
            code,
            msg
        })
    )
}

async function ToastSystemDel (id) {
    dispatch(
        Del({
            id
        })
    )
}

export {
    ToastSystemAdd,
    ToastSystemDel
}