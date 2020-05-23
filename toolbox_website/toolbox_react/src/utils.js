import jwt_decode from 'jwt-decode';
import { apiRequest } from "./api/apiRequest.js";

export default function tokenIsValid() {
    try {
        let token =localStorage.getItem('token');
        let dateNow = new Date();
        let decodedToken = jwt_decode(token);
        //if(decodedToken.exp < (dateNow.getTime()/1000 - decodedToken.orig_iat)){
        if(decodedToken.exp < dateNow.getTime()/1000){
            localStorage.removeItem('token');
            return false;
        }
        return true;
    }
    catch(err) {
        localStorage.removeItem('token');
        return false;
    }
    
};

export function userFromToken() {
    
    if(tokenIsValid()){
        let token =localStorage.getItem('token');
        let decodedToken = jwt_decode(token);
        let user = {
            id : decodedToken.user_id,
            email : decodedToken.email,
            token : token,
        }
        return user;
    }
    return null;
};



export function getUserProfileAPIRequest(id) {
let endpoint = "/api/persons/";

let req = new apiRequest();
req.open("GET", `${endpoint}${id}/`);

req.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
    if (this.status === 200) {
        let profile = JSON.parse(this.responseText)[0];
        document.getElementById("userNameDisplay").innerHTML =
        "Welcome " + profile.firstName + " " + profile.lastName;
    }
    else{
        localStorage.setItem('token',null);
        window.location.reload();
    }
    }
});

req.send();
}