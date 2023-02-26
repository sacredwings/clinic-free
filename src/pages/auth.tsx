import React, {useEffect, useState} from 'react'
import TemplatesMain from "../app/components/template/main"
import Auth from "../app/components/auth/auth"

export default function ({}) {
    return <TemplatesMain title={'Вход'} description={''}>
        <div className="auth">
            <div className="shadow p-3 mb-3 bg-white rounded">
                <Auth/>
            </div>
        </div>
    </TemplatesMain>
}


