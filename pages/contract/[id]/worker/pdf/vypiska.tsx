import React, {useState, useEffect} from 'react'
import {componentToPDFBuffer} from '../../../../../components/pdf'
import axios from "axios"
import Config from "../../../../../config.json";

export default function () {
    return <></>
}

const Page = () => {
    let stylePage1 = {
        position: 'absolute',
        width: '100%'
    }
    let stylePage2 = {
        top: '700px',
        position: 'absolute',
        width: '100%'
    }
    let styleRow = {
        overflow: 'hidden'
    }
    let styleColLeft = {
        width: '50%',
        float: 'left'
    }
    let styleColRight = {
        width: '50%',
        float: 'right'
    }

    let styleTable = {
        borderSpacing: '0px',
        borderCollapse: 'collapse',
        width: '90%'
    }
    let styleTableTd = {
        border: '1px solid black',
        fontSize: '16px'
    }

    let styleHeader = {
        margin: 0,
        fontSize: '16px',
        textAlign: 'center',
    }
    let styleHeaderBold = {...styleHeader,
        fontWeight: 'bold'
    }

    let styleText1 = {
        paddingTop: '15px',
        fontWeight: 'bold',
        margin: 0,
        fontSize: '16px',
    }
    let styleText2 = {
        marginTop: '5px',
        fontSize: '16px',
    }
    let styleText3 = {
        marginTop: '5px',
        fontSize: '16px',
    }
    return <>
        <p style={styleText2}>10. Результаты функциональных исследований</p>
        <div style={stylePage1}>
            <div style={styleRow}>
                <div style={styleColLeft}>
                    <table style={styleTable}>
                        <tr>
                            <td style={styleTableTd}>Наименование</td>
                            <td style={styleTableTd}>Дата</td>
                            <td style={styleTableTd}>Заключение</td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>ЭКГ</td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>ФЛГ</td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>Маммография</td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>Спирометрия</td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>Вибрационная чувствительность</td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>Пульсоксиметрия</td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>Пульсоксиметрия</td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>УЗИ органов малого таза</td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>УЗИ органов брюшной полости</td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>ФГДС</td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                        </tr>
                    </table>
                    <br/>
                    <p style={styleText1}>11. ЗАКЛЮЧЕНИЕ</p>
                    <p style={styleText3}>Абсолютный ССР:  низкий,  умеренный,  высокий,  очень высокий</p>
                    <p style={styleText3}>Относительный ССР:  низкий,  умеренный,  высокий,  очень высокий</p>
                    <p style={styleText3}>Группа здоровья: 	1	2	3а	3б</p>
                    <p style={styleText3}>Противопоказания к работе: 	не выявлены		выявлены</p>
                    <p style={styleText3}>___________________________________________________________</p>
                    <br/>
                    <p style={styleText1}>РЕКОМЕНДАЦИИ</p>
                    <p style={styleText3}>___________________________________________________________</p>
                    <p style={styleText3}>___________________________________________________________</p>
                </div>
                <div style={styleColRight}>
                    <br/>
                    <br/>
                    <p style={styleHeaderBold}>Министерство здравоохранения и социального развития</p>
                    <p style={styleHeaderBold}>Российской Федерации</p>
                    <br/>
                    <p style={styleHeaderBold}>ООО «ПУЛЬСАР»</p>
                    <p style={styleHeaderBold}>633208, г. Искитим, ул. Комсомольская, 44</p>
                    <br/>
                    <br/>
                    <p style={styleHeaderBold}>ВЫПИСКА ИЗ АМБУЛАТОРНОЙ КАРТЫ</p>
                    <p style={styleHeader}>«__»____________ 20__г.</p>
                    <p style={styleHeader}>(дата оформления)</p>

                    <br/>
                    <br/>

                    <p style={styleText2}>1. Фамилия Имя Отчество _______________________________________</p>
                    <p style={styleText2}>2. Пол:	М	Ж	3. Дата рождения __________________________________</p>
                    <p style={styleText2}>4. Адрес регистрации по месту жительства _________________________</p>
                    <p style={styleText2}>______________________________________________________________</p>
                    <p style={styleText2}>5. Наименование работодателя ___________________________________</p>
                    <p style={styleText2}>6. Профессия __________________________________________________</p>
                </div>
            </div>
        </div>
        <div style={stylePage2}>
            <div style={styleRow}>
                <div style={styleColLeft}>
                    <p style={styleText2}>7. Показатели состояния здоровья</p>

                    <table style={styleTable}>
                        <tr>
                            <td style={styleTableTd}>Рост</td>
                            <td style={styleTableTd}></td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>Вес</td>
                            <td style={styleTableTd}></td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>ИМТ</td>
                            <td style={styleTableTd}></td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>Окружность талии</td>
                            <td style={styleTableTd}></td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>Внутриглазное давление</td>
                            <td style={styleTableTd}></td>
                        </tr>
                    </table>

                    <br/>
                    <p style={styleText2}>8. Заключение врачей специалистов</p>

                    <table style={styleTable}>
                        <tr>
                            <td style={styleTableTd}>Врач</td>
                            <td style={styleTableTd}>Дата осмотра</td>
                            <td style={styleTableTd}>Заключение</td>
                            <td style={styleTableTd}>Подпись</td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>Терапевт<br/><br/></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>Психиатр<br/><br/></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>Нарколог<br/><br/></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>Гинеколог<br/><br/></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>Офтальмолог<br/><br/></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>Отоларинголог<br/><br/></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>Невролог<br/><br/></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>Дерматолог<br/><br/></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>Хирург<br/><br/></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>Стоматолог<br/><br/></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                        </tr>
                    </table>
                </div>
                <div style={styleColRight}>
                    <p style={styleText2}>9. Результаты лабораторных исследований</p>

                    <table style={styleTable}>
                        <tr>
                            <td style={styleTableTd}>Наименование показателя</td>
                            <td style={styleTableTd}>Дата</td>
                            <td style={styleTableTd}>Значение</td>
                            <td style={styleTableTd}>Норма</td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>Клинический анализ крови</td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>-гемоглобин</td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}>120-160</td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>лейкоциты</td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}>4.0-9.0</td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>-тромбоциты</td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}>150-450</td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>-СОЭ</td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}>15</td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>-эритроциты</td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}>3.5-5.5</td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>-ретикулоциты</td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>Биохимический анализ крови</td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>-сахар крови</td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}>3.9-6.0</td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>-холестерин</td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}>&#60; 6.2</td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>-билирубин</td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}>&#60; 20.5</td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>-АЛТ</td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}>&#60; 18</td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>-АСТ</td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}>&#60; 22</td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>-карбоксигемоглобин</td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}>&#60; 10</td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>-Гепатит В, С</td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}>отриц</td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>-ВИЧ</td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}>отриц</td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>-РНГА</td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}>отриц</td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>-сифилис</td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}>отриц</td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>Клинический анализ мочи</td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>-удельный вес</td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>-белок</td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}>до 0/033</td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>-сахар</td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}>отриц</td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>-лейкоциты</td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}>0-5</td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>-эритроциты</td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}>0-3</td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>Мазок на стафилококк</td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}>отриц</td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>Мазок на дизгруппу</td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}>отриц</td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>Кал на гельминты</td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}>отриц</td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>Мазок на онкоцитологию</td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>Мазок на микрофлору</td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>-лейкоциты</td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>-лейкоциты</td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}>3.9-6.0</td>
                        </tr>
                        <tr>
                            <td style={styleTableTd}>Химико-токсилокологическое исследование (ХТИ)</td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}></td>
                            <td style={styleTableTd}>&#60; 6.2</td>
                        </tr>
                    </table>

                </div>
            </div>
        </div>
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
        orientation: 'landscape'

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