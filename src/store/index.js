import { createStore, combineReducers } from '../redux';
import { history } from './modules/history'
import todoList from './modules/todoList'

export default createStore(
    history( // 操作结果的记录
        combineReducers({
            todoList
        })
    )
)