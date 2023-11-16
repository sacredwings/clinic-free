'use client'

import Link from "next/link";
import React, {useEffect, useState} from "react";

export default function ({searchParams, url}) {
    let [form, setForm] = useState(searchParams.q)

    const onChangeText = (e) => {
        let name = e.target.id;
        let value = e.target.value;

        setForm(e.target.value)
    }

    return (
        <form>
            <div className="input-group input-group-sm mb-3">
                <input type="text" className="form-control" placeholder="Поисковая фраза ..." aria-label="Поисковая фраза ..." aria-describedby="button-addon2" onChange={onChangeText} value={form}/>
                <Link href={`${url}?${new URLSearchParams({...searchParams, q: form})}`} className="btn btn-secondary" type="button" id="button-addon2">Найти</Link>
            </div>
        </form>
    )
}