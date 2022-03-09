import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import axios from "axios";

function HfUserGet (props) {

    let [list, setList] = useState([])
    let [request, setRequest] = useState([])
    let [org, setOrg] = useState(null)

    const { id } = useParams()

    useEffect(async () => {
        await Get()
        await DogovorGetById()

    }, [])

    const Get = async () => {
        const url = '/api/hf-user/get'

        let fields = {
            params: {}
        }

        //если договор есть, привязываем к организации
        if (id)
            fields.params.contract_id = id

        let result = await axios.get(url, fields);

        result = result.data;

        //setList(prev => ([...prev, ...result.response.items]))
        setList(result.response.items)
    }

    const DogovorGetById = async () => {
        const url = '/api/hf-contract/getById';

        let fields = {
            params: {
                id: id
            }
        }
        let result = await axios.get(url, fields);

        result = result.data;

        setOrg(result.response)
    }



    const List = (arList) => {
        return <div className="list-group">
            {arList.map((list, i) => {
                let href = `/contract-${id}/user-${list.user_id}`
                return <Link to={href} key={i} className="list-group-item list-group-item-action">
                    {list.user[0].last_name} {list.user[0].first_name} {list.user[0].patronymic_name}

                    <br/>
                    {Hf(list.hf)}
                </Link>
            })}
        </div>
    }

    const Hf = (arHf) => {
        return <>
            {arHf.map((list, i) => {
                return <span key={i} style={{marginLeft: 5}} className="badge bg-primary">{list}</span>
            })}
            &nbsp;
        </>
    }

    return (
        <>
            <h1>Сотрудники организации</h1>
            <h4><Link className="btn btn-success btn-sm" to={`/contract-${id}/user/add`} role="button">+</Link> {(org) ? org.name : null} <span className="badge bg-secondary">{(org) ? `${org.price} руб.` : null}</span></h4>

            <p><Link to={`/contract-${id}/research`}>Основные иследования</Link></p>
            <hr/>
            {(list.length) ? List(list) : null}
        </>

    )
}

export default HfUserGet

