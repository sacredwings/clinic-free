import { DB }  from "social-framework"
import Config  from "../config.json"

export default async function () {
    //конект
    const dbName = 'clinic'
    const url = Config.server.urlDb

    //подключение к базе
    DB.Client = await new DB().Init(url, dbName)
    /*
    if (DB.Client)
        console.log('Connected successfully to server')*/
}