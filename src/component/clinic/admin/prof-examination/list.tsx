// @ts-nocheck
'use client'
import React, {useEffect, useState} from "react";
import Access from "@/component/function/access";
import Style from "./style.module.sass";
import Element from "./element";
import Add from "./add";
import Link from "next/link";
import ProfExaminationElement from "@/component/clinic/admin/prof-examination/element";

export default function ProfExaminationList ({list, clinic_id, org_id, contract_id}) {

    const List = () => {
        return <div className="list-group">
            {list.map((item, i) => {
                return <ProfExaminationElement key={i} element={item} clinic_id={clinic_id}/>
            })}
        </div>
    }

    const NoList = () => {
        return <div className="alert alert-warning" role="alert">
            Проф. осмотров нет
        </div>
    }

    return (
        <>
            <h1>Проф. осмотр </h1>

            {contract_id ?
                <Link type="button" className="btn btn-outline-success" href={`/clinic/${clinic_id}/admin/prof-examination/add?contract_id=${contract_id}`}>Добавить проф. осмотр + </Link> :
                <div className="alert alert-warning" role="alert">
                    Выберите договор, чтобы <b>добавить</b> проф. осмотр
                </div>}

            {(list.length) ? List() : NoList()}
        </>
    )

}
