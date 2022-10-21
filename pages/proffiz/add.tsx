import React, {useState, useEffect} from 'react'
import axios from "axios"
import TemplatesMain from "../../components/template/main"
import WorkerAdd from "../../components/worker/add"

export default function () {
    return <TemplatesMain title={'Главная страница'}>
        <WorkerAdd contract_id={null}/>
    </TemplatesMain>
}
