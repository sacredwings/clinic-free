import React, {useState, useEffect} from 'react'
import axios from "axios"
import TemplatesMain from "../../../app/components/template/main"
import WorkerAdd from "../../../app/components/worker/add"

export default function ({id}) {
    return <TemplatesMain title={'Главная страница'}>
        <WorkerAdd contract_id={null} worker_id={id}/>
    </TemplatesMain>
}

export async function getServerSideProps ({query, req}) {
    return {
        props: {
            id: query.id
        }
    }
}