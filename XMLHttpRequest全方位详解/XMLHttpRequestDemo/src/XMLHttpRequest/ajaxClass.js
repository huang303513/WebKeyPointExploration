class Ajax{
    constructor(){
        let httpRequest;
        if (window.XMLHTTPRequest) {
            httpRequest = new XMLHttpRequest();
        }else if(window.ActiveXObject){
            httpRequest = new ActiveXObject('Microsoft.XMLHTTP');
        }
        return httpRequest;
    }
}

class HttpRequest{
    constructor(){
        this.ajax = new Ajax();
    }
}