import React from "react";
import style from'./App.module.scss';
import {Route, Switch} from 'react-router-dom';

import {MainMenuItemComp} from "../components/MainMenuItem/MainMenuItemComp";
import {Comp1Comp} from "../components/Comp1/Comp1Comp";
import {Comp2Comp} from "../components/Comp2/Comp2Comp";
import {PageMainComp} from "../pages/PageMain/PageMainComp";
import {OptionsComp} from "../pages/Options/OptionsComp";

const App = () => (
    <div className={style.app}>
        <div className={style.topArea}>
            <div className={style.pageList}>
                <MainMenuItemComp id="" title="Main"/>
                <MainMenuItemComp id="info" title="Info"/>
                <MainMenuItemComp id="doings" title="Doings"/>
                <MainMenuItemComp id="applications" title="App"/>
                <MainMenuItemComp id="administration" title="Admin"/>

            </div>
            <div className={style.user}>
                <MainMenuItemComp id="options" title="Options"/>
            </div>
        </div>

        <div className={style.centerArea}>
           <Switch>
                <Route exact path="/" component={PageMainComp}/>
                <Route exact path="/info" component={Comp1Comp}/>
                <Route exact path="/doings" component={Comp2Comp}/>
                <Route exact path="/options" component={OptionsComp}/>
            </Switch>
        </div>
    </div>
);

export default App;