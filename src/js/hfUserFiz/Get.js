import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import axios from "axios";
import Statistic from "../hfContract/Statistic";

function HfUserGet (props) {

    let [list, setList] = useState([])
    let [request, setRequest] = useState([])
    let [org, setOrg] = useState(null)

    const { id } = useParams()

    useEffect(async () => {
        await Get(true)
    }, [])

    const Get = async (start) => {
        const url = '/api/hf-user/get';

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
        console.log(result)
    }

    const Pdf = async (type) => {
        const url = 'http://localhost:3041/api/hf-org/pdfUser'

        let fields = {
            params: {
                type: type
            }
        }

        let result = await axios.get(url, fields)

        result = result.data

        document.location.href = `http://localhost:3041/${result.response}`
        //setList(prev => ([...prev, ...result.response.items]))
        //console.log(result)

    }

    const List = (arList) => {
        return <ul className="list-group">
            {arList.map((list, i) => {
                let href = `/contract-${id}/user-${list.user_id}`
                return <li to={href} key={i} className="list-group-item">
                    {list.user[0].last_name} {list.user[0].first_name} {list.user[0].patronymic_name}
                    <br/>
                    {Hf(list.hf)}
                    <br/>
                    <br/>
                    <div className="btn-group btn-group-sm" role="group" aria-label="Basic outlined example">
                        <button type="button" className="btn btn-outline-primary" onClick={()=>{Pdf('karta')}}>Карта</button>
                        <button type="button" className="btn btn-outline-primary" onClick={()=>{Pdf('vipiska')}}>Выписка</button>
                    </div>
                </li>
            })}
        </ul>
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
            <h1>Проф. физ. лица</h1>
            <p><Link className="btn btn-success btn-sm" to={`/prof-fiz/user/add`} role="button">+</Link></p>
            <hr/>
            {(list.length) ? List(list) : null}
        </>

    )
}

export default HfUserGet

