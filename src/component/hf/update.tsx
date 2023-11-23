import React, {useState, useEffect} from 'react'
import axios from "axios";

function Get (props) {

    let [list, setList] = useState([])
    let [newName, setNewName] = useState('')

    useEffect(async () => {
        await Get()
    }, [])

    //список
    const Get = async () => {
        const url = '/api/hf/get'
        let result = await axios.get(url)
        result = result.data
        setList(result.response.items)
    }

    const OnSave = async (element) => {
        const url = '/api/hf/update'
        let arFields = {
            id: element._id,
            name: element.name
        }
        let result = await axios.post(url, arFields)
        await OnChecked(false, element)
    }
    const OnDelete = async (id) => {
        const url = '/api/hf/delete'
        let arFields = {
            id: id
        }
        let result = await axios.post(url, arFields)

        let newList = []
        list.forEach(function(item, i, arr) {
            if (item._id !== id)
                newList.push(item)
        })
        setList(newList)
    }

    const OnChecked = async (checked, element) => {
        let newList = list.map(function(item, i, arr) {
            if (item._id === element._id) {
                item.name = element.name
                item.checked = checked
            }

            return item
        })
        setList(newList)
    }
    const OnChange = async (e, id) => {
        let newList = list.map(function(item, i, arr) {
            if (item._id === id) {
                item.name = e.target.value
            }

            return item
        })
        setList(newList)
    }

    //отображение списка
    const List = (arList) => {
        return arList.map((list, i) => {
            if (!list.checked)
                return Element(i, list)
            else
                return Form(i, list)
        })
    }

    const Element = (i, element) => {
        return <tr key={i}>
            <th scope="row">{i}</th>
            <td>{element.name}</td>
            <td>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-primary" onClick={()=>OnChecked(true, element)}>Изменить</button>
                    <button type="button" className="btn btn-primary" onClick={()=>{OnDelete(element._id)}}>Удалить</button>
                </div>
            </td>
        </tr>
    }
    const Form = (i, element) => {
        return <tr key={i}>
            <th scope="row">{i}</th>
            <td>
                <input type="text" className="form-control" id="name" onChange={(e)=>{OnChange(e, element._id)}} value={element.name}/>
            </td>
            <td>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-primary" onClick={()=>OnChecked(false, element)}>Отмена</button>
                    <button type="button" className="btn btn-primary" onClick={()=>OnSave(element)}>Сохранить</button>
                </div>
            </td>
        </tr>
    }

    const OnAdd = async (e) => {
        e.preventDefault() // Stop form submit

        const url = '/api/hf/add'
        let arFields = {
            name: newName
        }
        let result = await axios.post(url, arFields)
        if (!result.data.response) return false

        setList(prevState => [...prevState, ...[result.data.response]])
    }

    return (
        <>
            <form>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Название" aria-label="Название" aria-describedby="button" value={newName} onChange={(e)=>{setNewName(e.target.value)}}/>
                    <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Добавить</button>
                </div>
            </form>

            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Название</th>
                    <th scope="col">Действия</th>
                </tr>
                </thead>
                <tbody>
                {(list.length) ? List(list) : null}
                </tbody>
            </table>

            <form onSubmit={OnAdd}>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Название" aria-label="Название" aria-describedby="button" value={newName} onChange={(e)=>{setNewName(e.target.value)}}/>
                        <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Добавить</button>
                </div>
            </form>
        </>

    )
}

export default Get

