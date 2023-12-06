'use client'

import React, {useState, useEffect} from 'react'
import axios from "axios"

export default function FormSpecialistRadio ({workerId, specialistId}) {
    const [value, setValue] = useState(0);

    const onChange = (e) => {
        let name = e.target.id
        let value = e.target.value

        setValue(value)
    }

    const Form = () => {
        return <>
            <div className="form-check">
                <input className="form-check-input" type="radio" name={`radio_${specialistId}`} id={`radio_${specialistId}_0`} value="0"
                       checked={value == 0 ? true : false}
                       onChange={onChange} disabled={true}/>
                <label className="form-check-label" htmlFor={`radio_${specialistId}_0`}>
                    Не был
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name={`radio_${specialistId}`} id={`radio_${specialistId}_1`} value="1"
                       checked={value == 1 ? true : false}
                       onChange={onChange} />
                <label className="form-check-label" htmlFor={`radio_${specialistId}_1`}>
                    Дообследование
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name={`radio_${specialistId}`} id={`radio_${specialistId}_2`} value="2"
                       checked={value == 2 ? true : false}
                       onChange={onChange} />
                <label className="form-check-label" htmlFor={`radio_${specialistId}_2`}>
                    Годен
                </label>
            </div>
        </>
    }

    return <>
        {Form()}
    </>
}