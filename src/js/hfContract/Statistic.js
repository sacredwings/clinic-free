import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from "axios";

function HfContractStatistic (props) {

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

        //setList(prev => ([...prev, ...result.response.items]))
        console.log(result)
    }

    return (
        <>
            Статистика
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

