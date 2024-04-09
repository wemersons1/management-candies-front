import React, { useContext } from 'react';
import AppContext from "../AppContext/Context";
import RoutesFreee from '../pages/RoutesFree';
import System from '../pages/System';

const Routes = () => {
    const { user } = useContext(AppContext);

    const routes = [];

    if(user){
        routes.push(<System/>);
    } else {
        routes.push(<RoutesFreee/>);
    }

    return (
        <>
            {routes}
        </>
    );
}

export default Routes;