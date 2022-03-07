import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import axios from "axios";

function Get (props) {

    let [list, setList] = useState([])
    let [listCheck, setListCheck] = useState([])
    let [selectHfId, setSelectHfId] = useState([])

    useEffect(async () => {
        await Get()
    }, [])

    useEffect(async () => {
        console.log(listCheck)
    }, [listCheck])

    useEffect(async () => {
        if (!props.selectHf) return false
        if (!props.selectHf.research_id) return false
        if (!list) return false

        setSelectHfId(props.selectHf._id)
        await ListCheck(list, props.selectHf.research_id)
    }, [props.selectHf, list])

    const ListCheck = async (list, hfList) => {
        let newList = list.map((elementList, i) => {
            for (let hf of hfList) {
                if (elementList._id === hf)
                    return {
                        checked: true,
                        _id: elementList._id,
                        name: elementList.name
                    }
            }

            return {
                checked: false,
                _id: elementList._id,
                name: elementList.name
            }

        })

        setListCheck(newList)
    }

    //список договоров
    const Get = async () => {
        const url = '/api/hf-research/get';

        let result = await axios.get(url);

        result = result.data;

        setList(result.response.items)
    }

    //список договоров
    const Update = (id) => {
        const url = '/api/hf-research/update-hf';

        let arFields = {
            hf_id: selectHfId,
            id: id
        }
        let result = axios.post(url, arFields);
    }

    const OnChange = (id) => {
        let newListCheck = listCheck.map((element, i) => {
            if (element._id === id)
                element.checked = !element.checked

            return element
        })

        setListCheck(newListCheck)

        Update(id)
    }

    const form = (arCheck) => {
        return <form>
            <div className="mb-3">
                {arCheck.map((list, i) => {
                    return <div className="form-check" key={i}>
                        <input className="form-check-input" type="checkbox" value="" checked={list.checked} onChange={()=>{OnChange(list._id)}}/>
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            {list.name}
                        </label>
                    </div>
                })}

            </div>
        </form>
    }

    return (
        <>
            {(list.length) ? form(listCheck) : null}
        </>

    )
}

export default Get

