import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from "axios";
import StatisticByUser from "../hfContract/StatisticByUser";

function HfUserGetById (props) {

    let [list, setList] = useState([])
    let [request, setRequest] = useState([])
    let [org, setOrg] = useState(null)

    useEffect(async () => {
        console.log(props)
    }, [])

    const UserGetById = async () => {
        const url = '/api/hf-user/getById';

        let fields = {
            params: {
                id: props.match.params.id
            }
        }
        let result = await axios.get(url, fields);

        result = result.data;

        setOrg(result.response)
    }

    return (
        <>
            <h1>Сотрудник организации</h1>

            <StatisticByUser contract_id={props.match.params.contract_id} user_id={props.match.params.user_id}/>
        </>

    )
}

export default connect (
    state => ({
        myUser: state.myUser,
    }),
    dispatch => ({

    })
)(HfUserGetById);

