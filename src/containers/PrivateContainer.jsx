import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { allActions } from "../redux/actions";

let AuthContext = React.createContext(null);

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();

    let login = (token, callback) => {
            setUser(token);
            if(token != undefined){
            dispatch(allActions.doSetLogin({token}));
            callback();
            } 
    };

    let logout = (callback) => {
            setUser(null);
            dispatch(allActions.doResetLogin());
            window.alert("Deslogado com sucesso!");
            callback();
    };

    let value = { user, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthProvider, AuthContext }