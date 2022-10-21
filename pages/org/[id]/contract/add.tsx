import React, {useState, useEffect} from 'react'
import axios from "axios"
import TemplatesMain from "../../../../components/template/main"

export default function ({id}) {
    const formDefault = {
        name: '',
        date_from: '',
        date_to: '',
        price_ultrasound: '',
        price_mammography: '',
        price_xray: '',
        price: ''
    }

    let [form, setForm] = useState(formDefault) //для формы
    let [formContractType, setFormContractType] = useState([]) //для формы
    let [contractTypeList, setContractTypeList] = useState([])
    let [formResult, setFormResult] = useState(null)

    useEffect(() => {
        (async () => {
            await GetTypeContract()
        })()
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

        const url = '/api/contract/add'

        //добавляем поля
        let fields = form
        //if (formContractType) fields.contract_type_ids = JSON.stringify(formContractType)
        if (formContractType) fields.contract_type_ids = formContractType
        fields.org_id = id

        let result = await axios.post(url, fields)
        if (result.data.code)
            setFormResult(false)
        else
            setFormResult(true)

    }

    //список типов договоров
    const GetTypeContract = async () => {
        const url = '/api/contract-type/get'

        let result = await axios.get(url)

        setContractTypeList(result.data.response.items)
    }

    const OnChangeCheck = (id) => {
        let list = []
        let newListCheck = contractTypeList.map((element, i) => {
            if (element._id === id)
                element.checked = !element.checked

            if (element.checked) list.push(element._id)
            return element
        })
        setContractTypeList(newListCheck)
        setFormContractType(list)
        //Update(id)
    }

    const FormCheck = () => {
        return <div className="mb-3 row">
            <label htmlFor="date_from" className="col-sm-2 col-form-label">Тип договора</label>
            <div className="col-sm-10">
                {contractTypeList.map((item, i)=>{
                    return <div className="form-check" key={i}>
                        <input className="form-check-input" type="checkbox" onChange={()=>{OnChangeCheck(item._id)}}/>
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            {item.name}
                        </label>
                    </div>
                })}

            </div>
        </div>
    }

    const Form = () => {
        return <form onSubmit={onFormSubmit} className="p-3">
            <div className="card m-3">

                <div className="card-body">
                    {(formResult === false) ? AddErr() : null}
                    {/* <div className="mb-3 row">
                        <label htmlFor="code" className="col-sm-2 col-form-label">Код</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="code" value={form.code} onChange={onChangeText}/></div>
                    </div> */}

                    <h2>Общее</h2>
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

                    {FormCheck()}
                    <hr/>
                    <h2>Цены</h2>
                    <div className="mb-3 row">
                        <label htmlFor="price" className="col-sm-2 col-form-label">УЗИ</label>
                        <div className="col-sm-10"><input type="number" className="form-control" id="price_ultrasound" value={form.price_ultrasound} onChange={onChangeText}/></div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="price" className="col-sm-2 col-form-label">ММГ</label>
                        <div className="col-sm-10"><input type="number" className="form-control" id="price_mammography" value={form.price_mammography} onChange={onChangeText}/></div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="price" className="col-sm-2 col-form-label">ФЛГ</label>
                        <div className="col-sm-10"><input type="number" className="form-control" id="price_xray" value={form.price_xray} onChange={onChangeText}/></div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="price" className="col-sm-2 col-form-label">За человека</label>
                        <div className="col-sm-10"><input type="number" className="form-control" id="price" value={form.price} onChange={onChangeText}/></div>
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
        <h1>Новый договор</h1>
        {formResult ? AddNoErr() : Form()}
    </TemplatesMain>

}
export async function getServerSideProps ({query, req}) {
    return {
        props: {
            id: query.id
        }
    }
}