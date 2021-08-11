import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from "axios";

function HfContractStatistic (props) {
    let [list, setList] = useState({})

    useEffect(async () => {
        await Get()
    }, [])

    const Get = async () => {

        console.log(props)
        const url = '/api/hf-contract/statistic';

        let fields = {
            params: {
                contract_id: props.contract_id
            }
        }
        let result = await axios.get(url, fields);

        result = result.data;


        setList(prev => (result.response))
    }

    const Research = (list) => {
        const style = {
            fontSize: '12px'
        }

        if ((!list) || (!list.research)) return null

        return list.research.map((item)=>{
            return <p style={style}>
                {item.name}
                <span className="badge bg-secondary">{item.count}</span>
            </p>
        })
    }
    const Specialty = (list) => {
        const style = {
            fontSize: '12px'
        }

        if ((!list) || (!list.specialty)) return null

        return list.specialty.map((item)=>{
            return <p style={style}>
                {item.name}
                <span className="badge bg-secondary">{item.count}</span>
            </p>
        })
    }

    return (
        <>
            <h3>Иследования</h3>
            {Research(list)}

            <h3>Специалисты</h3>
            {Specialty(list)}
        </>

    )
}

export default connect (
    state => ({
        myUser: state.myUser,
    }),
    dispatch => ({

    })
)(HfContractStatistic);

