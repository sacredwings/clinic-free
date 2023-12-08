'use client'

import React, {useState, useEffect} from 'react'
import axios from "axios"

export default function FormSpecialistRadio ({workerId, researchId}) {
    const [value, setValue] = useState(0);

    const onChange = (e) => {
        let name = e.target.id
        let value = e.target.value

        setValue(value)
    }

    const Form = () => {
        return <>
            <div className={"row"}>
                <div className={"col-12"}>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name={`radio_${researchId}`} id={`radio_${researchId}_0`} value="0"
                               checked={value == 0 ? true : false}
                               onChange={onChange} disabled={true}/>
                        <label className="form-check-label" htmlFor={`radio_${researchId}_0`}>
                            Не был
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name={`radio_${researchId}`} id={`radio_${researchId}_1`} value="1"
                               checked={value == 1 ? true : false}
                               onChange={onChange} />
                        <label className="form-check-label" htmlFor={`radio_${researchId}_1`}>
                            Не выполнено
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name={`radio_${researchId}`} id={`radio_${researchId}_2`} value="2"
                               checked={value == 2 ? true : false}
                               onChange={onChange} />
                        <label className="form-check-label" htmlFor={`radio_${researchId}_2`}>
                            <b>Выполнено</b>
                        </label>
                    </div>
                </div>
            </div>
            <div className={"row"}>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Примечание</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
                </div>
            </div>
        </>
    }

    return <>
        {Form()}
    </>
}