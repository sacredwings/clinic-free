// @ts-nocheck
import { DB, Store } from "../../../social-framework/src"
import axios, {AxiosRequestConfig} from "axios";
import config from "../../../config.json";

export default class Users {

    static async UserSearch ( snils ) {
        try {
            let url = `https://gigtest.ru/api/v2/users/search`

            let arFields = {
                params: {
                    'access-token': config.gigtest.accessToken,
                    snils: snils
                }
            } as AxiosRequestConfig

            let res = await axios.get(url, arFields);
            console(res.data)

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CGigtest UserSearch'}, ...err})
        }
    }

    static async UserAdd ( fields ) {
        try {
            let url = `https://gigtest.ru/api/v2/users`

            let arFields = {
                params: {
                    'access-token': config.gigtest.accessToken,

                    fio: fields.fio,
                    birthday: fields.birthday,
                    country_id: fields.country_id,
                    home_address: fields.home_address,
                    company_name: fields.company_name,
                    position: fields.position,
                    phone: fields.phone,
                    avatar_link: fields.avatar_link,
                    snils: fields.snils,
                    passport: {
                        series: fields.series,
                        number: fields.number,
                        issue_org_name: fields.issue_org_name,
                        issue_org_code: fields.issue_org_code,
                        issue_date: fields.issue_date,
                    },
                    address_state_code: fields.address_state_code,
                    position_id: fields.position_id,
                    gender: fields.gender,
                    first_name: fields.first_name,
                    last_name: fields.last_name,
                    patronymic: fields.patronymic,
                }
            } as AxiosRequestConfig

            let res = await axios.post(url, arFields);
            console(res.data)

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CGigtest UserAdd'}, ...err})
        }
    }

    static async UserEdit ( id, fields ) {
        try {
            let url = `https://gigtest.ru/api/v2/users`

            let arFields = {
                params: {
                    'access-token': config.gigtest.accessToken,

                    company_name: fields.company_name,
                    position: fields.position,
                    avatar_link: fields.avatar_link,
                    snils: fields.snils,
                    passport: {
                        series: fields.series,
                        number: fields.number,
                        issue_org_name: fields.issue_org_name,
                        issue_org_code: fields.issue_org_code,
                        issue_date: fields.issue_date,
                    },
                    address_state_code: fields.address_state_code,
                    position_id: fields.position_id,
                    gender: fields.gender,
                    first_name: fields.first_name,
                    last_name: fields.last_name,
                    patronymic: fields.patronymic,
                    birthday: fields.birthday,
                    phone: fields.phone,
                }
            } as AxiosRequestConfig

            let res = await axios.put(url, arFields);
            console(res.data)

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CGigtest UserEdit'}, ...err})
        }
    }

}
