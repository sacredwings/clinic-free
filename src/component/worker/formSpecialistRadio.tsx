'use client'

import React, {useState, useEffect} from 'react'
import axios from "axios"
import {ServerVisitEdit} from "@/component/function/url_api";



export default function FormSpecialistRadio ({workerId, specialist, visit}) {

    const [value, setValue] = useState(visit)
    const [checked, setChecked] = useState(visit ? visit.status : null)
    const [result, setResult] = useState(visit && visit.result ? visit.result : '')
    const [note, setNote] = useState(visit && visit.note ? visit.note : '')

    const onChange = (e) => {
        let name = e.target.id
        let value = e.target.value

        setChecked(!checked)
    }

    const onSave = async (e) => {
        e.preventDefault()

        let arFields = {
            worker_id: workerId,

            specialist_id: specialist._id,
            research_id: null,

            status: checked,
            result: result,
            note: note
        }
        console.log(arFields)
        await ServerVisitEdit(arFields)
    }

    const Form = () => {
        let styles = {marginTop: '20px'}
        if (checked === false) styles={marginTop: '20px', borderColor: '#FFA500', borderWidth: '3px', borderStyle: 'dotted'}
        if (checked === true) styles={marginTop: '20px', borderColor: '#ADFF2F', borderWidth: '3px', borderStyle: 'dotted'}

        return <div className="card" style={styles}>
            <div className="card-body">
                <h5 className="card-title">{specialist.name}</h5>
                <form onSubmit={onSave}>
                    <div className={"row"}>
                        <div className={"col-12"}>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name={`radio_${specialist._id}`} id={`radio_${specialist._id}_0`}
                                       checked={checked === null ? true : false}
                                       onChange={onChange} disabled={true}/>
                                <label className="form-check-label" htmlFor={`radio_${specialist._id}_0`}>
                                    Не был
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name={`radio_${specialist._id}`} id={`radio_${specialist._id}_1`}
                                       checked={checked == false ? true : false}
                                       onChange={onChange} />
                                <label className="form-check-label" htmlFor={`radio_${specialist._id}_1`}>
                                    Дообследование
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name={`radio_${specialist._id}`} id={`radio_${specialist._id}_2`}
                                       checked={checked == true ? true : false}
                                       onChange={onChange} />
                                <label className="form-check-label" htmlFor={`radio_${specialist._id}_2`}>
                                    <b>Годен</b>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className={"row"}>
                        <div className="mb-3 col-6">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Заключение</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="2" value={result} onChange={(e)=>{setResult(e.target.value)}}></textarea>
                        </div>
                        <div className="mb-3 col-6">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Примечание</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="2" value={note} onChange={(e)=>{setNote(e.target.value)}}></textarea>
                        </div>
                    </div>

                    <div className={"row"}>
                        <div className="mb-3" style={{float: 'right'}}>
                            <button type="submit" className="btn btn-success">Сохранить</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    }

    return <>
        {Form()}
    </>
}