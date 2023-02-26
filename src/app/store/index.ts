//одиночные редьюсеры
import myUserReducer from './myUser'

//объединение редьюсеров
import { combineReducers } from 'redux'

//типизированный редьюсер
import { configureStore } from '@reduxjs/toolkit'

const reducer = combineReducers({
    myUser: myUserReducer
})

//вывод типизированного редьюсера
const store = configureStore({reducer: reducer})
export default store

//вывод типов
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch