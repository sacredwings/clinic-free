// @ts-nocheck
'use client'
import React, {useState, useEffect} from 'react'
import Hf from "@/component/hf/list";
import RoleAdd from "@/component/role/add";
import RoleElement from "@/component/role/element";
import { accessList } from "@/component/role/function";
import Element from "@/component/role/element";
import {ServerRoleEdit} from "@/component/function/url_api";

export default function List ({list}) {

    let [selectRole, setSelectRole] = useState(null)
    let [clientAccessList, setClientAccessList] = useState(CheckView(accessList, selectRole))

    //загрузка списка
    useEffect( () => {
        (async () => {
            console.log(selectRole)
            if (selectRole) await OnSave()
        })()
    }, [selectRole])

    const OnChangeCheck = async (access) => {
        //if (!access || !access.length) access = []
        let newSelectRole = []
        selectRole.access.forEach((item, i)=>{
            if (item !== access) newSelectRole.push(item)
        })

        if (selectRole.access.indexOf( access ) === -1) {
            setSelectRole(prevState => ({
                ...prevState, access: [...new Set([...prevState.access, ...[access]])]
            }))
        }
        else {
            setSelectRole(prevState => ({
                ...prevState, access: newSelectRole
            }))

        }


        /*
        newAccess = new Set(newAccess)
        setSelectRole(prevState => ({
            ...prevState, access: newAccess
        }))*/

            /*
        setSelectRole(prevState => ({
            ...prevState, access: [... new Set([...prevState.access, ...[access]])]
        }))*/


    }

    const OnSave = async () => {
        let arFields = {
            id: selectRole._id,
            name: selectRole.name,
            access: selectRole.access,
        }
        await ServerRoleEdit(arFields)

    }

    return <div className="row">
        <div className="col-6">
            Роли

            <RoleAdd/>
            <ul className="list-group list-group-flush">
            {list.items.map((item, i) => {
                if (!item.access) item.access = []
                return <Element key={i} element={item} setSelectRole={setSelectRole}/>
            })}
            </ul>
        </div>
        <div className="col-6">
            Доступ


            {selectRole ? <ul className="list-group list-group-flush">
                {clientAccessList.map((item, i) => {
                    return <div className="mb-3 form-check" key={i}>
                        <input type="checkbox" className="form-check-input" id={item.access} checked={item.checked ? true : false} onChange={()=>{OnChangeCheck(item.access)}}/>
                        <label className="form-check-label" htmlFor={item.access}>{item.name}</label>
                    </div>
                })}
            </ul> : null}

        </div>
    </div>
}

function CheckView (accessList, selectRole) {

    let newArr = accessList.map((itemAccessList, i)=>{
        if (!selectRole) {
            itemAccessList.checked = false
        }
        else {
            if (selectRole.access && selectRole.access.length)
                for (let item of selectRole.access) {

                    if (itemAccessList.access === item) {
                        itemAccessList.checked = true
                        return
                    }

                    itemAccessList.checked = false

                }
            else itemAccessList.checked = false
        }
        return itemAccessList

    })

    return newArr
}