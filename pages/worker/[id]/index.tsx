import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import axios from "axios"
import TemplatesMain from "../../components/template/main"
import Config from "../../config.json";


export default function ({worker}) {
    useEffect(() => {
        (async () => {
            //await Get(true)
        })()
    }, [])

    const List = (ar) => {
        return ar.map((item, i)=>{
            return <p key={i}>
                {item.name}
            </p>
        })
    }

    return <TemplatesMain title={`${worker._user_id.first_name} ${worker._user_id.last_name} ${worker._user_id.patronymic_name}`}>
        <h1>{`${worker._user_id.first_name} ${worker._user_id.last_name} ${worker._user_id.patronymic_name}`}</h1>

        <hr/>
        <h3>Иследования</h3>
        {List(worker.research)}

        <hr/>
        <h3>Специалисты</h3>
        {List(worker.specialist)}

        <h3>Итоговая сумма</h3>
        {worker.price}
    </TemplatesMain>
}

const GetById = async (id) => {
    const url = `${Config.server.url}/api/worker/getById`
    let fields = {
        params: {
            ids: id,
        }
    }
    let result = await axios.get(url, fields)
    return result.data.response
}

export async function getServerSideProps ({query, req}) {
    let worker = await GetById(query.id)

    return {
        props: {
            worker: worker.items[0]
        }
    }
}