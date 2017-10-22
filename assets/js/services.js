function getJSONByCallbacks(url, succesHandler, errorHandler){
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open('GET', url, true)
        xhr.onload = function(){
            if(xhr.status == 200){
                var data = (!xhr.responseType)?JSON.parse(xhr.response):xhr.response;
                succesHandler && succesHandler(data);
            } else{
                errorHandler && errorHandler(`Error ${xhr.status}`);
            }
        };
        xhr.onerror = function(){
            errorHandler && errorHandler('Netwerk error!');
        };
        xhr.send(null);

    }

