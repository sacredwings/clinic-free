import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {Link, useParams} from 'react-router-dom'
import axios from "axios"

function HfUserGetById (props) {

    //let [list, setList] = useState([])
    //let [request, setRequest] = useState([])
    let [user, setUser] = useState(null)

    const { contract_id, user_id } = useParams()
    useEffect(async () => {
        await Get()
    }, [])

    const Get = async () => {
        const url = '/api/hf-user/getById'

        let fields = {
            params: {
                ids: user_id
            }
        }
        let result = await axios.get(url, fields)

        result = result.data

        setUser(result.response)
    }

    const User = () => {
        if (!user) return <></>
        return <h4>{user._user.first_name} {user._user.last_name} {user._user.patronymic_name} <span className="badge bg-secondary">{user.price} руб.</span></h4>
    }

    const Research = () => {
        if (!user) return <></>
        return <>
            <h5>Исследования</h5>
            <ul className="list-group">
            {user.research.map((item, i)=>{
                return <li key={i} className="list-group-item">{item.name}</li>
            })}
            </ul>
        </>
    }
    const Specialist = () => {
        if (!user) return <></>
        return <>
            <h5>Специалисты</h5>
            <ul className="list-group">
                {user.specialist.map((item, i)=>{
                    return <li key={i} className="list-group-item">{item.name}</li>
                })}
            </ul>
        </>
    }

    const Pdf = async (type) => {
        const url = 'http://localhost:3041/api/hf-org/pdfUser'

        let fields = {
            params: {
                type: type
            }
        }

        let result = await axios.get(url, fields)

        result = result.data

        document.location.href = `http://localhost:3041/${result.response}`
        //setList(prev => ([...prev, ...result.response.items]))
        //console.log(result)

    }

    return (
        <>
            <h1>Сотрудник организации</h1>
            <User/>
            <div className="btn-group btn-group-sm" role="group" aria-label="Basic outlined example">
                <button type="button" className="btn btn-outline-primary" onClick={()=>{Pdf('karta')}}>Карта</button>
                <button type="button" className="btn btn-outline-primary" onClick={()=>{Pdf('vipiska')}}>Выписка</button>
            </div>
            <br/>
            <Research/>
            <br/>
            <Specialist/>
            {/*
            <StatisticByUser contract_id={contract_id} user_id={user_id}/>
            */}

        </>

    )
}

export default HfUserGetById

