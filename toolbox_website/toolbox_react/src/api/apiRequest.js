import tokenIsValid, { userFromToken } from "../utils";


/*-----api request url information-----*/
let uri = "http://127.0.0.1";
let port = 8000;
let isInDev = require('../prod.json').inDev;

export class apiRequest {
  constructor() {
    this.xhr = new XMLHttpRequest();
    this.xhr.withCredentials = true;
  }
  
  open(method, endpoint) {
    if(isInDev){
      this.xhr.open(method, `${uri}:${port}${endpoint}`, true);
    }
    else{
      this.xhr.open(method, `${endpoint}`, true);
    }
    if(tokenIsValid()){
      this.xhr.setRequestHeader(
        "Authorization",
        "JWT " + userFromToken().token
      );
    }
  }

  /**
   *
   * @param {String} type - options: "json", "formData"
   */
  contentType(type) {
    if (type === "json") {
      this.xhr.setRequestHeader(
        "Content-Type",
        "application/json;charset=UTF-8"
      );
    } else if (type === "formData") {
      // no headers needed
    }
  }

  addEventListener(type, func) {
    this.xhr.addEventListener(type, func);
  }

  send(data) {
    if (arguments.length === 0) {
      this.xhr.send();
    } else {
      this.xhr.send(data);
    }
  }
}
