import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import axios from "axios";

function ArticleAdd (props) {
    let [form, setForm] = useState({
        inputTitle: '',
        inputText: '',
        add: false,
        err: false
    })
    let [fileIds, setFileIds] = useState('')

    const ArFileIds = (arIds) => {
        setFileIds(arIds)
    }

    //отслеживаем изменение props
    useEffect(async () => {
        //await GetAlbums()
    }, [])

    const onChangeText = (e) => {
        let name = e.target.id;
        let value = e.target.value;

        setForm(prev => ({
            ...prev, [name]: value
        }))
    }

    const FormResult = (err) => {
        setForm(prev => ({
            inputTitle: '',
            inputText: '',
            add: true,
            err: err
        }))
    }

    const onFormSubmit = async (e) => {
        e.preventDefault() // Stop form submit

        const url = '/api/topic/add';

        let arFields = {
            title: form.inputTitle,
            text: form.inputText,
            file_ids: fileIds,
        }

        //комуто на стену
        if ((props.owner_id) && (props.owner_id < 0))
            arFields.group_id = -props.owner_id

        let result = await axios.post(url, arFields);

        result = result.data;

        //ошибка, не продолжаем обработку
        if (result.err) {
            FormResult (result.msg)
        } else {
            FormResult (false)
        }

    }

    const Form = () => {
        return <form onSubmit={onFormSubmit}>

            <div className="mb-3">
                <label htmlFor="inputTitle" className="form-label">Название</label>
                <input type="text" className="form-control" id="inputTitle" onChange={onChangeText} value={form.inputTitle}/>
            </div>
            <div className="mb-3">
                <label htmlFor="inputText" className="form-label">Описание</label>
                <textarea className="form-control" id="inputText" rows="5" onChange={onChangeText} value={form.inputText}></textarea>
            </div>

            <br/>
            <br/>

            <button type="submit" className="btn btn-primary">Добавить</button>

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
)(ArticleAdd);

