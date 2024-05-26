// @ts-nocheck
'use client'
import React, {useEffect, useRef, useState} from 'react'
import activities from './activities.json'

export default function ActivitiesList ({onSelect}) {

    function XXX (x) {
        {activities.forEach((item, i) => {
            if (item.title === x.target.value) onSelect(item.id)
        })}
    }

    return <>
        <label htmlFor="exampleDataList" className="form-label">Виды деятельности <span
            className="badge text-bg-warning">ЭЛМК</span></label>
        <input className="form-control" list="datalistOptions" id="exampleDataList"
               placeholder="Type to search..." onChange={XXX}/>
        <datalist id={'datalistOptions'}>
            {activities.map((item, i) => {
                return <option key={i} value={item.title}/>
            })}
        </datalist>
    </>
}
