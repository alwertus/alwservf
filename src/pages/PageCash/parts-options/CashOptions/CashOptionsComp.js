import React, {useEffect, useState} from "react";
import style from "./CashOptionsStyl.module.css";
import {createNewAccessUser, createNewSheet, loadSheetList, loadUserList} from "./CashOptionsActions";
import {CashOptionsSheetItemComp} from "../CashOptionsSheetItem/CashOptionsSheetItemComp";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {CashOptionsUserComp} from "../CashOptionsUser/CashOptionsUserComp";
import {useSelector} from "react-redux";

export const CashOptionsComp = props => {

    const [sheetList, setSheetList] = useState([])
    const [userList, setUserList] = useState([])
    const [newSheetName, setNewSheetName] = useState("")
    const [newUserName, setNewUserName] = useState("")
    const [userErrorText, setUserErrorText] = useState("")
    const [currentAccess, setCurrentAccess] = useState("")
    const currentEmail = useSelector(store => store['UserEmail'])

    const updateUsers = () => {
        loadUserList(setUserList, setUserErrorText, setCurrentAccess)
    }
    const updateSheet = () => {
        loadSheetList(setSheetList);
        updateUsers();
    }
    const createSheetButtonClick = ()=>{
        createNewSheet(newSheetName,
            ()=>{updateSheet()}
        )
        setNewSheetName("")
    }
    const createUserButtonClick = () => {
        createNewAccessUser(newUserName,
            ()=>{updateUsers()},
            setUserErrorText
        )
        setNewUserName("")
    }

    useEffect(() => {updateSheet();}, [] )// eslint-disable-line react-hooks/exhaustive-deps

    return <div className={style.wrapper}>
        <div className={style.sheetListColumn}>
            <div className={style.columnTitle}>
                <h3>Sheet List</h3>
            </div>

            {sheetList && sheetList.map(e =>
                <CashOptionsSheetItemComp
                    key={e['sheetId']}
                    element={e}
                    updateSheetHandler = {updateSheet}/>)}
            {!sheetList && <div>Error</div>}

            <div className={style.addRecordContainer}>
                <TextField
                    id="sheet-name"
                    label="Sheet Name"
                    variant="outlined"
                    value={newSheetName}
                    onKeyUp={(event) => {if (event.key === "Enter") createSheetButtonClick()}}
                    onChange={(e) => {setNewSheetName(e.target.value)}}
                />

                <div className={style.button}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={createSheetButtonClick}>Create</Button>
                </div>

            </div>
        </div>

        <div className={style.userListColumn}>
            <div className={style.columnTitle}>
                <h3>User Access</h3>
            </div>

            { userList && userList.map(e => <CashOptionsUserComp
                updateUserListHandler={updateUsers}
                key={e['id']}
                element={e}
                canWrite={currentAccess === "W" && currentEmail !== e['email']}
            />)}

            {currentAccess === "W" && <div className={style.addRecordContainer}>
                <TextField
                    id="new-user-email"
                    label="Email"
                    variant="outlined"
                    value={newUserName}
                    onKeyPress={() => setUserErrorText("")}
                    onKeyUp={(event) => {if (event.key === "Enter") createUserButtonClick()}}
                    onChange={(e) => {setNewUserName(e.target.value)}}
                />
                <div className={style.button}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={createUserButtonClick}>Add User
                    </Button>
                </div>


                <div className={style.errorContainer}>
                    {userErrorText}
                </div>
            </div>}
        </div>
    </div>
}