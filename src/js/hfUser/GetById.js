import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import axios from "axios";
import StatisticByUser from "../hfContract/StatisticByUser";

function HfUserGetById (props) {

    let [list, setList] = useState([])
    let [request, setRequest] = useState([])
    let [org, setOrg] = useState(null)

    const { id, contract_id, user_id } = useParams()
    useEffect(async () => {
        console.log(props)
    }, [])

    const UserGetById = async () => {
        const url = '/api/hf-user/getById';

        let fields = {
            params: {
                id: id
            }
        }
        let result = await axios.get(url, fields);

        result = result.data;

        setOrg(result.response)
    }

    return (
        <>
            <h1>Сотрудник организации</h1>

            <StatisticByUser contract_id={contract_id} user_id={user_id}/>
        </>

    )
}

export default HfUserGetById

