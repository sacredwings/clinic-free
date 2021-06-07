import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import axios from "axios";

function ArticleAdd (props) {
    let [form, setForm] = useState({
        name: '',
        fullName: '',
        inn: '',
        kpp: '',
        ogrn: '',
        paymentAccount: '', //расчетный счет

        postCode: '', //почтовый индекс
        country: '', //страна
        region: '', //область
        district: '', //район
        locality: '', //населенный пункт
        street: '', //улица
        house: '', //дом
        corps: '', //корпус
        structure: '', //строение
        flat: '', //квартира

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
        return <div className="card m-3">
            <div className="card-body">
                <form onSubmit={onFormSubmit} className="p-3">

                    <h4>Наименование</h4>
                    <div className="mb-3 row">
                        <label htmlFor="name" className="col-sm-2 col-form-label">Наименование</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="name" value={form.name} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="fullName" className="col-sm-2 col-form-label">Полное наименование</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="name" value={form.fullName} onChange={onChangeText}/></div>
                    </div>

                    <hr/>
                    <h4>Реквизиты</h4>
                    <div className="mb-3 row">
                        <label htmlFor="inn" className="col-sm-2 col-form-label">ИНН</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="inn" value={form.inn} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="kpp" className="col-sm-2 col-form-label">КПП</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="kpp" value={form.kpp} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="ogrn" className="col-sm-2 col-form-label">ОГРН</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="ogrn" value={form.ogrn} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="paymentAccount" className="col-sm-2 col-form-label">Расчетный счет</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="paymentAccount" value={form.paymentAccount} onChange={onChangeText}/></div>
                    </div>

                    <hr/>
                    <h4>Адрес</h4>
                    <div className="mb-3 row">
                        <label htmlFor="postCode" className="col-sm-2 col-form-label">Почтовый индекс</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="postCode" value={form.postCode} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="country" className="col-sm-2 col-form-label">Страна</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="country" value={form.country} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="region" className="col-sm-2 col-form-label">Регион</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="region" value={form.region} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="district" className="col-sm-2 col-form-label">Район</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="district" value={form.district} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="locality" className="col-sm-2 col-form-label">Населенный пункт</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="locality" value={form.locality} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="street" className="col-sm-2 col-form-label">Населенный пункт</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="street" value={form.street} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="house" className="col-sm-2 col-form-label">Дом</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="house" value={form.house} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="corps" className="col-sm-2 col-form-label">Корпус</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="corps" value={form.corps} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="structure" className="col-sm-2 col-form-label">Строение</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="structure" value={form.structure} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="flat" className="col-sm-2 col-form-label">Квартира</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="flat" value={form.flat} onChange={onChangeText}/></div>
                    </div>

                    <button type="submit" className="btn btn-primary">Добавить</button>

                </form>
            </div>
        </div>

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

