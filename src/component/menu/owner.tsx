// @ts-nocheck
'use client'

import Link from "next/link"
import { useSelectedLayoutSegment } from 'next/navigation';
import React from "react";

export default function Menu ({owner}) {

    let pageOwner = 'user'
    if (owner.title) pageOwner = 'group'
    const segment = useSelectedLayoutSegment()

    //let owner = await ServerOwnerGetById({owner: pageOwner, id: id},{cookies: cookies()})
    //const access = (owner.status) ? owner.status.access : false

    let classNameActive = "nav-link active"
    let className = "nav-link"

    return (
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <Link className={(segment === null) ? classNameActive : className} aria-current="page" href={`/${pageOwner}/${owner._id}`}>Профиль</Link>
            </li>
            <li className="nav-item">
                <Link className={(segment === 'video') || (segment === 'video-album') ? classNameActive : className} aria-current="page" href={`/${pageOwner}/${owner._id}/video-album`}>Видео</Link>
            </li>
            <li className="nav-item">
                <Link className={(segment === 'article') || (segment === 'article-album') ? classNameActive : className} href={`/${pageOwner}/${owner._id}/article-album`}>Сайт</Link>
            </li>
            <li className="nav-item">
                <Link className={(segment === 'topic') || (segment === 'topic-album') ? classNameActive : className} href={`/${pageOwner}/${owner._id}/topic`}>Форум</Link>
            </li>
        </ul>
    )
}