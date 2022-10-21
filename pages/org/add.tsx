import React, {useState, useEffect} from 'react'
import axios from "axios"
import TemplatesMain from "../../components/template/main"

export default function () {
    const formDefault = {
        name: '',
        full_name: '',

        inn: '',
        kpp: '',
        ogrn: '',
        payment_account: '', //расчетный счет

        post_code: '', //почтовый индекс
        country: '', //страна
        region: '', //область
        district: '', //район
        locality: '', //населенный пункт
        street: '', //улица
        house: '', //дом
        corps: '', //корпус
        structure: '', //строение
        flat: '', //квартира
    }

    let [form, setForm] = useState(formDefault)
    let [formResult, setFormResult] = useState(null)

    const onChangeText = (e) => {
        let name = e.target.id;
        let value = e.target.value;

        setForm(prev => ({
            ...prev, [name]: value
        }))
    }

    const onFormSubmit = async (e) => {
        e.preventDefault() // Stop form submit

        const url = '/api/org/add'

        let result = await axios.post(url, form)

        if (result.data.code)
            setFormResult(false)
        else
            setFormResult(true)

    }

    const Form = () => {
        return <form onSubmit={onFormSubmit} className="p-3">
            <div className="card m-3">
                <div className="card-header">Новая организация</div>
                <div className="card-body">
                    {(formResult === false) ? AddErr() : null}
                    <h6 className="card-title text-center">Наименование</h6>
                    <br/>
                    <div className="mb-3 row">
                        <label htmlFor="name" className="col-sm-2 col-form-label">Наименование</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="name"
                                                          value={form.name} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="full_name" className="col-sm-2 col-form-label">Полное наименование</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="full_name"
                                                          value={form.full_name} onChange={onChangeText}/></div>
                    </div>

                    <h6 className="card-title text-center">Реквизиты</h6>
                    <br/>
                    <div className="mb-3 row">
                        <label htmlFor="inn" className="col-sm-2 col-form-label">ИНН</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="inn" value={form.inn}
                                                          onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="kpp" className="col-sm-2 col-form-label">КПП</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="kpp" value={form.kpp}
                                                          onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="ogrn" className="col-sm-2 col-form-label">ОГРН</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="ogrn"
                                                          value={form.ogrn} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="payment_account" className="col-sm-2 col-form-label">Расчетный счет</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="payment_account"
                                                          value={form.payment_account} onChange={onChangeText}/></div>
                    </div>

                    <h6 className="card-title text-center">Адрес</h6>
                    <br/>
                    <div className="mb-3 row">
                        <label htmlFor="post_code" className="col-sm-2 col-form-label">Почтовый индекс</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="post_code"
                                                          value={form.post_code} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="country" className="col-sm-2 col-form-label">Страна</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="country"
                                                          value={form.country} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="region" className="col-sm-2 col-form-label">Регион</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="region"
                                                          value={form.region} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="district" className="col-sm-2 col-form-label">Район</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="district"
                                                          value={form.district} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="locality" className="col-sm-2 col-form-label">Населенный пункт</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="locality"
                                                          value={form.locality} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="street" className="col-sm-2 col-form-label">Улица</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="street"
                                                          value={form.street} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="house" className="col-sm-2 col-form-label">Дом</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="house"
                                                          value={form.house} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="corps" className="col-sm-2 col-form-label">Корпус</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="corps"
                                                          value={form.corps} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="structure" className="col-sm-2 col-form-label">Строение</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="structure"
                                                          value={form.structure} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="flat" className="col-sm-2 col-form-label">Квартира</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="flat"
                                                          value={form.flat} onChange={onChangeText}/></div>
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

    return <TemplatesMain title={'Главная страница'}>
        <h1>Новая организация</h1>
        {formResult ? AddNoErr() : Form()}
    </TemplatesMain>

}
export async function getServerSideProps ({query, req}) {
    return {
        props: {}
    }
}