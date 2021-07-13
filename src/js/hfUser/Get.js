import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from "axios";
import Statistic from "../hfContract/Statistic";

function HfUserGet (props) {

    let [list, setList] = useState([])
    let [request, setRequest] = useState([])
    let [org, setOrg] = useState(null)

    useEffect(async () => {
        await Get()
        await DogovorGetById()

        console.log(props)
    }, [])

    const Get = async () => {
        console.log(props)
        const url = '/api/hf-user/get';

        let fields = {
            params: {
                contract_id: props.match.params.id
            }
        }
        let result = await axios.get(url, fields);

        result = result.data;

        setList(prev => ([...prev, ...result.response.items]))
        console.log(result)
    }

    const DogovorGetById = async () => {
        console.log(props)
        const url = '/api/hf-contract/getById';

        let fields = {
            params: {
                id: props.match.params.id
            }
        }
        let result = await axios.get(url, fields);

        result = result.data;

        setOrg(result.response)
    }

    const List = (arList) => {
        return <div className="list-group">
            {arList.map((list, i) => {
                let href = `/contract-${list._id}/user`
                return <Link to={href} key={i} className="list-group-item list-group-item-action">{list.user[0].last_name} {list.user[0].first_name} {list.user[0].patronymic_name}</Link>
            })}
        </div>
    }

    return (
        <>
            <h1>Сотрудники организации</h1>
            <p><Link className="btn btn-success btn-sm" to={`/contract-${props.match.params.id}/user/add`} role="button">+</Link> "{(org) ? org.name : null}"</p>

            <Statistic contract_id={props.match.params.id}/>
            <hr/>
            {(list.length) ? List(list) : null}
        </>

    )
}

export default connect (
    state => ({
        myUser: state.myUser,
    }),
    dispatch => ({

    })
)(HfUserGet);

