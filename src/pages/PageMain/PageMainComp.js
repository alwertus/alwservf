import React/*, {useState}*/ from "react";
// import {/*useSelector, */useDispatch} from "react-redux";
import style from "./PageMainStyl.module.scss";
import {useSelector} from "react-redux";

export const PageMainComp = props => {
    // const [count, setCount] = useState(0);
    // const server = useSelector(state => state.paramServerAddress); // Redux param
    // const dispatch = useDispatch();

    const server = useSelector(state => state.OptionsServerAddress); // Redux param

    return <div className={style.wrapper}>
        <p style={{color: "#ff0000"}} >Адрес сервера = {server}</p>
  {/*      <ul>
            <li>{"Class=" + props.className}</li>
            <li>{"count=" + count}</li>
        </ul>

        <button onClick={()=>setCount(count + 1)}>Add +1</button>
        <button onClick={()=> dispatch({ type: "EVENT__CHANGE_ME", newValue: "CHANGE_ME" })}>change me button</button>
*/}
    </div>
};
