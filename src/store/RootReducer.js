import {combineReducers} from 'redux';
import {OptionsServerAddress} from "../pages/Options/OptionsReducer";
import {ActivePage, IsAuthorized} from "../components/MainMenu/MainMenuReducer";
import {UserAuthorities, UserEmail, UserFirstName, UserLastName, UserToken} from "../pages/Login/LoginReducer";
import {
    PageInfoListPrivate,
    PageInfoListPublic,
    PageInfoPrivateExpandedSet,
    PageInfoTreeMode
} from "../pages/PageInfo/parts/InfoTree/InfoTreeReducer";
import {PageInfoBadTargetsToMove} from "../pages/PageInfo/parts/MoveElement/MoveElementReducer";
import {InfoPageMode, InfoSelectedPage} from "../pages/PageInfo/parts/InfoPage/InfoPageReducer";
import {
    PageCashSelectedUserId,
    PageCashTab
} from "../pages/PageCash/PageCashReducer";
import {PageCashOperationList, PageCashStatus} from "../pages/PageCash/parts/TabOperations/TabOperationsReducer";
import {
    PageCashOptionsStatus,
    PageCashSelectedSheet,
    PageCashSheetList, PageCashUserList
} from "../pages/PageCash/parts/TabOptions/TabOptionsReducer";

export default combineReducers({
    OptionsServerAddress,
    IsAuthorized,
    ActivePage,

    UserFirstName, UserLastName, UserAuthorities, UserEmail, UserToken,

    PageInfoListPublic, PageInfoListPrivate, PageInfoPrivateExpandedSet, PageInfoBadTargetsToMove, PageInfoTreeMode,

    InfoSelectedPage, InfoPageMode,
    // cash
    PageCashTab, PageCashSelectedUserId,
    PageCashStatus, PageCashOperationList,
    PageCashOptionsStatus, PageCashSheetList, PageCashSelectedSheet, PageCashUserList
});