// @ts-nocheck
'use client'

import Styles from './style.module.sass'
import React from "react";

export default function Modal ({children, Close, title=''}) {
    const style = {
        display: 'block',
        backgroundColor: 'rgba(0,0,0,0.7)'
    }

    return (
        <div className="modal" tabIndex="-1"  style={style}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={Close}
                                aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}