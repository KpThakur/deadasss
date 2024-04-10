import React, { useState, useEffect } from "react";

export const UserContext = React.createContext();
export const UserProvider = (props) => {
    const [userData, setUserData] = useState([])
    return (
        <UserContext.Provider value={[userData, setUserData]}>
            {props.children}
        </UserContext.Provider>
    )
}







