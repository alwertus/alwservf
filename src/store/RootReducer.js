import {combineReducers} from 'redux';
import {OptionsServerAddress} from "../pages/Options/OptionsReducer";
import {IsAuthorized, ActivePage} from "../components/MainMenu/MainMenuReducer";
import {UserFirstName, UserLastName, UserAuthorities, UserEmail, UserPassword} from "../pages/Login/LoginReducer";

export default combineReducers({
    OptionsServerAddress,
    IsAuthorized,
    ActivePage,

    UserFirstName, UserLastName, UserAuthorities, UserEmail, UserPassword,
});