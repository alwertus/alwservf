import React, {useEffect, useState} from "react";
import style from "./TabOptionsStyl.module.scss";
import {useSelector} from "react-redux";
import {
    changePageCashSelectedSheet,
    changePageCashSheetName,
    createCashList,
    getCashList,
    pageCash_AddUser, pageCash_RemoveUser
} from "./TabOptionsActions";
import {STATUS} from "../../../../store/ActionsStructure";
import {RadioComp} from "../../../../components/Radio/RadioComp";
import {UserAccessComp} from "../UserAccess/UserAccessComp";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export const TabOptionsComp = props => {
    let status = useSelector(state => state.PageCashOptionsStatus);
    let sheetList = useSelector(state => state.PageCashSheetList);
    let userList = useSelector(state => state.PageCashUserList);
    let selectedSheet = useSelector(state => state.PageCashSelectedSheet);
    let [newUserEmail, setNewUserEmail] = useState("");

    const setNewUser = (e) => {
        setNewUserEmail(e.target.value)
    }

    const onSelectedSheetChangeHandle = (e) => {
        if (!e.target.checked) return;
        changePageCashSelectedSheet(e.target.id);
    };

    const renameSheetHandler = (newText, id) => {
        changePageCashSheetName(id, newText);
    };

    useEffect(() => {
        getCashList();
    },[])

    function renderContent() {
        switch (status) {
            case STATUS.OUTDATED:
                getCashList();
                return <div>Outdated</div>;
            case STATUS.LOADING:
                return <div>Loading...</div>
            case STATUS.ACTUAL:
                return <div>
                    {sheetList.map(e => <RadioComp key={e.id}
                                                   element={e}
                                                   onChangeHandler={onSelectedSheetChangeHandle}
                                                   checked={selectedSheet.toString() === e.id.toString()}
                                                   renameHandler={renameSheetHandler}
                    />) }
                </div>
            case STATUS.ERROR:
                return <div>ERROR</div>
            default:
                return <div>Unknown Status "{status}". Refresh the page, please</div>
        }
    }

    return <div className={style.wrapper}>
        <div className={style.section}>
            <div className={style.sheetList}>
                <h2>Available sheets</h2>
                {renderContent()}
                <button onClick={()=>createCashList()}>Create New</button>
            </div>
        </div>

        <div className={style.section}>
            <div className={style.userList}>
                <h2>Users access</h2>
                <div className={style.add}>
                    <TextField
                        id="auth-email"
                        size="small"
                        label="Email"
                        variant="outlined"
                        onChange={setNewUser}/>
                    <div className={style.buttonWrapper}><Button variant="contained" onClick={() => pageCash_AddUser(newUserEmail)}> Add </Button></div>
                </div>
                { userList.map(e => <UserAccessComp
                    key={e['userId']}
                    id={e['userId']}
                    name={e['email']}
                    access={e['access']}
                    removeHandler={pageCash_RemoveUser}
                />) }
            </div>
        </div>


    </div>
};