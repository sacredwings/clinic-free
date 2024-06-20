// @ts-nocheck
import React, {useState, useEffect} from 'react'
import {componentToPDFBuffer} from '@/component/pdf'
import axios from "axios"
import Config from "../../../../../config.json";
import {ServerWorkerGetById} from "@/component/function/url_api";

export default function Pdf () {
    return <></>
}

const Page = (worker) => {
    let styleHeader = {
        width: '400px',
        textAlign: 'center',
        margin: 0,
        fontSize: '16px',
    }

    let styleH1 = {
        textAlign: 'center',
        margin: 0,
        fontSize: '20px',
    }

    let styleText = {
        paddingTop: '20px',
        margin: 0,
        fontSize: '16px',
    }
    let styleTextRight = {
        padding: 0,
        paddingLeft: '300px',
        margin: 0,
        fontSize: '16px',
    }

    let date = new Date()
    //let dateText = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
    let dateText = date.toLocaleDateString()

    return <>
        <p style={styleHeader}>Министерство здравоохранения и</p>
        <p style={styleHeader}>социального развития Российской Федерации</p>
        <p style={styleHeader}>ООО Пульсар</p>
        <p style={styleHeader}>_________________________________________</p>
        <p style={styleHeader}>(наименование медицинской организации)</p>
        <p style={styleHeader}>НСО обл. г. Искитим ул. Комсомольская д.44</p>
        <p style={styleHeader}>_________________________________________</p>
        <p style={styleHeader}>(адрес)</p>
        <p style={styleHeader}>Код ОГРН: 1 1 0 5 4 7 2 0 0 0 7 8 7</p>

        <br/>
        <br/>

        <h1 style={styleH1}>ЗАКЛЮЧЕНИЕ ПЕРИОДИЧЕСКОГО</h1>
        <h1 style={styleH1}>МЕДИЦИНСКОГО ОСМОТРА (ОБСЛЕДОВАНИЯ)</h1>

        <br/>
        <br/>

        <p style={styleText}>1. Даты выдачи заключения <b>{dateText}</b></p>
        <p style={styleText}>2. Фамилия, имя, отчество (при
            наличии) <b>{worker._user_id.last_name} {worker._user_id.first_name} {worker._user_id.second_name}</b></p>
        <p style={styleText}>3. Дата рождения <b>{new Date(worker._user_id.date_birth).toLocaleDateString()}</b> 4.
            Пол <b>{worker._user_id.man ? 'Мужской' : 'Женский'}</b></p>
        <p style={styleText}>5. Наименование работодателя <b>{worker._contract_id._org_id.name}</b></p>
        <p style={styleText}>6. Наименование структурного подразделения работодателя (при
            наличии): <b>{worker.subdivision}</b></p>
        <p style={styleText}>7. Должность (профессия) или вид работ: <b>{worker.profession}</b></p>
        <p style={styleText}>8. Наименование вредного производственного фактора ( -ов) и (или) вида
            работ: <b>{worker.hf_code ? worker.hf_code.join(', ') : ''}</b></p>
        <p style={styleText}>9. Результаты периодического осмотра:</p>

        {arDeleteAr(worker.hf_code, worker.contraindications) ?
            <p style={styleText}>Медицинские противопоказания к работе не
                выявлены: <b>{arDeleteAr(worker.hf_code, worker.contraindications)}</b></p> : null}

        {worker.contraindications ? <p style={styleText}>Имеет
            противопоказания: <b>{worker.contraindications.join(', ')}</b></p> : null}

        <p style={styleText}>Группа здоровья: <b>{worker.health_group}</b></p>

        {arVisitResult(worker._specialist_visit_ids) ?
            <p style={styleText}><b>{arVisitResult(worker._specialist_visit_ids)}</b></p> : null}

        {worker.re_hf ? <p style={styleText}>Переосвидетельствование через: <b>{worker.re_hf} месяцев</b></p> : null}

        <br/>
        <p style={styleText}>Председатель врачебной комиссии _______________ / ________________</p>
        <p style={styleTextRight}>(подпись) (Ф.И.О.)</p>
        <br/>
        <p style={styleText}>М.П. ЛПУ</p>
    </>
}

const arDeleteAr = (a, b) => {
    if (!a) return null
    if (!b) return a.join(', ')
    let c = a.filter(function (item) {
        return b.indexOf(item) === -1;
    });
    if (!c) return null
    return c.join(', ')
}

const arVisitResult = (arr) => {
    if (!arr) return null
    let newAr = []
    arr.forEach((item) => {
        if (item.result) newAr.push(item.result)
    })
    if (!newAr.length) return null
    return newAr.join(', ')
}

const GetById = async (id) => {
    let result = await ServerWorkerGetById({ids: [id]}, {cookies: null})
    return result
}

export async function getServerSideProps({query, req, res}) {

    let worker = await GetById(query.id)
    let buffer = await componentToPDFBuffer({
        component: Page(worker[0]),
        orientation: 'portrait'

    })

    // with this header, your browser will prompt you to download the file
    // without this header, your browse will open the pdf directly
    //res.setHeader('Content-disposition', 'attachment; filename="article.pdf');
    res.setHeader('Content-disposition', 'inline ; filename="article.pdf');

    // set content type
    res.setHeader('Content-Type', 'application/pdf');

    // output the pdf buffer. once res.end is triggered, it won't trigger the render method
    res.end(buffer);

    return {
        props: {
            worker: worker
        }
    }
}
