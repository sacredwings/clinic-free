"use client"

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import cookie from '@/utility/cookie'

type auth = boolean
type _id = string | null
type login = string | null
type tokenId = string | null
type tokenKey = string | null
type remember = boolean

//Действия

interface typeAuthUpdate {
    _id: _id
    login: login
}

interface typeAuthSet {
    _id: _id
    login: login

    tokenId: tokenId
    tokenKey: tokenKey
    remember: remember
}
interface typeAuthGet {
    _id: _id
    login: login
}

//Состояние
interface typeState {
    auth: auth

    _id: _id
    login: login

    tokenId: tokenId
    tokenKey: tokenKey
}
const initialState = {
    auth: false,
    _id: null,
    login: null,

    tokenId: null,
    tokenKey: null
} as typeState

//Действия
const counterSlice = createSlice({
    name: 'myUser',
    initialState,
    reducers: {
        AuthUpdate(state, action: PayloadAction<typeAuthUpdate>) {
            return {
                ...state,
                auth: true,
                _id: action.payload._id,
                login: action.payload.login,
            }
        },
        //авторизация
        AuthSet(state, action: PayloadAction<typeAuthSet>) {
            cookie.set('tid=' + action.payload.tokenId, !action.payload.remember)
            cookie.set('tkey=' + action.payload.tokenKey, !action.payload.remember)

            return {
                ...state,
                auth: true,
                _id: action.payload._id,
                login: action.payload.login,

                tokenId: action.payload.tokenId,
                tokenKey: action.payload.tokenKey
            }
        },
        //получение авторизации
        AuthGet(state, action: PayloadAction<typeAuthGet>) {
            return {
                ...state,
                auth: true,
                _id: action.payload._id,
                login: action.payload.login,
            }

        },
        //удление авторизации
        AuthDel(state) {
            cookie.clear('tid')
            cookie.clear('tkey')

            return {
                ...state,
                auth: false,
                _id: null,
                login: null,

                tokenId: null,
                tokenKey: null
            }
        }
    },
})

//Экспорт
export const { AuthSet, AuthGet, AuthDel, AuthUpdate } = counterSlice.actions
export default counterSlice.reducer