import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from "axios";

function Get (props) {

    let [list, setList] = useState([])
    let [request, setRequest] = useState([])
    let [org, setOrg] = useState(null)

    useEffect(async () => {
        await Get()
        await OrgGetById()

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

    const OrgGetById = async () => {
        console.log(props)
        const url = '/api/org/getById';

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
                let href = `/contract/${list._id}`
                return <Link to={href} key={i} className="list-group-item list-group-item-action">{list.name}</Link>
            })}
        </div>
    }

    return (
        <>
            <h1>Договора</h1>
            <p><a className="btn btn-success btn-sm" href={`/org-contract/org-${props.match.params.id}/add`} role="button">+</a> "{(org) ? org.name : null}"</p>
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

