import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import axios from "axios";

function Init (props) {

    useEffect(async () => {
    }, [])

    const onFormSubmit = async (e) => {
        e.preventDefault() // Stop form submit

        const url = '/api/init/hf';

        //let fields = form
        //fields.org_id = props.match.params.id

        let result = await axios.post(url);

        result = result.data;

    }

    const Form = () => {
        return <form onSubmit={onFormSubmit} className="p-3">
            <div className="card m-3">

                <div className="card-header">Инициализирование вредных факторов</div>
                <div className="card-body">

                    <button type="submit" className="btn btn-primary">Начать</button>

                </div>
            </div>
        </form>

    }

    return (
        Form()
    )
}

export default connect (
    state => ({
        myUser: state.myUser,
    }),
    dispatch => ({

    })
)(Init);

