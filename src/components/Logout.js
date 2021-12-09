import React from "react";
import { deleteTokens } from "../auth";

export default function Logout() {
    deleteTokens();
    window.location.replace('/login');
    return <div></div>
}