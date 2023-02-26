import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import cookie from '../util/cookie'

type auth = boolean
type _id = string | null
type login = string | null

type tokenId = string | null
type tokenKey = string | null
type remember = boolean

//Действия
interface typeAuth {
    _id: _id
    login: login
    tokenId: tokenId
    tokenKey: tokenKey
    remember: remember
}
interface typeLogin {
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
        //авторизация
        Auth(state, action: PayloadAction<typeAuth>) {
            cookie.set('tid=' + action.payload.tokenId, !action.payload.remember)
            cookie.set('token=' + action.payload.tokenKey, !action.payload.remember)

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
        Login(state, action: PayloadAction<typeLogin>) {
            return {
                ...state,
                auth: true,
                _id: action.payload._id,
                login: action.payload.login,
            }

        },
        //удление авторизации
        Logout(state) {
            cookie.clear('tid')
            cookie.clear('token')

            return {
                ...state,
                auth: false,
                tokenId: null,
                tokenKey: null,
            }
        }
    },
})

//Экспорт
export const { Auth, Login, Logout } = counterSlice.actions
export default counterSlice.reducer