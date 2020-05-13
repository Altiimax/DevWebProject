import jwt_decode from 'jwt-decode';

export default function tokenIsValid() {
    let token =localStorage.getItem('token');
    
    try {
        let dateNow = new Date();
        let decodedToken = jwt_decode(token);
        if(decodedToken.exp < dateNow.getTime() - decodedToken.orig_iat){
            return true;
        }
        return false;
    }
    catch(err) {
        return false;
    }
    
};

export function userFromToken() {
    let token =localStorage.getItem('token');
    let decodedToken = jwt_decode(token);
    let user = {
        id : decodedToken.user_id,
        email : decodedToken.email,
    }
    return user;
};