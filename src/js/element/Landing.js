import React, {} from 'react';
import {connect} from "react-redux";
import {BrowserRouter as Router, Route, Redirect, Switch, Link} from 'react-router-dom';

function Landing(props) {
    return (
        <div>
            <h1>О клинике</h1>
        </div>
    )
}

export default connect (
    state => ({
        myUser: state.myUser,
    }),
    dispatch => ({

    })
)(Landing);