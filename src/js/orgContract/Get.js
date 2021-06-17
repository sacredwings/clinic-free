import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from "axios";

function Get (props) {

    let [list, setList] = useState([])
    let [request, setRequest] = useState([])

    useEffect(async () => {
        await Get()

        console.log(props)
    }, [])

    const Get = async () => {
        console.log(props)
        const url = '/api/org-contract/get';

        let fields = {
            params: {
                org_id: props.match.params.id
            }
        }
        let result = await axios.get(url, fields);

        result = result.data;

        setList(prev => ([...prev, ...result.response.items]))
        console.log(result)
    }

    const List = (arList) => {
        return <div className="list-group">
            {arList.map((list, i) => {
                let href = `/contract/${list._id}`
                return <Link to={href} key={i} className="list-group-item list-group-item-action">{list.name}</Link>
            })}
        </div>
    }

    return (
        <>
            <a className="btn btn-primary" href={`/org-contract/org-${props.match.params.id}/add`} role="button">+ Контракт</a>
            <br/>
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
)(Get);

