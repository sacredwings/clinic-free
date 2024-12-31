// @ts-nocheck
'use client'
import React, {useEffect, useState} from "react"
import Style from "./style.module.sass";
import RoleElement from "@/component/clinic/edit/role/element";
import Link from "next/link";

export default function RoleList ({clinic, list, account, accessView, accessAdd, accessEdit, accessDelete}) {
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

        {accessAdd ? <Link href={`/clinic/${clinic._id}/admin/role/add`}> + добавить </Link> : null}

        {clientList.items.map((item, i) => {
            return (
                <RoleElement
                    key={item._id}
                    element={item}

                    accessDelete={accessDelete}

                    ElementDelete={ElementDelete}
                />
            )
        })}

    </div>

}
