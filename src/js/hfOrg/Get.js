import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from "axios";

function Get (props) {

    let [list, setList] = useState([])
    let [request, setRequest] = useState([])

    useEffect(async () => {
        await Get()
    }, [])

    const Get = async () => {
        const url = '/api/hf-org/get';

        let result = await axios.get(url, {});

        result = result.data;

        setList(prev => ([...prev, ...result.response.items]))
        console.log(result)
    }

    const List = (arList) => {
        return <div className="list-group">
            {arList.map((list, i) => {
                let href = `/org-${list._id}/contract`
                return <Link to={href} key={i} className="list-group-item list-group-item-action">{list.name}</Link>
            })}
        </div>
    }

    return (
        <div>
            <h1>Организации <Link className="btn btn-success btn-sm" to={`/org/add`} role="button">+</Link></h1>
            {(list.length) ? List(list) : null}
        </div>

    )
}

export default Get

