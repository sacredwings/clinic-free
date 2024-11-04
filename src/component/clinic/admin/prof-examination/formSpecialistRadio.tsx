// @ts-nocheck
'use client'

import React, {useState, useEffect} from 'react'
import axios from "axios"
import {serverProfExaminationEditVisit} from "@/component/function/url_api";

export default function FormSpecialistRadio ({workerId, access=false, specialist, visit}) {

    const [checked, setChecked] = useState(visit ? visit.status : null)
    const [result, setResult] = useState(visit && visit.result ? visit.result : '')
    const [note, setNote] = useState(visit && visit.note ? visit.note : '')

    const onChange = (e) => {
        let name = e.target.id
        let value = e.target.value

        setChecked(e.target.value === '1' ? true : false)
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
        await serverProfExaminationEditVisit(arFields)
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
                                <input className="form-check-input" type="radio" name={`radio_${specialist._id}`} id={`radio_${specialist._id}_1`} value={0}
                                       checked={checked == false ? true : false}
                                       onChange={onChange} disabled={!access}/>
                                <label className="form-check-label" htmlFor={`radio_${specialist._id}_1`}>
                                    Дообследование
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name={`radio_${specialist._id}`} id={`radio_${specialist._id}_2`} value={1}
                                       checked={checked == true ? true : false}
                                       onChange={onChange} disabled={!access}/>
                                <label className="form-check-label" htmlFor={`radio_${specialist._id}_2`}>
                                    <b>Годен</b>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className={"row"}>
                        <div className="mb-3 col-6">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Заключение</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" disabled={!access} rows={2} value={result} onChange={(e)=>{setResult(e.target.value)}}></textarea>
                        </div>
                        <div className="mb-3 col-6">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Примечание</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" disabled={!access} rows={2} value={note} onChange={(e)=>{setNote(e.target.value)}}></textarea>
                        </div>
                    </div>

                    {access ?
                        <div className={"row"}>
                            <div className="mb-3" style={{float: 'right'}}>
                                <button type="submit" className="btn btn-success">Сохранить</button>
                            </div>
                        </div> : null}

                </form>
            </div>
        </div>
    }

    return <>
        {Form()}
    </>
}