// @ts-nocheck
'use client'
import React, {useEffect, useRef, useState} from 'react'
import {ServerGigtestUser} from '@/component/function/url_api'

export default function UserSynchronizationButton (worker_id) {
    const [modalShow, setModalShow] = useState(false) //модальное окно
    const [form, setForm] = useState({}) //модальное окно


    const OnClick = async (e) => {
        await ServerGigtestUser(worker_id)
    }

    return <button className="btn btn-success btn-sm" type="button" onClick={OnClick}>Gigtest</button>
}
