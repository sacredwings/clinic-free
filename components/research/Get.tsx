import React, {useState, useEffect} from 'react'
import axios from "axios"
import Add from "./Add"

function Get ({selectHf, module}) {

    let [list, setList] = useState([])
    let [edit, setEdit] = useState(null)
    let [listCheck, setListCheck] = useState([])
    let [selectHfId, setSelectHfId] = useState([])

    //загрузка списка
    useEffect(() => {
        (async () => {
            await Get()
        })()
    }, [])

    useEffect(() => {
        (async () => {
            //фактор выбран
            if (selectHf) {
                if (!selectHf) return false
                if (!list) return false
                setSelectHfId(selectHf._id)

                await ListCheck(list, selectHf.research_ids)
            } else {
                await ListCheck(list, '')
            }

        })()
    }, [selectHf, list])

    //чеки для списка
    const ListCheck = async (list, hfList) => {
        if (!hfList) hfList=[]
        let newList = list.map((elementList, i) => {
            for (let hf of hfList) {
                if (elementList._id === hf)
                    return {
                        checked: true,
                        _id: elementList._id,
                        name: elementList.name,
                        _price: elementList._price
                    }
            }

            return {
                checked: false,
                _id: elementList._id,
                name: elementList.name,
                _price: elementList._price
            }

        })

        setListCheck(newList)
    }

    //список договоров
    const Get = async () => {
        const url = '/api/research/get'

        let result = await axios.get(url)

        setList(result.data.response.items)
    }

    //список договоров
    const Update = (id) => {
        const url = '/api/research/update-hf'

        let arFields = {
            hf_id: selectHfId,
            id: id,
            module: module
        }

        let result = axios.post(url, arFields)
    }

    //изменение чеков
    const OnChangeCheck = (id) => {
        let newListCheck = listCheck.map((element, i) => {
            if (element._id === id)
                element.checked = !element.checked

            return element
        })

        setListCheck(newListCheck)

        Update(id)
    }

    //изменение полей ввода елемента
    const OnChange = (e, elementId) => {
        let name = e.target.id
        let value = e.target.value

        if (name === 'price') value = value.replace(/[^0-9]/g, '')

        setEdit(prev=>({...prev, [name]: value}))
    }

    //отображение списка
    const List = (arList) => {
        return <table className="table">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Иследование</th>
                <th scope="col">Цена</th>
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
            <th scope="row">{i+1}</th>
            <td>
                {selectHf ?
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" checked={element.checked} onChange={()=>{OnChangeCheck(element._id)}}/>
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            {element.name}
                        </label>
                    </div> :
                    element.name
                }

            </td>
            <td>{price ? <><b>{price}</b> руб.</> : ''}</td>
            <td>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-primary" onClick={()=>{setEdit({
                        id: element._id,
                        name: element.name,
                        price: price
                    })}}>Изменить</button>
                </div>
            </td>
        </tr>
    }

    //изменение элемента
    const OnSave = async () => {
        //сохранение в базе
        const url = '/api/specialist/update'
        let arFields = {
            id: edit.id,
            name: edit.name
        }
        if (edit.price) arFields.price = edit.price

        let result = await axios.post(url, arFields)

        //изменение в форме
        let newListCheck = listCheck.map((element, i) => {
            if (element._id !== edit.id) return element

            element.name = edit.name
            if (edit.price) {
                if (element._price)
                    element._price.price = edit.price
                else
                    element._price = {price: edit.price}
            }

            return element
        })

        setListCheck(newListCheck)
        setEdit(null)
    }

    const ElementEdit = (i, element) => {
        let price = ''
        if (element._price) price = element._price.price
        return <tr key={i}>
            <th scope="row">{i}</th>
            <td>
                <input type="text" className="form-control" id="name" onChange={(e)=>{OnChange(e, element._id)}} value={edit.name}/>
            </td>
            <td>
                <input type="text" className="form-control" id="price" onChange={(e)=>{OnChange(e, element._id)}} value={edit.price}/>
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

    //удаление улемента
    const OnDelete = async () => {
        const url = '/api/specialist/delete'
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

    return (
        <>
            <Add />
            {(list.length) ? List(listCheck) : null}
        </>

    )
}

export default Get

