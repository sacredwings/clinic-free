// @ts-nocheck
//обработка результатов ответа сервера на запросы

import { useAppSelector, useAppDispatch, useAppStore } from '@/store/hooks'
import { Add, Del } from '@/store/reducer/toastSystem'

async function ToastSystemAdd ({code, msg}) {
    /*
    console.log(useAppDispatch)
    console.log(useAppDispatch())
    const dispatch = useAppDispatch()
    console.log(dispatch)
    dispatch(
        Add({
            code,
            msg
        })
    )*/
}

async function ToastSystemDel (id) {
    /*
    dispatch(
        Del({
            id
        })
    )*/
}

export {
    ToastSystemAdd,
    ToastSystemDel
}