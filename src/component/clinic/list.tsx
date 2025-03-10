// @ts-nocheck
'use client'
import React, {useEffect, useState} from "react";
import Access from "@/component/function/access";
import Style from "./style.module.sass";
import Element from "./element";
import Add from "./add";
import Link from "next/link";

export default function List ({list,  account, accessAdd, accessEdit, accessDelete, userId, groupId}) {
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

    return <div>

        <div className={"publicBlock"}>
            {accessAdd ? <Link href={'/clinic/add'} className={'btn btn-primary'}>Добавить</Link> : null}
        </div>

        <div className={"publicBlock"}>
            <div className={"publicContainer"}>
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
        </div>

    </div>

}
