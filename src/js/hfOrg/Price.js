import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from "axios";

function Price (props) {

    let [research, setResearch] = useState([])
    let [analysis, setAnalysis] = useState([])
    let [specialty, setSpecialty] = useState([])
    let [tableName, setTableName] = useState('research')

    let [listOrg, setListOrg] = useState([])
    let [listContract, setListContract] = useState([])

    let [listOrgSelectValue, setListOrgSelectValue] = useState('')
    let [listContractSelectValue, setListContractSelectValue] = useState('')

    //let [request, setRequest] = useState([])

    useEffect(async () => {
        //загрузка организаций
        await GetOrg()

        //прайс без организаций
        await GetPrice()
    }, [])

    //запрос должен быть с контрактом, поэтому его отслеживаем
    useEffect(async () => {
        await GetPrice(listOrgSelectValue, listContractSelectValue)
    }, [listContractSelectValue])

    const GetPrice = async (org_id, contract_id) => {
        const url = '/api/hf-org/priceGet';

        let fields = {
            params: {
                org_id: org_id,
                contract_id: contract_id
            }
        }

        let result = await axios.get(url, fields);

        result = result.data;

        setResearch(prev => (result.response.research))
        setAnalysis(prev => (result.response.analysis))
        setSpecialty(prev => (result.response.specialty))
    }

    const GetOrg = async () => {
        const url = '/api/hf-org/get';

        let fields = {
            params: {
                contract: 1
            }
        }
        let result = await axios.get(url, fields);

        result = result.data;

        setListOrg(prev => (result.response.items))

        /*
        //организаций не существует
        if (!result.response.items.length) return

        if setListContractSelectValue
        console.log(result)*/
    }

    const onChangeOrg = async (e) => {
        let OrgId = e.target.value //id выбранной организации из массива
        let arContract = [] //по умолчанию у организации нет контрактов
        setListOrgSelectValue(OrgId) //сохраням в статус

        //перебор организаций, ищем ту, что выбранна
        listOrg.forEach(function(item, i, arr) {
            //сходиться
            if (item._id === OrgId) {
                //вытаскиваем массив контрактов
                arContract = item.contract

                //сохраняем id первого контракта
                if (item.contract.length)
                    setListContractSelectValue(item.contract[0]._id)

                return false
            }
        });

        setListContract(arContract)
    }
    const onChangeContract = async (e) => {
        setListContractSelectValue(e.target.value)
    }

    const ListOrg = () => {
        return <select value={listOrgSelectValue} onChange={onChangeOrg} className="form-select" aria-label="Default select example">
            <option value="">Невыбрано</option>
            {listOrg.map((item, i)=>{
                return <option key={i} value={item._id}>{item.name}</option>
            })}
        </select>
    }
    const ListContract = () => {
        if (listContract.length)
            return <select value={listContractSelectValue} onChange={onChangeContract} className="form-select" aria-label="Default select example">
                {listContract.map((item, i)=>{
                    return <option key={i} value={item._id}>{item.name}</option>
                })}
            </select>

        return null
    }

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
                let price = " ? "
                if ((list.price[0]) && (list.price[0].price))
                    price = list.price[0].price

                return <tr key={i}>
                    <th scope="row">{i+1}</th>
                    <td>{list.name}</td>
                    <td>{price}</td>
                </tr>
            })}
            </tbody>
        </table>
    }

    return (
        <div>
            <h1>Прайс</h1>
            {ListOrg()}
            {ListContract()}
            <br/>
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

