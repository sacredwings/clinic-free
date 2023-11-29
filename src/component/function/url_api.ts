import {interfaceVideoGet, interfaceAlbumGet} from './url_api_type'
import axios, {AxiosRequestConfig} from "axios"
import {ToastSystemAdd} from "@/component/toast/function";
import config from "../../../config.json";

/*
async function request (type, url, data, config) {
    let params = data
    let headers = {}
    let onUploadProgress = config.onUploadProgress

    if (is_server) headers.Cookie: cookies

    if (type==='post')
        await axios.post(url, params)
}*/

//АККАУНТ
export async function ServerAccountGet ({cookies=null}) {
    if (is_server()) axios.defaults.baseURL = `http://127.0.0.1:3000`

    let arFields = {
        headers: {
            Cookie: cookies
        }
    } as AxiosRequestConfig

    let url = `/api/account/get`
    console.log(url)
    let res = await axios.get(url, arFields)
    return res.data.response
}
export async function ServerOwnerGetById ({owner=null, ids=null}, {cookies=null}) {
    if (is_server()) axios.defaults.baseURL = `http://127.0.0.1:3000`

    let arFields = {
        params: {
            ids
        },
        headers: {
            Cookie: cookies
        }
    } as AxiosRequestConfig

    let url = `/api/${owner}/getById`
    console.log(url)
    let res = await axios.get(url, arFields)
    return res.data.response[0]
}
//---------------------------------------------------------------------------------
//ГРУППА
export async function ServerGroupGet ({
    q=null,

    offset=0,
    count=20
}, {
    cookies=null
}) {
    if (is_server()) axios.defaults.baseURL = `http://127.0.0.1:3000`

    let arFields = {
        params: {
            q,

            offset,
            count
        } as interfaceVideoGet,
        headers: {
            Cookie: cookies
        }
    } as AxiosRequestConfig

    let url = `/api/group/get`
    console.log(url)
    let res = await axios.get(url, arFields);
    return res.data.response
}

//---------------------------------------------------------------------------------
//ПОЛЬЗОВАТЕЛЬ
export async function ServerUserGet ({
    q=null,

    offset=0,
    count=20
}, {
    cookies=null
}) {
    if (is_server()) axios.defaults.baseURL = `http://127.0.0.1:3000`

    let arFields = {
        params: {
            q,

            offset,
            count
        } as interfaceVideoGet,
        headers: {
            Cookie: cookies
        }
    } as AxiosRequestConfig

    let url = `/api/user/get`
    console.log(url)
    let res = await axios.get(url, arFields);
    return res.data.response
}
//ПОЛЬЗОВАТЕЛЬ
export async function ServerUserGetById ({
    ids
}, {
    cookies=null
}) {
    if (is_server()) axios.defaults.baseURL = `http://127.0.0.1:3000`

    let arFields = {
        params: {
            ids
        },
        headers: {
            Cookie: cookies
        }
    } as AxiosRequestConfig

    let url = `/api/user/getById`
    console.log(url)
    let res = await axios.get(url, arFields);
    return res.data.response
}

//---------------------------------------------------------------------------------
//ВИДЕО
export async function ServerVideoGet ({
    q=null,

    toUserId=null,
    toGroupId=null,
    albumId=null,

    offset=0,
    count=20,
},{
    cookies=null
}) {

    if (is_server()) axios.defaults.baseURL = `http://127.0.0.1:3000`

    let arFields = {
        params: {
            q,

            to_user_id: toUserId,
            to_group_id: toGroupId,
            album_id: albumId,

            offset,
            count
        } as interfaceVideoGet,
        headers: {
            Cookie: cookies
        }
    } as AxiosRequestConfig

    let url = `/api/video/get`
    console.log(url)
    let res = await axios.get(url, arFields);
    return res.data.response
}

export async function ServerVideoGetById ({ids}, {cookies=null}) {
    if (is_server()) axios.defaults.baseURL = `http://127.0.0.1:3000`

    let arFields = {
        params: {
            ids
        },
        headers: {
            Cookie: cookies
        }
    } as AxiosRequestConfig

    const url = `/api/video/getById`
    console.log(url)
    let res = await axios.get(url, arFields);
    return res.data.response[0]
}
//---------------------------------------------------------------------------------
//ФОРУМ
export async function ServerTopicGet ({
    q=null,

    toUserId=null,
    toGroupId=null,

    albumId=null,

    offset=0,
    count=20,
},{
    cookies=null
}) {
    if (is_server()) axios.defaults.baseURL = `http://127.0.0.1:3000`

    let arFields = {
        params: {
            q,

            to_user_id: toUserId,
            to_group_id: toGroupId,

            album_id: albumId,

            offset,
            count
        },
        headers: {
            Cookie: cookies
        }
    } as AxiosRequestConfig

    const url = `/api/topic/get`
    console.log(url)
    let result = await axios.get(url, arFields)
    return result.data.response
}

export async function ServerTopicGetById ({ids}, {cookies=null}) {
    if (is_server()) axios.defaults.baseURL = `http://127.0.0.1:3030`

    let arFields = {
        params: {
            ids
        },
        headers: {
            Cookie: cookies
        }
    } as AxiosRequestConfig

    const url = `/api/topic/getById`
    console.log(url)
    let res = await axios.get(url, arFields);
    return res.data.response[0]
}

//---------------------------------------------------------------------------------
//СТАТЬИ
export async function ServerArticleGet ({
    q=null,

    toUserId=null,
    toGroupId=null,
    albumId=null,

    offset=0,
    count=20,
},{
    cookies=null
}) {
    let arFields = {
        params: {
            q,

            to_user_id: toUserId,
            to_group_id: toGroupId,

            album_id: albumId,

            offset,
            count
        },
        headers: {
            Cookie: cookies
        }
    } as AxiosRequestConfig

    let url = `/api/article/get`
    console.log(url)
    let result = await axios.get(url, arFields)
    return result.data.response
}
export async function ServerArticleGetById ({ids}, {cookies=null}) {
    if (is_server()) axios.defaults.baseURL = `http://127.0.0.1:3030`

    let arFields = {
        params: {
            ids
        },
        headers: {
            Cookie: cookies
        }
    } as AxiosRequestConfig

    const url = `/api/article/getById`
    console.log(url)
    let res = await axios.get(url, arFields);
    return res.data.response[0]
}

//---------------------------------------------------------------------------------
//АЛЬБОМ
export async function ServerAlbumGet ({
    module=null,

    q=null,

    toUserId=null,
    toGroupId=null,

    albumId=null,

    offset=0,
    count=20,
},{
    cookies=null
}){
    if (is_server()) axios.defaults.baseURL = `http://127.0.0.1:3030`

    let arFields = {
        params: {
            module,
            q,

            to_user_id: toUserId,
            to_group_id: toGroupId,

            album_id: albumId,

            offset,
            count
        } as interfaceAlbumGet,
        headers: {
            Cookie: cookies
        }
    } as AxiosRequestConfig

    const url = `/api/album/get`
    console.log(url)
    let res = await axios.get(url, arFields);
    return res.data.response
}

//---------------------------------------------------------------------------------
//КОММЕНТАРИИ
export async function ServerCommentGet ({
    object_id=null,
    module=null,
    q=null,

    offset=0,
    count=20,
},{
    cookies=null
}){
    if (is_server()) axios.defaults.baseURL = `http://127.0.0.1:3030`

    let arFields = {
        params: {
            object_id: object_id,
            module: module,

            offset: offset,
            count: count
        } as interfaceAlbumGet,
        headers: {
            Cookie: cookies
        }
    }

    const url = `/api/comment/get`
    console.log(url)
    let result = await axios.get(url, arFields)
    return result.data.response
}
//---------------------------------------------------------------------------------
//ПОСТЫ
export async function ServerPostAdd ({
    userId=null,
    groupId=null,

    text=null,
    arVideoIds=null,
    arImgIds=null,
    arDocIds=null,
    arAudioIds=null,
},{
    cookies=null
}){
    if (is_server()) axios.defaults.baseURL = `http://127.0.0.1:3030`

    let arFields = {
        user_id: userId,
        group_id: groupId,

        text,
        video_ids: arVideoIds,
        img_ids: arImgIds,
        doc_ids: arDocIds,
        audio_ids: arAudioIds,
    } as AxiosRequestConfig

    const url = `/api/post/add`
    console.log(url)
    let res = await axios.post(url, arFields)
    await ToastSystemAdd(res.data)
    return res.data.response
}

export async function ServerPostEdit ({
    id=null,

    text=null,
    arVideoIds=null,
    arImgIds=null,
    arDocIds=null,
    arAudioIds=null,
},{
    cookies=null
}){
    if (is_server()) axios.defaults.baseURL = `http://127.0.0.1:3030`

    let arFields = {
        id,

        text,
        video_ids: arVideoIds,
        img_ids: arImgIds,
        doc_ids: arDocIds,
        audio_ids: arAudioIds,
    } as AxiosRequestConfig

    const url = `/api/post/edit`
    console.log(url)
    let res = await axios.post(url, arFields)
    await ToastSystemAdd(res.data)
    return res.data.response
}

export async function ServerPostGet ({
    q=null,

    toUserId=null,
    toGroupId=null,

    count=null,
    offset=null,
},{
    cookies=null
}){
    if (is_server()) axios.defaults.baseURL = `http://127.0.0.1:3030`

    let arFields = {
        params: {
            q,

            to_user_id: toUserId,
            to_group_id: toGroupId,

            count,
            offset
        },
        headers: {
            Cookie: cookies
        }
    } as AxiosRequestConfig

    const url = `/api/post/get`
    console.log(url)
    let result = await axios.get(url, arFields)

    return result.data.response
}

//---------------------------------------------------------------------------------
//ФАЙЛЫ
export async function FileAdd ({
    objectId=null,
    module=null,

    files=null,

    toUserId=null,
    toGroupId=null,

    FormLoad=() => {},
},{
    cookies=null
}){
    //файлов нет
    if ((!files) || (!files.length)) return false

    //загрузка файлов
    let arResult = []

    files = Object.values(files)

    await Promise.all(files.map(async (file, i) => {

        //переменная с файлами
        const formData = new FormData()
        if (objectId)
            formData.append('object_id', objectId) //привязывет к объекту с этим id

        formData.append('module', module) //модуль

        if (toUserId) formData.append('to_user_id', toUserId)
        if (toGroupId) formData.append('to_group_id', toGroupId)

        formData.append(`file`, file)

        let urlFileAdd = '/api/file/add'
        let result = await axios.post(urlFileAdd, formData, {

            'Content-Type': 'multipart/form-data',


            onUploadProgress: function (progressEvent) {
                let percentage = Math.floor((progressEvent.loaded * 100) / progressEvent.total)
                console.log(progressEvent.loaded + ' ' + progressEvent.total + ' ' + percentage);

                FormLoad({
                    step: i,
                    processBarLoaded: progressEvent.loaded,
                    processBarTotal: progressEvent.total,
                    processBar: percentage
                })
                // Do whatever you want with the native progress event
            },

        })

        //добавляем id в массив
        arResult.push(result.data.response)
    }))

    return arResult
}

//---------------------------------------------------------------------------------
//АВТОРИЗАЦИЯ
export async function ServerAuthLogin ({
    login=null,
    password=null,
}){
    if (is_server()) axios.defaults.baseURL = `http://127.0.0.1:3000`

    let arFields = {
        login,
        password
    } as AxiosRequestConfig

    const url = `/api/auth/login`;
    console.log(url)
    let res = await axios.post(url, arFields)
    await ToastSystemAdd(res.data)
    return res.data.response
}

export async function ServerAuthReg ({
    email=null,
    login=null,
    password=null,
},{
    cookies=null
}){
    if (is_server()) axios.defaults.baseURL = `http://127.0.0.1:3000`

    let arFields = {
        email,
        login,
        password
    } as AxiosRequestConfig

    const url = `/api/auth/reg`;
    console.log(url)
    let res = await axios.post(url, arFields)
    await ToastSystemAdd(res.data)
    return res.data.response
}

export async function ServerAuthVk ({
    code=null
},{
    cookies=null
}){
    if (is_server()) axios.defaults.baseURL = `http://127.0.0.1:3000`

    let arFields = {
        code,
    } as AxiosRequestConfig

    const url = `/api/auth/vk`;
    console.log(url)
    let res = await axios.post(url, arFields)
    await ToastSystemAdd(res.data)
    return res.data.response
}

export async function ServerAuthTelegram (fields) {
    if (is_server()) axios.defaults.baseURL = `http://127.0.0.1:3000`

    let arFields = fields as AxiosRequestConfig

    const url = `/api/auth/telegram`;
    console.log(url)
    let res = await axios.post(url, arFields)
    await ToastSystemAdd(res.data)
    return res.data.response
}

//проверка где ввыполняется запрос
function is_server () {
    return ! (typeof window != 'undefined' && window.document);
}

