import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import axios from "axios"
import TemplatesMain from "../../../../app/components/template/main"
import contract from "../../../../app/classes/contract";

export default function ({id}) {
    let [edit, setEdit] = useState(false)
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

    const Type = (arList) => {
        if (!arList) return null
        return <>
            {arList.map((list, i) => {
                return <span className="badge text-bg-primary">{list.name}</span>
            })}
        </>
    }

    const List = (arList) => {
        return <div className="list-group">
            {arList.map((list, i) => {
                let href = `/contract/${list._id}/worker`
                return <Link href={href} key={i} className="list-group-item list-group-item-action">
                    {list.name}
                    <br/>
                    {Type(list._contract_type_ids)}
                </Link>
            })}
        </div>
    }

    const NoList = () => {
        return <>
            Договоров нет
        </>
    }

    const onChangeText = (e) => {
        let name = e.target.id;
        let value = e.target.value;

        setOrg(prev => ({
            ...prev, [name]: value
        }))
    }
    const onFormSubmit = async (e) => {
        if (e)
            e.preventDefault() // Stop form submit

        const url = `/api/org/edit`
        let arFields = {
            id: org._id,
            name: org.name,
            full_name: org.full_name
        }

        let result = await axios.post(url, arFields)

        setEdit(!edit)
    }
    const OrgView = () => {
        return <h1>Организация: {(org) ? org.name : null} <button type="button" className="btn btn-outline-secondary" onClick={()=>setEdit(!edit)}><i className="far fa-edit"></i></button></h1>
    }
    const OrgEdit = () => {
        return <>
            <h1>Редактор организации</h1>
            <div className="shadow-sm p-3 mb-3 bg-white rounded">
                <form onSubmit={onFormSubmit}>

                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Наименование</label>
                        <input type="text" className="form-control" id="name"
                               onChange={onChangeText} value={org.name}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Полное наименование</label>
                        <input type="text" className="form-control" id="full_name"
                               onChange={onChangeText} value={org.full_name}/>
                    </div>

                    <div className="">
                        <button type="button" className="btn btn-secondary btn-sm" onClick={()=>setEdit(!edit)}>Отмена</button>&nbsp;
                        <button type="submit" className="btn btn-primary btn-sm">
                            Сохранить
                        </button>
                    </div>

                </form>
            </div>
        </>
    }

    return <TemplatesMain title={'Главная страница'}>
        {(edit) ? OrgEdit() : OrgView()}
        <h2>Договора организаци: <Link href={`/org/${id}/contract/add`} className="btn btn-success btn-sm" role="button">+ Добавить договор</Link></h2>
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