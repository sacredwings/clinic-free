import React, {useState, useEffect} from 'react'
import axios from "axios"
import Add from './Add'

function Get (props) {

    let [list, setList] = useState([])
    let [edit, setEdit] = useState(null)

    //загрузка списка
    useEffect(() => {
        (async () => {
            await Get()
        })()
    }, [])

    //список договоров
    const Get = async () => {
        const url = '/api/hf/get'

        let result = await axios.get(url)

        setList(result.data.response.items)
    }

    //изменение полей ввода елемента
    const OnChange = (e, elementId) => {
        let name = e.target.id
        let value = e.target.value

        setEdit(prev=>({...prev, [name]: value}))
    }

    //изменение элемента
    const OnSave = async () => {
        //сохранение в базе
        const url = '/api/hf/update'
        let arFields = {
            id: edit.id,
            code: edit.code,
            name: edit.name
        }
        let result = await axios.post(url, arFields)

        //изменение в форме
        let newList = list.map((element, i) => {
            if (element._id !== edit.id) return element

            element.code = edit.code
            element.name = edit.name

            return element
        })

        setList(newList)
        setEdit(null)
    }

    //удаление улемента
    const OnDelete = async () => {
        const url = '/api/hf/delete'
        let arFields = {
            id: edit.id
        }
        let result = await axios.post(url, arFields)

        let newList = []
        list.forEach(function(item, i, arr) {
            if (item._id !== edit.id)
                newList.push(item)
        })
        setList(newList)
    }

    //отображение списка
    const List = (arList) => {
        return <table className="table">
            <thead>
            <tr>
                <th scope="col">Код</th>
                <th scope="col">Название</th>
                <th scope="col">Действия</th>
            </tr>
            </thead>
            <tbody>
            {arList.map((list, i) => {
                if ((edit) && (edit.id === list._id))
                    return ElementEdit(i, list)
                else
                    return Element(i, list)
            })}
            </tbody>
        </table>
    }

    const Element = (i, element) => {
        let price = ''
        if (element._price) price = element._price.price
        return <tr key={i}>
            <th scope="row">{element.code}</th>
            <td onClick={()=>{props.SelectHf(element)}}>
                {element.name}
            </td>
            <td>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-primary" onClick={()=>{setEdit({
                        id: element._id,
                        code: element.code,
                        name: element.name
                    })}}>Изменить</button>
                </div>
            </td>
        </tr>
    }

    const ElementEdit = (i, element) => {
        let price = ''
        if (element._price) price = element._price.price
        return <tr key={i}>
            <th scope="row">
                <input type="text" className="form-control" id="code" onChange={(e)=>{OnChange(e, element._id)}} value={edit.code}/>
            </th>
            <td>
                <input type="text" className="form-control" id="name" onChange={(e)=>{OnChange(e, element._id)}} value={edit.name}/>
            </td>
            <td>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-primary" onClick={()=>setEdit(null)}>Отмена</button>
                    <button type="button" className="btn btn-primary" onClick={OnSave}>Сохранить</button>
                    <button type="button" className="btn btn-danger" onClick={OnDelete}>Удалить</button>
                </div>
            </td>
        </tr>
    }

    /*
    const List = (arList) => {
        return <div className="list-group">
            {arList.map((list, i) => {
                return <button type="button" className="list-group-item list-group-item-action" key={i} onClick={()=>{props.SelectHf(list)}}>{list.name}</button>
            })}
        </div>
    }
*/

    return (
        <>
            <Add/>
            {(list.length) ? List(list) : null}
        </>

    )
}

export default Get

