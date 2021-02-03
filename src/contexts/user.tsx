import React from 'react';
import { useState } from 'react';

const UserContext = React.createContext({
    userid: "",
});

const UserContextProvider: React.FC = (props) => {

    const [userid, setUserid] = useState("")

    return (
        <UserContext.Provider
            value={{
                userid
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

const UserContextConsumer = UserContext.Consumer;

export { UserContext, UserContextProvider, UserContextConsumer }