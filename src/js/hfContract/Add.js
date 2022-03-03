import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import axios from "axios";
import {useParams} from "react-router-dom";

function Add (props) {
    const formDefault = {
        name: '',
        date_from: '',
        date_to: ''
    }

    let [form, setForm] = useState(formDefault)
    let [listTypeSelectValue, setListTypeSelectValue] = useState('')

    let [formResult, setFormResult] = useState(null)

    const { id } = useParams()

    useEffect(async () => {
    }, [])

    const onChangeText = (e) => {
        let name = e.target.id;
        let value = e.target.value;

        setForm(prev => ({
            ...prev, [name]: value
        }))
    }

    const onFormSubmit = async (e) => {
        e.preventDefault() // Stop form submit

        const url = '/api/hf-contract/add';

        let fields = form
        fields.org_id = id
        fields.type = listTypeSelectValue

        let result = await axios.post(url, fields);

        result = result.data;

        if (result.err)
            setFormResult(false)
        else
            setFormResult(true)

    }

    const onChangeType = async (e) => {
        let OrgId = e.target.value //id выбранной организации из массива
        setListTypeSelectValue(OrgId) //сохраням в статус
    }

    const ListType = () => {
        return <select value={listTypeSelectValue} onChange={onChangeType} className="form-select" aria-label="Default select example">
            <option value="global">Общий</option>
            <option value="many">У каждого разная цена</option>
            <option value="one">Одна цена для каждого</option>
        </select>
    }

    const Form = () => {
        return <form onSubmit={onFormSubmit} className="p-3">
            <div className="card m-3">

                <div className="card-header">Новый договор</div>
                <div className="card-body">
                    {(formResult === false) ? AddErr() : null}
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


                    <button type="submit" className="btn btn-primary">Добавить</button>

                </div>
            </div>
        </form>

    }

    const AddErr = () => {
        return <div className="alert alert-danger">
            Не удалось добавить
        </div>
    }
    const AddNoErr = () => {
        return <div className="alert alert-success">
            Добавлено
        </div>
    }

    return formResult ? AddNoErr() : Form()
}

export default Add

