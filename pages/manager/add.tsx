import React, {useEffect, useState} from 'react'
import TemplatesMain from "../../components/template/main"
import Add from "../../components/manager/add"

export default function ({}) {
    return <TemplatesMain title={'Вход'} description={''}>
        <div className="auth">
            <div className="shadow p-3 mb-3 bg-white rounded">
                <Add/>
            </div>
        </div>
    </TemplatesMain>
}


