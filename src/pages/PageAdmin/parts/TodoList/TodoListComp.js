import React, {useEffect, useState} from "react";
import style from "./TodoListStyl.module.css";
import {ActionButtonComp} from "../../../../components/ActionButton/ActionButtonComp";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import {TodoElementComp} from "../TodoElement/TodoElementComp";
import {createTodo, getTodo} from "./TodoListActions";

export const TodoListComp = props => {

    const [newText, setNewText] = useState("")
    const [todoList, setTodoList] = useState([])
    const [showAll, setShowAll] = useState(false)

    const updateList = () => {
        getTodo(setTodoList);
    }

    useEffect(updateList,[])

    return <div className={style.wrapper}>
        <h2>Todo List</h2>

        <div className={style.textAreaWrapper}>
            <textarea
                className={style.textArea}
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
            />
        </div>


        <div className={style.addLine}>
            {(4000 - newText.length) + "/4000"}
            <ActionButtonComp
                icon={<ControlPointIcon/>}
                customClass={style.buttonAdd}
                onClickHandler={() => {if (newText !== "") {
                    createTodo(updateList, newText)
                    setNewText("")
                }}}
            />
        </div>

        <div>
            <input type={"checkbox"}
                   value={"completed"}
                   checked={showAll}
                   onChange={(e) => {
                       setShowAll(e.target.checked)
                   }}/>
            Show all
        </div>

        <div className={style.todoListContainer}>
            {showAll
                ? todoList
                    .map(e => <TodoElementComp key={e.id} element={e} updateListHandler={updateList}/>)
                : todoList
                    .filter(e => !e['completed'] && e)
                    .map(e => <TodoElementComp key={e.id} element={e} updateListHandler={updateList}/>)
            }
        </div>
    </div>
}