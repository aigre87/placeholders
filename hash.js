function removeHash(string){
    if( window.location.hash.indexOf(string) === -1 ){ return false; }
    if( window.location.hash.indexOf("&") === -1 ){
        history.replaceState( undefined, undefined, "#");
    }else{
        var hashArr = window.location.hash.split("&"),
            hashArrL = hashArr.length;
        for( var i=0; i < hashArrL; i++){
            if( hashArr[i].indexOf(string) > -1 ){
                hashArr.splice(i, 1);
                if( i === 0 ){
                    hashArr[0] = "#" + hashArr[0];
                }
                if( hashArr.length > 1 ){
                    history.replaceState( undefined, undefined, hashArr.join("&"));
                }else{
                    history.replaceState( undefined, undefined, hashArr[0]);
                }
                return;
            }
        }
    }
}
function addhashValue(string, value){
    //нет хеша
    if( window.location.hash.length == 0 ){
        history.replaceState( undefined, undefined, "#"+string+value);
    //есть хеш
    }else{
        //один хеш
        if( window.location.hash.indexOf("&") === -1 ){
            //нет такого типа хеша
            if( window.location.hash.indexOf(string) === -1 ){
                history.replaceState( undefined, undefined, window.location.hash +"&"+string+value);
            //есть такой тип хеша
            }else{
                history.replaceState( undefined, undefined, "#"+string+value);
            }
        //множественный хеш
        }else{
            var hashArr = window.location.hash.split("&"),
                hashArrL = hashArr.length;

            var entry = false;
            for( var i=0; i< hashArrL; i++){
                if( hashArr[i].indexOf(string) > -1 ){
                    entry = true;
                    if( i === 0 ){
                        hashArr[i] = "#"+string+value;
                    }else{
                        hashArr[i] = string+value;
                    }
                }
            }
            if( !entry ){
                history.replaceState( undefined, undefined, window.location.hash+"&"+string+value);
            }else{
                history.replaceState( undefined, undefined, hashArr.join("&"));
            }
        }
    }
}
function getHashValue(string){
    var hashValue = false;
    //один хеш
    if( window.location.hash.indexOf("&") === -1 ){
        hashValue = window.location.hash.replace("#"+string+"", "");
    //множественный хеш
    }else{
        var hashArr = window.location.hash.split("&"),
            hashArrL = hashArr.length;

        for( var i = 0; i < hashArrL; i++ ){
            if( hashArr[i].indexOf(string) > -1 ){
                var finalArr = hashArr[i].split("_"),
                    finalArrL = finalArr.length;
                hashValue = finalArr[finalArrL-1];
            }
        }
    }
    if( hashValue ){
        return hashValue;
    }else{
        console.log("нету такого хеша");
    }
}
