// @ts-nocheck
'use client'
import React, {useEffect, useState} from 'react';

export default function MyForm({radioName='radio', list=[], arIds=[]}) {
    let [clientList, setClientList] = useState(list)

    useEffect(() => {
        (async () => {

        })()
    }, [])

    const OnChange = (_id: string) => {

    }

    const Element = async ({_id, title}, i) => {
        return <input key={i} type="radio" name={radioName} value={title} onChange={() => OnChange(_id)}/>
    }

    console.log(clientList)
    return clientList.map((item, i)=>{
        return Element(item, i)
    })
}
