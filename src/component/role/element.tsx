// @ts-nocheck
'use client'
import React, {useState, useEffect} from 'react'
import Hf from "@/component/hf/list";
import RoleAdd from "@/component/role/add";
import RoleElement from "@/component/role/element";
import {ServerHfEdit} from "@/component/function/url_api";
import axios from "axios";

export default function Element ({element, setSelectRole}) {
    let [edit, setEdit] = useState(null)
    let [clientElement, setClientElement] = useState(null)

    //загрузка спистка
    useEffect( () => {
        (async () => {

        })()
    }, [])

    const OnSave = async () => {
        //сохранение в базе
        let arFields = {
            id: edit.id,
            name: edit.name
        }
        let result = await ServerHfEdit(arFields)

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
        return <tr>
            <td>
                <input type="text" className="form-control" id="name" onChange={(e) => {
                    OnChange(e, element._id)
                }} value={edit.name}/>
            </td>
            <td>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-primary" onClick={() => setEdit(null)}>Отмена</button>
                    <button type="button" className="btn btn-primary" onClick={OnSave}>Сохранить</button>
                    <button type="button" className="btn btn-danger" onClick={OnDelete}>Удалить</button>
                </div>
            </td>
        </tr>
    }

    const View = () => {
        return <li className="list-group-item" onClick={() => {
            setSelectRole(element)
        }}>
            {element.name}
            <button type="button" className="btn btn-warning" onClick={()=>{setEdit(!edit)}}>Редактировать</button>
        </li>
    }

    return edit ? Form() : View()
}