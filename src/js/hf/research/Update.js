import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import axios from "axios";

function Get (props) {

    let [list, setList] = useState([])

    useEffect(async () => {
        await Get()
    }, [])

    //список
    const Get = async () => {
        const url = '/api/hf-research/get'
        let result = await axios.get(url)
        result = result.data
        setList(result.response.items)
    }

    //отображение списка
    const List = (arList) => {
        return <div className="list-group">
            {arList.map((list, i) => {
                return <button type="button" className="list-group-item list-group-item-action" key={i} onClick={()=>{props.SelectHf(list)}}>{list.name}</button>
            })}
        </div>
    }

    return (
        <>
            {(list.length) ? List(list) : null}
        </>

    )
}

export default Get

