import { CAuth }  from "../../../../social-framework"

export function objectToFormData(obj) {
    const formData = new FormData();

    Object.entries(obj).forEach(([key, value]) => {
        formData.append(key, value);
    });

    return formData;
}

export function formDataToObject(formData) {
    const object = {};

    formData.forEach((value, key) => {
        // 2) Assign each key-value pair to the object
        object[key] = value;
    });

    return object;
}


export async function Authentication (request) {
    //получение пользователя из авторизации

    let tid = request.cookies.get('tid')
    let tkey = request.cookies.get('tkey')

    if ((!tid) || (!tkey)) return false

    let auth = {
        tid: tid.value,
        tkey: tkey.value
    }

    return await CAuth.TokenGetByIdKey(auth)

}