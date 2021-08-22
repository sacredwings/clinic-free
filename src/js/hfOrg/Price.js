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
    let [listOrgSelectValue, setListOrgSelectValue] = useState('')

    let [request, setRequest] = useState([])

    useEffect(async () => {
        await Get()
        await GetOrg()
    }, [])

    const Get = async (value) => {
        const url = '/api/hf-org/priceGet';

        let fields = {
            params: {
                org_id: value
            }
        }
        //if (!Number (listOrgSelectValue)) fields={}

        console.log(fields)
        let result = await axios.get(url, fields);

        result = result.data;

        setResearch(prev => (result.response.research))
        setAnalysis(prev => (result.response.analysis))
        setSpecialty(prev => (result.response.specialty))
    }

    const GetOrg = async () => {
        const url = '/api/hf-org/get';

        let result = await axios.get(url, {});

        result = result.data;

        setListOrg(prev => (result.response.items))
        console.log(result)
    }

    const HandleChange = async (e) => {
        setListOrgSelectValue(e.target.value)
        await Get(e.target.value)
    }
    const ListOrg = () => {
        return <select value={listOrgSelectValue} onChange={HandleChange} className="form-select" aria-label="Default select example">
            <option value="">Невыбрано</option>
            {listOrg.map((item, i)=>{
                return <option key={i} value={item._id}>{item.name}</option>
            })}
        </select>
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

