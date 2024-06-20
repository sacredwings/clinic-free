// @ts-nocheck
'use client'
import React, {useState, useEffect} from 'react'
import MinioFileViewer from "@/component/file/viewer";
import {FileAdd, ServerVideoEdit} from "@/component/function/url_api";
import AlbumCheckList from "@/component/album/checkList";

export default function VideoId ({object, accessEdit}) {
    let [form, setForm] = useState(object)
    let [edit, setEdit] = useState(false)
    let [formLoad, setFormLoad] = useState({
        processBarLoaded: 0,
        processBarTotal: 0,
        processBar: 0
    })

    const onFormSubmit = async (e) => {
        if (e) e.preventDefault() // Stop form submit

        let arFields = {
            id: form._id,

            image_id: form.image_id,
            title: form.title,
            description: form.description,

            album_ids: form.album_ids,
        }
        let result = await ServerVideoEdit(arFields);

        setEdit(false)
    }

    //добавление файла и получение его по id
    const onChangeFiles = async (e) => {
        //загружаю
        let arResult = await FileAdd({
            module: 'video',
            object_id: form._id,
            files: e.target.files,
            FormLoad: setFormLoad,
            user_id: form.to_user_id,
            group_id: form.to_group_id,

        })

        //нет загруженных файлов - не продолжаем их добавлять
        if (!arResult) return false

        //получаю всю инфу о файле
        //arIds = await FileGet (arIds)

        setForm(prev => ({
            ...prev, ['image_id']: arResult[0]._id
        }))
    }

    //получаем результат выбранных альбомов от checked
    const ChangeSelectAlbums = (arSelectAlbums) => {
        setForm(prev => ({...prev, album_ids: arSelectAlbums}))
    }

    const onChangeText = (e) => {
        let name = e.target.id;
        let value = e.target.value;

        setForm(prev => ({
            ...prev, [name]: value
        }))
    }

    const Form = () => {
        return <form onSubmit={onFormSubmit}>
            <div className="mb-3">
                <label htmlFor="image_id" className="form-label">Изображение</label>
                <input className="form-control form-control-sm" id="image_id" type="file" onChange={onChangeFiles}
                       accept="image/gif, image/png, image/jpeg"/>
            </div>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Название</label>
                <input type="text" className="form-control" id="title" placeholder="Название"
                       value={form.title} onChange={onChangeText}/>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Краткое описание</label>
                <textarea className="form-control" id="description" rows="3" value={form.description}
                          onChange={onChangeText}></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="" className="form-label">Альбомы</label>
                {/* checked массив альбомов */}
                <AlbumCheckList albums={form.album_ids ? form.album_ids : []} module={'video'}
                                userId={form.to_user_id} groupId={form.to_group_id}
                                func={ChangeSelectAlbums}/>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => {
                    setEdit(false)
                }}>Отмена
                </button>
                <button type="submit" className="btn btn-primary btn-sm">Сохранить</button>
            </div>
        </form>
    }

    const View = () => {
        return (
            <>
                <div className="card">
                    <div className="card-body">
                        <h1>{form.title}</h1>
                        {accessEdit && !edit ? <button type="button" className="btn btn-outline-secondary btn-sm"
                                                       onClick={() => setEdit(!edit)}><i className="fas fa-edit"></i>...
                        </button> : null}
                    </div>
                </div>

                <MinioFileViewer file={form} attributes={{controls: true}}
                                 style={{marginTop: '10px', width: '100%', borderRadius: '5px'}}/>
            </>
        )
    }

    return (
        <>
            { edit && accessEdit ? Form() : View() }

        </>
    )
}
