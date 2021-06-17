import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import axios from "axios";

function AddClient (props) {
    const formDefault = {
        code: '',
        name: '',
        date_from: '',
        date_to: ''
    }

    let [form, setForm] = useState(formDefault)

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

        const url = '/api/org-contract/add';

        let fields = form
        fields.org_id = props.match.params.id

        let result = await axios.post(url, form);

        result = result.data;

    }

    const Form = () => {
        return <form onSubmit={onFormSubmit} className="p-3">
            <div className="card m-3">

                <div className="card-header">Новый сотрудник</div>
                <div className="card-body">

                    <div className="row g-3 align-items-center">
                        <div className="col-4">
                            <label htmlFor="last_name" className="col-form-label">Фамилия</label>
                            <input type="text" className="form-control" id="last_name" value={form.last_name} onChange={onChangeText}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="first_name" className="col-form-label">Имя</label>
                            <input type="text" className="form-control" id="first_name" value={form.first_name} onChange={onChangeText}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="patronymic_name" className="col-form-label">Отчество</label>
                            <input type="text" className="form-control" id="patronymic_name" value={form.patronymic_name} onChange={onChangeText}/>
                        </div>
                    </div>
                    <div className="row g-3 align-items-center">
                        <div className="col-3">
                            <label htmlFor="last_name" className="col-form-label">Пол</label>
                            <select className="form-select" aria-label="">
                                <option selected value="1">Мужской</option>
                                <option value="0">Женский</option>
                            </select>
                        </div>
                        <div className="col-3">
                            <label htmlFor="date_birth" className="col-form-label">Дата рождения</label>
                            <input type="date" className="form-control" id="date_birth" value={form.date_birth} onChange={onChangeText}/>
                        </div>
                        <div className="col-3">
                            <label htmlFor="oms_policy_number" className="col-form-label">Номер полиса ОМС</label>
                            <input type="text" className="form-control" id="oms_policy_number" value={form.oms_policy_number} onChange={onChangeText}/>
                        </div>
                        <div className="col-3">
                            <label htmlFor="snils" className="col-form-label">СНИЛС</label>
                            <input type="text" className="form-control" id="snils" value={form.snils} onChange={onChangeText}/>
                        </div>
                    </div>
                    <br/>
                    <h6 className="card-title text-center">Адрес</h6>
                    <br/>


                    <div className="mb-3 row">
                        <label htmlFor="date_to" className="col-sm-2 col-form-label">Пол</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="date_to" value={form.date_to} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="date_to" className="col-sm-2 col-form-label">Дата рождения</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="date_to" value={form.date_to} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="date_to" className="col-sm-2 col-form-label">Номер полиса ОМС</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="date_to" value={form.date_to} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="date_to" className="col-sm-2 col-form-label">СНИЛС</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="date_to" value={form.date_to} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="date_to" className="col-sm-2 col-form-label">СНИЛС</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="date_to" value={form.date_to} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="date_to" className="col-sm-2 col-form-label">Область</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="date_to" value={form.date_to} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="date_to" className="col-sm-2 col-form-label">Район</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="date_to" value={form.date_to} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="date_to" className="col-sm-2 col-form-label">Нас. пункт</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="date_to" value={form.date_to} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="date_to" className="col-sm-2 col-form-label">Улица (переулок)</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="date_to" value={form.date_to} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="date_to" className="col-sm-2 col-form-label">№ дома</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="date_to" value={form.date_to} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="date_to" className="col-sm-2 col-form-label">№ дома</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="date_to" value={form.date_to} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="date_to" className="col-sm-2 col-form-label">Корпус</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="date_to" value={form.date_to} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="date_to" className="col-sm-2 col-form-label">Квартира</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="date_to" value={form.date_to} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="date_to" className="col-sm-2 col-form-label">Строение</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="date_to" value={form.date_to} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="date_to" className="col-sm-2 col-form-label">Серия</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="date_to" value={form.date_to} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="date_to" className="col-sm-2 col-form-label">Номер</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="date_to" value={form.date_to} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="date_to" className="col-sm-2 col-form-label">Дата выдачи</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="date_to" value={form.date_to} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="date_to" className="col-sm-2 col-form-label">Кем выдан</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="date_to" value={form.date_to} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="date_to" className="col-sm-2 col-form-label">Телефон</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="date_to" value={form.date_to} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="date_to" className="col-sm-2 col-form-label">Доп. телефон</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="date_to" value={form.date_to} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="date_to" className="col-sm-2 col-form-label">Профессия</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="date_to" value={form.date_to} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="date_to" className="col-sm-2 col-form-label">Место работы</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="date_to" value={form.date_to} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="date_to" className="col-sm-2 col-form-label">Стаж (лет)</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="date_to" value={form.date_to} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="date_to" className="col-sm-2 col-form-label">Дата приема на работу</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="date_to" value={form.date_to} onChange={onChangeText}/></div>
                    </div>

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
)(AddClient);

