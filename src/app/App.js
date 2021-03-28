import React from "react";
import style from'./App.module.scss';
import {Route, Switch} from 'react-router-dom';

import {PageMainComp} from "../pages/PageMain/PageMainComp";
import {OptionsComp} from "../pages/Options/OptionsComp";
import {MainMenuComp} from "../components/MainMenu/MainMenuComp";
import {LoginComp} from "../pages/Login/LoginComp";
import {PageAdminComp} from "../pages/PageAdmin/PageAdminComp";
import {PageAppComp} from "../pages/PageApp/PageAppComp";
import {PageInfoComp} from "../pages/PageInfo/PageInfoComp";
import {PageCashComp} from "../pages/PageCash/PageCashComp";

const App = () => {
    //<Route exact path="/doings" component={PageInfoComp}/>
    return <div className={style.app}>
        <MainMenuComp/>
        <div className={style.centerArea}>
            <Switch>
                <Route exact path="/" component={PageMainComp}/>
                <Route exact path="/info" component={PageInfoComp}/>
                <Route exact path="/cash" component={PageCashComp}/>
                <Route exact path="/applications" component={PageAppComp}/>
                <Route exact path="/administration" component={PageAdminComp}/>

                <Route exact path="/options" component={OptionsComp}/>
                <Route exact path="/login" component={LoginComp}/>
            </Switch>
        </div>
    </div>
};

export default App;