let user = "admin";
let password = "devweb2";

export class apiRequest {

    constructor(){
        this.xhr = new XMLHttpRequest();
        this.xhr.withCredentials = true;
    };
    
    open(method,url){
        this.xhr.open(method,url,true);
        this.xhr.setRequestHeader("Authorization", "Basic " + btoa(user+":"+password));
    };

    addEventListener(type,func){
        this.xhr.addEventListener(type,func);
    };

    send(){
        this.xhr.send();
    }

}