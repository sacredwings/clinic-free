import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import axios from "axios";

function Add (props) {
    const formDefault = {
        name: '',
        date_from: '',
        date_to: ''
    }

    let [err, setErr] = useState(null)

    let [form, setForm] = useState(formDefault)
    let [listTypeSelectValue, setListTypeSelectValue] = useState('')

    useEffect(async () => {
    }, [])

    const onChangeText = (e) => {
        let name = e.target.id;
        let value = e.target.value;

        setForm(prev => ({
            ...prev, [name]: value
        }))
    }

    const Default = (err) => {
        setForm(prev => (formDefault))
    }

    const onFormSubmit = async (e) => {
        e.preventDefault() // Stop form submit

        const url = '/api/hf-contract/add';

        let fields = form
        fields.org_id = props.match.params.id
        fields.price = listTypeSelectValue

        let result = await axios.post(url, fields);

        result = result.data;

        if (result.error)
            setErr(true)

    }

    const onChangeType = async (e) => {
        let OrgId = e.target.value //id выбранной организации из массива
        setListTypeSelectValue(OrgId) //сохраням в статус
    }

    const ListType = () => {
        return <select value={listTypeSelectValue} onChange={onChangeType} className="form-select" aria-label="Default select example">
            <option value="0">Общий</option>
            <option value="1">Индивидуальный</option>
            <option value="2">Фиксируемый</option>
        </select>
    }

    const Form = () => {
        return <form onSubmit={onFormSubmit} className="p-3">
            <div className="card m-3">

                <div className="card-header">Новый договор</div>
                <div className="card-body">

                    {/* <div className="mb-3 row">
                        <label htmlFor="code" className="col-sm-2 col-form-label">Код</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="code" value={form.code} onChange={onChangeText}/></div>
                    </div> */}

                    <div className="mb-3 row">
                        <label htmlFor="name" className="col-sm-2 col-form-label">Наименование</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="name" value={form.name} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="date_from" className="col-sm-2 col-form-label">C</label>
                        <div className="col-sm-10"><input type="date" className="form-control" id="date_from" value={form.date_from} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="date_to" className="col-sm-2 col-form-label">До</label>
                        <div className="col-sm-10"><input type="date" className="form-control" id="date_to" value={form.date_to} onChange={onChangeText}/></div>
                    </div>

                    {/*
                    <div className="mb-3 row">
                        <label htmlFor="type" className="col-sm-2 col-form-label">Тип расчета</label>
                        <div className="col-sm-10">
                            {ListType()}
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="price" className="col-sm-2 col-form-label">Цена за человека</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="price" value={form.price} onChange={onChangeText}/></div>
                    </div>
                    */}

                    <button type="submit" className="btn btn-primary">Добавить</button>

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
)(Add);

