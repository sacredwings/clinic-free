import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import axios from "axios"
import TemplatesMain from "../../components/template/main"


export default function () {
    let [list, setList] = useState([])
    let [request, setRequest] = useState({
        items: [],
        step: 200,
    })

    useEffect(() => {
        (async () => {
            await Get(true)
        })()
    }, [])

    const Get = async (start) => {

        const url = '/api/org/get'
        let fields = {
            params: {
                offset: request.items.length,
                count: request.step
            }
        }
        let result = await axios.get(url, fields)
        setList(prev => (start ? result.data.response.items : [...prev, ...result.data.response.items]))
    }

    const List = (arList) => {
        return <div className="list-group">
            {arList.map((list, i) => {
                let href = `/org/${list._id}/contract`
                return <Link href={href} key={i}>
                    <a className="list-group-item list-group-item-action">{list.name}</a>
                </Link>
            })}
        </div>
    }

    const NoList = () => {
        return <>
            Организаций нет
        </>
    }

    return <TemplatesMain title={'Главная страница'}>
        <h1>Организации <Link href={`/org/add`}><a className="btn btn-success btn-sm"  role="button">+ Добавить организацию</a></Link></h1>
        {(list.length) ? List(list) : NoList()}
    </TemplatesMain>
}

export async function getServerSideProps ({query, req}) {
    return {
        props: {}
    }
}