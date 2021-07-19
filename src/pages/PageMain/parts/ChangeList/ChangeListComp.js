import React, {useEffect, useState} from "react";
import style from "./ChangeListStyl.module.css";
//import {getTodo} from "../../../PageAdmin/parts/TodoList/TodoListActions";
import {ChangeElementComp} from "../ChangeElement/ChangeElementComp";
import {getNews} from "./ChangeListActions";

export const ChangeListComp = props => {
    const [todoList, setTodoList] = useState([])

    const updateList = () => {
        getNews(setTodoList);
    }

    useEffect(updateList, [])

    return <div className={style.wrapper}>
        {todoList
            .filter(e => e['completed'] && e)
            .map(e => <ChangeElementComp key={e.id} element={e}/>)}
    </div>
}