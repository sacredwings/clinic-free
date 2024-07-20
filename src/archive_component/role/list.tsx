// @ts-nocheck
'use client'
import React, {useState, useEffect} from 'react'
import Access from "@/component/function/access";
import Style from "@/component/doctor/style.module.sass";
import Element from "@/component/role/element";
import Link from "next/link";

export default function List ({clinic, list,  account, accessAdd, accessEdit, accessDelete}) {
    let [clientList, setClientList] = useState(list)

    useEffect(() => {
        (async () => {
            setClientList(list)
        })()
    }, [list])

    const ElementAdd = (element) => {
        setClientList(prev=>({...prev,
            items: [...element, ...clientList.items],
            count: prev.count + 1
        }))
    }

    const ElementDelete = (id) => {
        let newArr = []

        clientList.items.forEach((item)=>{
            if (item._id !== id) newArr.push(item)
        })

        setClientList(prev=>({...prev,
            items: newArr,
            count: prev.count - 1
        }))
    }

    return <div className={Style.cardContainer}>

        Здесь список ролей
        {accessAdd ? <Link href={'/role/add'} className={'btn btn-primary'}>Добавить</Link> : null}

        {clientList.items.map((item, i) => {
            let accessElementEdit = Access(account, [item])
            let accessElementDelete = Access(account, [item])
            //if (accessEdit) accessElementEdit = accessEdit
            if (accessDelete) accessElementDelete = accessDelete

            return (
                <Element
                    clinic_id={clinic._id}

                    key={item._id}
                    element={item}

                    accessEdit={accessElementEdit}
                    accessDelete={accessElementDelete}

                    ElementDelete={ElementDelete}
                />
            )
        })}

    </div>

}
