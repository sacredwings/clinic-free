import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from "axios";

function Price (props) {

    let [research, setResearch] = useState([])
    let [analysis, setAnalysis] = useState([])
    let [specialty, setSpecialty] = useState([])
    let [tableName, setTableName] = useState('research')

    let [editPriceId, setEditPriceId] = useState(null) /* чтобы понимать на какой строке показывать форму */
    let [savePrice, setSavePrice] = useState('') /* временное хранение цены */

    useEffect(async () => {
        //прайс без организаций
        await GetPrice()
    }, [])

    const GetPrice = async () => {
        const url = '/api/hf-price/get';

        let fields = {
            params: {}
        }

        let result = await axios.get(url, fields);

        result = result.data;

        setResearch(prev => (result.response.research))
        setAnalysis(prev => (result.response.analysis))
        setSpecialty(prev => (result.response.specialty))
    }

    const onChangePrice = async (e, id) => {
        setSavePrice(e.target.value)
        /*
        console.log(e.target.value)
        console.log(id)
        //setSavePrice(e.target.value)

        let value = e.target.value
        let arr = []
        let func = ()=>{}

        switch (tableName) {
            case 'research':
                arr = research
                func = setResearch
                break
            case 'analysis':
                arr = analysis
                func = setAnalysis
                break;
            case 'specialty':
                arr = specialty
                func = setSpecialty
                break;
        }

        arr.forEach(function(item, i, arr) {
            if (id === item._id) {
                console.log('есть такой', i)

                arr[i] = {...arr[i], price: value}
                console.log(arr)
                func(arr)
            }

        });*/
    }

    //форма сохранения цены
    const EditPrice = (id, price) => {
        let placeholder = ' ? '
        if (price)
            placeholder = price

        return <div className="input-group">
            <input type="text" className="form-control" placeholder={placeholder}
                   aria-label="Recipient's username with two button addons" value={savePrice} onChange={
                       (e)=>onChangePrice(e, id)
                   }/>

                <button className="btn btn-success" type="button" onClick={()=>{
                    //форму не показывать
                    setEditPriceId(null)

                    //сохранение цены на сервер и во в таблице (не работает)
                    SavePrice(id)
                }}>ОК</button>
        </div>
    }
    //отображение цены
    const NoEditPrice = (id, price) => {
        if (!price)
            price = ' ? '

        return <>
            {/* цена */}
            {price}
            <button type="button" className="btn btn-outline-dark" onClick={()=>{
                //форму показать на нужной строке
                setEditPriceId(id)

                //обнулить цену в форме ввода
                setSavePrice('')
            }}>...</button>
        </>
    }

    //сохранение суммы
    const SavePrice = (id) => {
        const url = '/api/hf-price/editUserFiz';

        let fields = {
            object_id: id,
            price: savePrice
        }
        let result = axios.post(url, fields);

        result = result.data;

        console.log(result)
    }

    //загрузка таблицы
    const List = () => {
        let arr = []
        switch (tableName) {
            case 'research':
                arr = research
                break
            case 'analysis':
                arr = analysis
                break;
            case 'specialty':
                arr = specialty
                break;
        }

        return <table className="table table-hover">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Название</th>
                <th scope="col">Цена</th>
            </tr>
            </thead>
            <tbody>
            {arr.map((list, i) => {
                let href = `#`
                let price = null
                if ((list.price[0]) && (list.price[0].price))
                    price = list.price[0].price

                return <tr key={i}>
                    <th scope="row">{i+1}</th>
                    <td>{list.name}</td>
                    <td>
                        {((editPriceId) && (list._id === editPriceId)) ? EditPrice(list._id, price) : NoEditPrice(list._id, price)}
                    </td>
                </tr>
            })}
            </tbody>
        </table>
    }

    return (
        <div>
            <h1>Прайс</h1>
            <div className="row">
                <div className="col-lg-4">
                    <div className="d-grid gap-2">
                        <button type="button" className="btn btn-primary" onClick={()=>{setTableName('research')}}>Иследования</button>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="d-grid gap-2">
                        <button type="button" className="btn btn-primary" onClick={()=>{setTableName('specialty')}}>Специалисты</button>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="d-grid gap-2">
                        <button type="button" className="btn btn-primary" onClick={()=>{setTableName('analysis')}}>Анализы</button>
                    </div>
                </div>
            </div>
            <br/>
            {List()}
        </div>

    )
}

export default connect (
    state => ({
        myUser: state.myUser,
    }),
    dispatch => ({

    })
)(Price);

