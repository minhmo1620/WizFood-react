import React from "react";
import {Button} from "@ahaui/react";

import {deleteTokens} from '../auth'


class Home extends React.Component {
    handleLogOut = () => {
        deleteTokens();
    };
    render() {
        return (
            <div>
                <h3>Logged in as {localStorage.getItem("username")}</h3>
                <Button onClick={() => this.handleLogOut()}>Logout</Button>
            </div>
        )
    }
}

export default Home
