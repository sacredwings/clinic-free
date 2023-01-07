import React, {useEffect, useState} from 'react'
import TemplatesMain from "../components/template/main"
import Auth from "../components/auth/auth"

export default function ({}) {
    return <TemplatesMain title={'Вход'} description={''}>
        <div className="auth">
            <div className="shadow p-3 mb-3 bg-white rounded">
                <Auth/>
            </div>
        </div>
    </TemplatesMain>
}


