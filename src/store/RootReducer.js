import {combineReducers} from 'redux';
import {OptionsServerAddress} from "../pages/Options/OptionsReducer";
import {ActivePage, IsAuthorized} from "../components/MainMenu/MainMenuReducer";
import {UserAuthorities, UserEmail, UserFirstName, UserLastName, UserToken} from "../pages/Login/LoginReducer";
import {PageInfoListPrivate, PageInfoListPublic, PageInfoPrivateExpandedSet} from "../pages/PageInfo/parts/InfoTree/InfoTreeReducer";

export default combineReducers({
    OptionsServerAddress,
    IsAuthorized,
    ActivePage,

    UserFirstName, UserLastName, UserAuthorities, UserEmail, UserToken,

    PageInfoListPublic, PageInfoListPrivate, PageInfoPrivateExpandedSet,
});