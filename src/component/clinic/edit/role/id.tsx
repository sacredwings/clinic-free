// @ts-nocheck
'use client'
import React, {useState, useEffect} from 'react'
import {ServerRoleEdit} from "@/component/function/url_api";
import AlbumCheckList from "@/component/album/checkList";

export default function RoleId ({object, access}) {
    let [form, setForm] = useState(object)
    let [edit, setEdit] = useState(false)

    const onFormSubmit = async (e) => {
        if (e) e.preventDefault() // Stop form submit

        let arFields = {
            id: form._id,

            title: form.title
        }
        let result = await ServerRoleEdit(arFields);

        setEdit(false)
    }

    const onChangeText = (e) => {
        let name = e.target.id;
        let value = e.target.value;

        setForm(prev => ({
            ...prev, [name]: value
        }))
    }

    const FormEdit = () => {
        return <form onSubmit={onFormSubmit}>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Название</label>
                <input type="text" className="form-control" id="title" placeholder="Название"
                       value={form.title} onChange={onChangeText}/>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => {
                    setEdit(false)
                }}>Отмена
                </button>
                <button type="submit" className="btn btn-primary btn-sm">Сохранить</button>
            </div>


        </form>
    }

    const Form = () => {
        return (
            <div className="card">
                <div className="card-body">
                    <h1>{form.title}</h1>

                    {access ? <div className="d-grid gap-2">
                        <button className="btn btn-outline-warning btn-sm" type="button" onClick={() => {
                            setEdit(!edit)
                        }}>
                            <i className="fas fa-edit"></i>
                        </button>
                    </div> : null}
                </div>
            </div>
        )
    }

    return (
        <>
            {edit && access ? FormEdit() : Form()}

        </>
    )
}
