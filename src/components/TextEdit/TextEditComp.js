import React, {useState} from "react";
import style from "./TextEditStyl.module.scss";

export const  TextEditComp = props => {
    let propsText = props.text === undefined ? "" : props.text;
    const [editMode, setEditMode] = useState(false);
    const [text, setText] = useState(propsText);
    let allowEmptyText = (props.allowEmptyText === undefined ? true : props.allowEmptyText);
    let type = (props.type === undefined ? "text" : props.type);

    let renderText = () => {
        if (type === "text")
            return propsText.length === 0
                ? props.emptyText
                : text;
        if (type === "number")
            return propsText ? propsText : props.emptyText;
    }

    return editMode
        ? <div className={props.className}>
            <input type={type}
                   defaultValue={text}
                   autoFocus={true}
                   onChange={(e)=>setText(e.target.value)}
                   onBlur={() => {
                       setEditMode(false);
                       if (!allowEmptyText && text.length === 0)
                           setText(propsText);
                       else if (text.toString() !== propsText.toString())
                           props.changeTextHandler(text);
                   }}/>
        </div>
        :
        <div className={props.className + (type === "text" && propsText.length === 0 ? " " + style.empty : "")}
             onClick={() => !props.readonly && setEditMode(true)}>
        {renderText()}
        </div>
};
