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
        const url = '/api/org/get';

        let result = await axios.get(url, {});

        result = result.data;

        setList(prev => ([...prev, ...result.response.items]))
        console.log(result)
    }

    const List = (arList) => {
        return <div className="list-group">
            {arList.map((list, i) => {
                let href = `/org-contract/org-${list._id}`
                return <Link to={href} key={i} className="list-group-item list-group-item-action">{list.name}</Link>
            })}
        </div>
    }

    return (

        (list.length) ? List(list) : null
    )
}

export default connect (
    state => ({
        myUser: state.myUser,
    }),
    dispatch => ({

    })
)(Get);

