// @ts-nocheck
//обработка результатов ответа сервера на запросы
import Store from '@/store'
import { Add, Del } from '@/store/reducer/toastSystem'

async function ToastSystemAdd ({code, msg}) {
    Store.dispatch(
        Add({
            code,
            msg
        })
    )
}

async function ToastSystemDel (id) {
    Store.dispatch(
        Del({
            id
        })
    )
}

export {
    ToastSystemAdd,
    ToastSystemDel
}