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
        this.xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    };

    addEventListener(type,func){
        this.xhr.addEventListener(type,func);
    };

    send(data){
        if (arguments.length === 0) {
            this.xhr.send();
        }
        else{
            this.xhr.send(data);
        }
    }

}