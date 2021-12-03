export function isLoggedIn() {
    return localStorage.getItem("access_token")!==null && localStorage.getItem("access_token")!=="undefined";
}
  
export function deleteTokens(){
    localStorage.removeItem("access_token");
    localStorage.removeItem("username");
    window.location.replace("/login")
}
export function requiredAuth(nextState, replace) {
    if (!isLoggedIn()) {
        replace({
        pathname: '/',
        state: { nextPathname: nextState.location.pathname }
        })
    }
}