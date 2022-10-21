import React, {useEffect, useRef, useState} from 'react'
import axios from "axios"
import Modal from '../modal'

export default function Add () {
    const [modalShow, setModalShow] = useState(false) //модальное окно
    const [form, setForm] = useState({}) //модальное окно

    const handleModalClose = () => {
        setModalShow(false)
    }

    const OnClickModalShow = (file) => {
        setModalShow(true)
    }

    const onChangeText = (e) => {
        let name = e.target.id;
        let value = e.target.value;

        setForm(prev => ({
            ...prev, [name]: value
        }))
    }

    const OnClickAdd = async (e) => {
        e.preventDefault()

        const url = '/api/contract-type/add'

        let result = await axios.post(url, form);

        result = result.data;

        //setList(result.response.items)
        handleModalClose()
    }

    function ModalWindow() {
        let modalContent = <>
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">+ Тип договора</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleModalClose}></button>
            </div>
            <div className="modal-body">
                <form onSubmit={OnClickAdd}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Название</label>
                        <input type="text" className="form-control" id="name" aria-describedby="nameHelp" onChange={onChangeText}/>
                            <div id="nameHelp" className="form-text"></div>
                    </div>
                    <button type="submit" className="btn btn-primary">Добавить</button>
                </form>
            </div>
        </>
        return Modal({
            show: modalShow,
            content: modalContent
        })
    }

    return <div className={'Add'}>
        <button className="btn btn-success btn-sm" type="button" onClick={OnClickModalShow}> + Добавить тип договора</button>
        {ModalWindow()}
    </div>
}