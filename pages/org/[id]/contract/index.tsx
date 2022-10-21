import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import axios from "axios"
import TemplatesMain from "../../../../components/template/main"
import contract from "../../../../classes/contract";

export default function ({id}) {
    let [list, setList] = useState([])
    let [request, setRequest] = useState({
        items: [],
        step: 200,
    })
    let [org, setOrg] = useState(null)

    useEffect(() => {
        (async () => {
            await Get(true)
            await OrgGetById()
        })()
    }, [])

    //список договоров
    const Get = async (start) => {
        const url = '/api/contract/get'
        let fields = {
            params: {
                org_id: id,
                offset: request.items.length,
                count: request.step
            }
        }
        let result = await axios.get(url, fields)
        setList(prev => (start ? result.data.response.items : [...prev, ...result.data.response.items]))
    }

    //название организации
    const OrgGetById = async () => {
        const url = '/api/org/getById'

        let fields = {
            params: {
                ids: id
            }
        }
        let result = await axios.get(url, fields)
        setOrg(result.data.response[0])
    }

    const List = (arList) => {
        return <div className="list-group">
            {arList.map((list, i) => {
                let href = `/contract/${list._id}/worker`
                return <Link href={href} key={i}><a className="list-group-item list-group-item-action">
                    {list.name}
                </a></Link>
            })}
        </div>
    }

    const NoList = () => {
        return <>
            Договоров нет
        </>
    }

    return <TemplatesMain title={'Главная страница'}>
        <h1>Организация: {(org) ? org.name : null}</h1>
        <h2>Договора организаци: <Link href={`/org/${id}/contract/add`}><a className="btn btn-success btn-sm" role="button">+ Добавить договор</a></Link></h2>
        {(list.length) ? List(list) : NoList()}
    </TemplatesMain>
}

export async function getServerSideProps ({query, req}) {
    return {
        props: {
            id: query.id
        }
    }
}