import React, {useState, useEffect} from 'react'
import axios from "axios"
import TemplatesMain from "../../app/components/template/main"
import WorkerAdd from "../../app/components/worker/add"

export default function () {
    return <TemplatesMain title={'Главная страница'}>
        <WorkerAdd contract_id={null} worker_id={null}/>
    </TemplatesMain>
}
