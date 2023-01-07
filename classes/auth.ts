import { DB } from "social-framework"
import bcrypt from "bcrypt"
import * as crypto from "crypto"
import CManager from "../classes/manager"

export default class {

    static async Login ( fields ) {
        try {
            //поиск пользователя по логину
            let user = await CManager.GetByLogin(fields.login);
            if (!user)
                throw ({code: 1001001, msg: 'Неверный логин'});

            //сравнение паролей
            let match = await bcrypt.compare(fields.password, user.password);
            if (!match)
                throw ({code: 1001002, msg: 'Неверный пароль'});

            let token = await this.AddToken(user._id, fields.ip, fields.browser);
            if (!token)
                throw ({code: 1001003, msg: 'Токен не создан'});

            return {tid: token._id, token: token.token, _id: user._id, login: user.login}

        } catch (err) {
            throw ({...{code: 1001000, msg: 'CAuth Login'}, ...err});
        }
    }

    static async AddToken ( userId, ip, browser ) {
        try {
            let collection = DB.Client.collection('auth')

            //создаем hash /нужно поменять на дату
            let hash = new Date().toString()
            hash = crypto.createHash('md5').update(hash).digest("hex")

            //подготовка полей
            let arFields = {
                token: hash,
                user_id: userId,
                ip: ip,
                browser: browser
            };

            let result = await collection.insertOne(arFields)

            return arFields
            //console.log(result)
            //console.log(arFields)

            //запись
            //let result = await DB.Init.Insert(`${DB.Init.TablePrefix}token`, arFields, `id, token`)
            //return result[0]

        } catch (err) {
            console.log(err)
            throw ({code: 1004000, msg: 'CAuth AddToken'})
        }
    }

    static async GetById ( ids ) {
        try {
            ids = new DB().arObjectID(ids)

            let collection = DB.Client.collection('auth');
            let result = await collection.find({_id: { $in: ids}}).toArray()

            if (result)
                return result

            return false
        } catch (err) {
            console.log(err)
            throw ({code: 1003000, msg: 'CAuth GetById'})
        }
    }

    static async Auth ( fields ) {
        try {
            //существование id и токена авторизации
            if ((!fields) || ((!fields.tid) || (!fields.token)))
                return null

            //поиск ключа
            let user = await this.GetById([fields.tid])
            if (!user.length)
                return null

            user = user[0] //из массива берем первый

            if (fields.token !== user.token)
                return null

            return user.user_id
        } catch (err) {
            console.log(err)
            throw ({code: 1004000, msg: 'CAuth Access'})
        }
    }

    /*
    static async Authorization ( cookie ) {
        try {
            //создаем hash /нужно поменять на дату
            let hash = new Date().toString()
            hash = crypto.createHash('md5').update(hash).digest("hex")

            //получение пользователя из авторизации
            return await this.Auth(cookie)

        } catch (err) {
            console.log(err)
            throw ({code: 1004000, msg: 'CAuth AddToken'})
        }
    }*/
}