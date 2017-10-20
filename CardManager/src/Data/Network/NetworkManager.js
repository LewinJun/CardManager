

const NetworkManager = {
    post: function (url, params) {
        
        return fetchRequest(url,params,'POST',undefined);

    },
    get: function(url, params){
        return fetchRequest(url,params,'GET',undefined);
    }
}

const fetchRequest = function (url, params, method, header) {
    if(header === undefined){
        header = {
            "Content-Type": "application/json;charset=UTF-8",
        };
    }else{
        if(header["Content-Type"] === undefined){
            header["Content-Type"] = "application/json;charset=UTF-8";
        }
    }
    let requestParam = {
        method: method,
        headers: header,
    };
    if (params !== undefined) {
        if(method === 'GET'){
            url = url +"?1=1"
            for(var key in params){
                url = url + "&" + key + "=" + params[key];
            }
        }else{
            requestParam.body = JSON.stringify(params);
        }
        
    }
    return new Promise(function (resolve, reject) {
        fetch(url, requestParam)
            .then((response) => response.json())
            .then((responseData) => {
                console.log('res:', url, responseData);   //网络请求成功返回的数据
                resolve(responseData);
            })
            .catch((err) => {
                console.log('err:', url, err);   //网络请求失败返回的数据  
                reject(err);
            });
    });
}
export default NetworkManager;