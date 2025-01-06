// @ts-nocheck
'use client'
import React, {useEffect, useState} from "react"
import Style from "./style.module.sass";
import RoleElement from "@/component/clinic/edit/role/element";
import Link from "next/link";
//import Modal from '@/component/modal/default'
import RadioButtonGroup from "@/component/element/RadioButtonGroup";

export default function RoleList ({clinic, listPermission, listRole, account, accessView, accessAdd, accessEdit, accessDelete}) {
    let [clientList, setClientList] = useState(listRole)

    useEffect(() => {
        (async () => {
            setClientList(listRole)
        })()
    }, [listRole])

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

    const Content = () => {
        return (
            <form onSubmit={onFormSubmit} className="p-3">
                <div className="card m-3">

                    <div className="card-body">

                        <h2>Основное</h2>
                        <div className="mb-3 row">
                            <label htmlFor="title" className="col-sm-2 col-form-label">Название</label>
                            <div className="col-sm-10"><input type="text" className="form-control" id="title"
                                                              value={form.title} onChange={onChangeText}/></div>
                        </div>

                        <RadioButtonGroup/>

                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary btn-sm">
                                Добавить
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }

    return <div className={Style.cardContainer}>

        {accessAdd ? <Link href={`/clinic/${clinic._id}/edit/role/add`}> + добавить </Link> : null}

        {listRole.items.map((item, i) => {
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
