import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from "axios";

function Price (props) {

    let [list, setList] = useState([])
    let [request, setRequest] = useState([])

    useEffect(async () => {
        await Get()
    }, [])

    const Get = async () => {
        const url = '/api/hf-org/priceGet';

        let result = await axios.get(url, {});

        result = result.data;

        setList(prev => ([...prev, ...result.response.items]))
        //console.log(result)
    }

    const List = (arList) => {
        return <div className="list-group">
            {arList.map((list, i) => {
                let href = `#`
                let price = " ? "
                if ((list.price[0]) && (list.price[0].price))
                    price = list.price[0].price
                return <Link to={href} key={i} className="list-group-item list-group-item-action">{list.name}
                    <span className="badge bg-secondary">{price}</span>
                </Link>
            })}
        </div>
    }

    return (
        <div>
            <h1>Прайс</h1>

            {(list.length) ? List(list) : null}
        </div>

    )
}

export default connect (
    state => ({
        myUser: state.myUser,
    }),
    dispatch => ({

    })
)(Price);

