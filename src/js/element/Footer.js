import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

function Footer (props) {
    return (
        <footer className="footer p-3">
            <div className="container">
                <div className="row">
                    <div className="col-md-auto col-sm-12">
                        @ClinicFree 2021
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default connect (
    state => ({
        myUser: state.myUser,
    }),
    dispatch => ({

    })
)(Footer);

