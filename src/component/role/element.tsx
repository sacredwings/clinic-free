// @ts-nocheck
'use client'
import React, {useState, useEffect} from 'react'
import Hf from "@/component/hf/list";
import RoleAdd from "@/component/role/add";
import RoleElement from "@/component/role/element";
import {ServerRoleEdit} from "@/component/function/url_api";
import axios from "axios";

export default function Element ({element, setSelectRole}) {
    let [edit, setEdit] = useState(null)
    let [clientElement, setClientElement] = useState(element)

    //загрузка спистка
    useEffect( () => {
        (async () => {

        })()
    }, [])

    const onChangeText = (e) => {
        let name = e.target.id;
        let value = e.target.value;

        setClientElement(prev => ({
            ...prev, [name]: value
        }))
    }

    const OnSave = async () => {
        //сохранение в базе
        let arFields = {
            id: clientElement._id,
            name: clientElement.name,
            access: clientElement.access,
        }
        let result = await ServerRoleEdit(arFields)

        setEdit(null)
    }

    //удаление улемента
    const OnDelete = async () => {
        const url = '/api/hf/delete'
        let arFields = {
            id: edit.id
        }
        let result = await axios.post(url, arFields)
    }

    const Form = () => {
        return <li className="list-group-item">

            <input type="text" className="form-control" id="name" onChange={onChangeText} value={clientElement.name}/>

            <div className="btn-group btn-sm" role="group" aria-label="Basic example">
                <button type="button" className="btn btn-primary btn-sm" onClick={() => setEdit(null)}>Отмена</button>
                <button type="button" className="btn btn-primary btn-sm" onClick={OnSave}>Сохранить</button>
                <button type="button" className="btn btn-danger btn-sm" onClick={OnDelete}>Удалить</button>
            </div>

        </li>
    }

    const View = () => {
        return <li className="list-group-item" onClick={() => {
            setSelectRole(clientElement)
        }}>
            {clientElement.name}
            <button type="button" className="btn btn-warning btn-sm" onClick={()=>{setEdit(!edit)}}>Редактировать</button>
        </li>
    }

    return edit ? Form() : View()
}