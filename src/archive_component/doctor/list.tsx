// @ts-nocheck
'use client'
import React, {useEffect, useState} from "react";
import Access from "@/component/function/access";
import Style from "./style.module.sass";
import Element from "./element";
import Link from "next/link";

export default function List ({list,  account, accessAdd, accessEdit, accessDelete}) {
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

        Здесь список врачей
        {accessAdd ? <Link href={'/doctor/add'} className={'btn btn-primary'}>Добавить</Link> : null}

        {clientList.items.map((item, i) => {
            let accessElementEdit = Access(account, [item])
            let accessElementDelete = Access(account, [item])
            //if (accessEdit) accessElementEdit = accessEdit
            if (accessDelete) accessElementDelete = accessDelete

            return (
                <Element
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
