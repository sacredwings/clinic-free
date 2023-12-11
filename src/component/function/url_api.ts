import {
    interfaceContractAdd, interfaceContractEdit,
    interfaceContractGet, interfaceContractGetById,
    interfaceOrgAdd, interfaceOrgEdit, interfaceOrgGet, interfaceOrgGetById,
    interfaceResearchEdit,
    interfaceSpecialistAdd, interfaceSpecialistDelete,
    interfaceSpecialistEdit,
    interfaceSpecialistGet, interfaceSpecialistUpdateHf, interfaceUserAccess, interfaceUserEdit,
    interfaceUserGetById, interfaceWorkerGet, interfaceWorkerGetById
} from './url_api_type'
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
export async function ServerUserGetById ({ids}: interfaceUserGetById, {cookies=null}) {
    if (is_server()) axios.defaults.baseURL = `http://127.0.0.1:3000`

    let arFields = {
        params: {
            ids
        } as interfaceUserGetById,
        headers: {
            Cookie: cookies
        }
    } as AxiosRequestConfig

    let url = `/api/user/getById`
    console.log(url)
    let res = await axios.get(url, arFields)
    return res.data.response
}
export async function ServerUserEdit ({
    id,
    first_name,
    last_name,
    second_name,

    man,
    date_birth,
    phone
}: interfaceUserEdit) {
    if (is_server()) axios.defaults.baseURL = `http://127.0.0.1:3000`

    let arFields = {
        first_name,
        last_name,
        second_name,

        man,
        date_birth,
        phone
    } as interfaceUserEdit

    let url = `/api/user/edit`
    console.log(url)
    let res = await axios.post(url, arFields);
    await ToastSystemAdd(res.data)
    return res.data.response
}
export async function ServerUserEditAccess ({
    id,
    specialist_ids,
    research_ids
}: interfaceUserAccess) {
    if (is_server()) axios.defaults.baseURL = `http://127.0.0.1:3000`

    let arFields = {
        id,
        specialist_ids,
        research_ids
    } as interfaceUserAccess

    let url = `/api/user/editAccess`
    console.log(url)
    let res = await axios.post(url, arFields);
    await ToastSystemAdd(res.data)
    return res.data.response
}

//---------------------------------------------------------------------------------
//Specialist
export async function ServerSpecialistGet ({
    offset=0,
    count=20
}: interfaceSpecialistGet, {
    cookies=null
}) {
    if (is_server()) axios.defaults.baseURL = `http://127.0.0.1:3000`

    let arFields = {
        params: {
            offset,
            count
        } as interfaceSpecialistGet,
        headers: {
            Cookie: cookies
        }
    } as AxiosRequestConfig

    let url = `/api/specialist/get`
    console.log(url)
    let res = await axios.get(url, arFields);
    return res.data.response
}
export async function ServerSpecialistEdit ({
    id,
    name
}: interfaceSpecialistEdit) {
    if (is_server()) axios.defaults.baseURL = `http://127.0.0.1:3000`

    let arFields = {
        id,
        name
    } as interfaceSpecialistEdit

    let url = `/api/specialist/edit`
    console.log(url)
    let res = await axios.post(url, arFields);
    await ToastSystemAdd(res.data)
    return res.data.response
}
export async function ServerSpecialistDelete ({
    id,
}: interfaceSpecialistDelete) {
    if (is_server()) axios.defaults.baseURL = `http://127.0.0.1:3000`

    let arFields = {
        id
    } as interfaceSpecialistDelete

    let url = `/api/specialist/delete`
    console.log(url)
    let res = await axios.post(url, arFields);
    await ToastSystemAdd(res.data)
    return res.data.response
}
//---------------------------------------------------------------------------------
//Research
export async function ServerResearchGet ({
    offset=0,
    count=20
}: interfaceSpecialistGet, {
    cookies=null
}) {
    if (is_server()) axios.defaults.baseURL = `http://127.0.0.1:3000`

    let arFields = {
        params: {
            offset,
            count
        } as interfaceSpecialistGet,
        headers: {
            Cookie: cookies
        }
    } as AxiosRequestConfig

    let url = `/api/research/get`
    console.log(url)
    let res = await axios.get(url, arFields);
    return res.data.response
}
export async function ServerResearchEdit ({
    id,
    name
}: interfaceSpecialistEdit) {
    if (is_server()) axios.defaults.baseURL = `http://127.0.0.1:3000`

    let arFields = {
        id,
        name
    } as interfaceSpecialistEdit

    let url = `/api/research/edit`
    console.log(url)
    let res = await axios.post(url, arFields);
    await ToastSystemAdd(res.data)
    return res.data.response
}
export async function ServerResearchDelete ({
    id,
}: interfaceSpecialistDelete) {
    if (is_server()) axios.defaults.baseURL = `http://127.0.0.1:3000`

    let arFields = {
        id
    } as interfaceSpecialistDelete

    let url = `/api/research/delete`
    console.log(url)
    let res = await axios.post(url, arFields);
    await ToastSystemAdd(res.data)
    return res.data.response
}
//---------------------------------------------------------------------------------
//ORG
export async function ServerOrgGet ({
    offset=0,
    count=20
}: interfaceOrgGet, {
    cookies=null
}) {
    if (is_server()) axios.defaults.baseURL = `http://127.0.0.1:3000`

    let arFields = {
        params: {
            offset,
            count
        } as interfaceOrgGet,
        headers: {
            Cookie: cookies
        }
    } as AxiosRequestConfig

    let url = `/api/org/get`
    console.log(url)
    let res = await axios.get(url, arFields);
    return res.data.response
}
export async function ServerOrgGetById ({ids}: interfaceOrgGetById, {cookies=null}) {
    if (is_server()) axios.defaults.baseURL = `http://127.0.0.1:3000`

    let arFields = {
        params: {
            ids
        } as interfaceOrgGetById,
        headers: {
            Cookie: cookies
        }
    } as AxiosRequestConfig

    let url = `/api/org/getById`
    console.log(url)
    let res = await axios.get(url, arFields)
    return res.data.response
}
export async function ServerOrgAdd ({
    name
}: interfaceOrgAdd) {
    if (is_server()) axios.defaults.baseURL = `http://127.0.0.1:3000`

    let arFields = {
        name
    } as interfaceOrgAdd

    let url = `/api/org/add`
    console.log(url)
    let res = await axios.post(url, arFields);
    await ToastSystemAdd(res.data)
    return res.data.response
}
export async function ServerOrgEdit ({
    id,
    name
}: interfaceOrgEdit) {
    if (is_server()) axios.defaults.baseURL = `http://127.0.0.1:3000`

    let arFields = {
        id,
        name
    } as interfaceOrgEdit

    let url = `/api/org/edit`
    console.log(url)
    let res = await axios.post(url, arFields);
    await ToastSystemAdd(res.data)
    return res.data.response
}
//---------------------------------------------------------------------------------
//CONTRACT
export async function ServerContractGet ({
    org_id,
    offset=0,
    count=20
}: interfaceContractGet, {
    cookies=null
}) {
    if (is_server()) axios.defaults.baseURL = `http://127.0.0.1:3000`

    let arFields = {
        params: {
            org_id,
            offset,
            count
        } as interfaceContractGet,
        headers: {
            Cookie: cookies
        }
    } as AxiosRequestConfig

    let url = `/api/contract/get`
    console.log(url)
    let res = await axios.get(url, arFields);
    return res.data.response
}
export async function ServerContractGetById ({ids}: interfaceContractGetById, {cookies=null}) {
    if (is_server()) axios.defaults.baseURL = `http://127.0.0.1:3000`

    let arFields = {
        params: {
            ids
        } as interfaceContractGetById,
        headers: {
            Cookie: cookies
        }
    } as AxiosRequestConfig

    let url = `/api/contract/getById`
    console.log(url)
    let res = await axios.get(url, arFields)
    return res.data.response
}
export async function ServerContractAdd ({
    name
}: interfaceContractAdd) {
    if (is_server()) axios.defaults.baseURL = `http://127.0.0.1:3000`

    let arFields = {
        name
    } as interfaceContractAdd

    let url = `/api/contract/add`
    console.log(url)
    let res = await axios.post(url, arFields);
    await ToastSystemAdd(res.data)
    return res.data.response
}
export async function ServerContractEdit ({
    id,
    name
}: interfaceContractEdit) {
    if (is_server()) axios.defaults.baseURL = `http://127.0.0.1:3000`

    let arFields = {
        id,
        name
    } as interfaceContractEdit

    let url = `/api/contract/edit`
    console.log(url)
    let res = await axios.post(url, arFields);
    await ToastSystemAdd(res.data)
    return res.data.response
}
//---------------------------------------------------------------------------------
//Worker
export async function ServerWorkerGet ({
    contract_id,
    offset=0,
    count=20
}: interfaceWorkerGet, {
    cookies=null
}) {
    if (is_server()) axios.defaults.baseURL = `http://127.0.0.1:3000`

    let arFields = {
        params: {
            contract_id,
            offset,
            count
        } as interfaceWorkerGet,
        headers: {
            Cookie: cookies
        }
    } as AxiosRequestConfig

    let url = `/api/worker/get`
    console.log(url)
    let res = await axios.get(url, arFields);
    return res.data.response
}
export async function ServerWorkerGetById ({ids}: interfaceWorkerGetById, {cookies=null}) {
    if (is_server()) axios.defaults.baseURL = `http://127.0.0.1:3000`

    let arFields = {
        params: {
            ids
        } as interfaceWorkerGetById,
        headers: {
            Cookie: cookies
        }
    } as AxiosRequestConfig

    let url = `/api/worker/getById`
    console.log(url)
    let res = await axios.get(url, arFields)
    return res.data.response
}
export async function ServerWorkerAdd ({
                                             name
                                         }: interfaceContractAdd) {
    if (is_server()) axios.defaults.baseURL = `http://127.0.0.1:3000`

    let arFields = {
        name
    } as interfaceContractAdd

    let url = `/api/worker/add`
    console.log(url)
    let res = await axios.post(url, arFields);
    await ToastSystemAdd(res.data)
    return res.data.response
}
export async function ServerWorkerEdit ({
                                              id,
                                              name
                                          }: interfaceContractEdit) {
    if (is_server()) axios.defaults.baseURL = `http://127.0.0.1:3000`

    let arFields = {
        id,
        name
    } as interfaceContractEdit

    let url = `/api/worker/edit`
    console.log(url)
    let res = await axios.post(url, arFields);
    await ToastSystemAdd(res.data)
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

