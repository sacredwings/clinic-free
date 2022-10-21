import React, {useState, useEffect} from 'react'
import {componentToPDFBuffer} from '../../../../../components/pdf'
import axios from "axios"
import Config from "../../../../../config.json";

export default function () {
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
    let dateText = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`

    return <>
        <p style={styleHeader}>Министерство здравоохранения и</p>
        <p style={styleHeader}>социального развития Российской Федерации</p>
        <p style={styleHeader}>ООО "Пульсар"</p>
        <p style={styleHeader}>_________________________________________</p>
        <p style={styleHeader}>(наименование медицинской организации)</p>
        <p style={styleHeader}>НСО  обл. г. Искитим ул. Комсомольская д.44 оф.1</p>
        <p style={styleHeader}>_________________________________________</p>
        <p style={styleHeader}>(адрес)</p>
        <p style={styleHeader}>Код ОГРН: 1    1	0	5	4	7	2	0	0	0	7	8	7</p>

        <br/>
        <br/>
        <br/>
        <br/>

        <h1 style={styleH1}>ЗАКЛЮЧЕНИЕ ПЕРИОДИЧЕСКОГО</h1>
        <h1 style={styleH1}>МЕДИЦИНСКОГО ОСМОТРА (ОБСЛЕДОВАНИЯ)</h1>

        <br/>
        <br/>


        <p style={styleText}>1. Даты выдачи заключения <b>{dateText}</b></p>
        <p style={styleText}>2. Фамилия, имя, отчество (при наличии) <b>{worker._user_id.last_name} {worker._user_id.first_name} {worker._user_id.patronymic_name}</b></p>
        <p style={styleText}>3. Дата рождения ________________ 4. Пол _______________</p>
        <p style={styleText}>5. Наименование работодателя</p>
        <p style={styleText}>6. Наименование структурного подразделения работодателя (при наличии)</p>
        <p style={styleText}>7. Должность (профессия) или вид работ</p>
        <p style={styleText}>8. Наименование вредного производственного фактора ( -ов) и (или) вида работ:</p>
        <p style={styleText}>9. Результаты периодического осмотра:</p>
        <br/>
        <p style={styleText}>Медицинские противопоказания к работе не выявлены:</p>
        <p style={styleText}>Группа здоровья: ____________________________________________________________</p>
        <br/>
        <p style={styleText}>Председатель врачебной комиссии _______________ / ________________</p>
        <p style={styleTextRight}>(подпись)	(Ф.И.О.)</p>
        <br/>
        <p style={styleText}>М.П. ЛПУ</p>

  </>
}

const GetById = async (id) => {
    const url = `${Config.server.url}/api/worker/getById`
    let fields = {
        params: {
            ids: id,
        }
    }
    let result = await axios.get(url, fields)
    return result.data.response
}

export async function getServerSideProps ({query, req, res}) {

    let worker = await GetById(query.id)
    let buffer = await componentToPDFBuffer({
        component: Page(worker.items[0]),
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