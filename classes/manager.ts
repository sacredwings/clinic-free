import { DB } from "social-framework"
import bcrypt from "bcrypt";

export default class {

    static async Add ( fields ) {
        try {
            if (fields.email)
                fields.email = fields.email.toLowerCase()

            if (fields.login)
                fields.login = fields.login.toLowerCase()

            //создаем hash пароль
            const saltRounds = 10;
            let passwordSalt = await bcrypt.genSalt(saltRounds);
            fields.password = await bcrypt.hash(fields.password, passwordSalt);

            let arUsers = await this.GetByLogin(fields.login);
            if (arUsers)
                throw ({code: 30020001, msg: 'Такой login уже зарегистрирован'});

            let collection = DB.Client.collection('manager')
            await collection.insertOne(fields)
            return fields

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CManager Add'}, ...err})
        }
    }

    //поиск по login
    static async GetByLogin ( login ) {
        try {
            //в нижний регистр
            login = login.toLowerCase()

            let collection = DB.Client.collection('manager');
            let result = await collection.aggregate([{
                $match: {
                    login: login
                }
            }]).toArray();

            if (!result.length) return false
            return result[0]

        } catch (err) {
            console.log(err)
            throw ({code: 7001000, msg: 'CManager GetByLogin'})
        }
    }

    //поиск по id
    static async GetById ( ids ) {
        try {
            ids = new DB().arObjectID(ids)

            let collection = DB.Client.collection('manager');
            //let result = await collection.find({_id: { $in: ids}}).toArray()
            let result = await collection.aggregate([
                { $match:
                        {
                            _id: {$in: ids}
                        }
                }
            ]).toArray();

            return result

        } catch (err) {
            console.log(err)
            throw ({code: 7001000, msg: 'CUser GetById'})
        }
    }
}