import React, { Component, NetInfo } from 'react';

const NetworkManager = {
    post: function (url, params,header) {
        
        return fetchRequest(url,params,'POST',header);

    },
    get: function(url, params,header){
        return fetchRequest(url,params,'GET',header);
    }
    
}

const fetchRequest = function (url, params, method, header) {
    if(header === undefined){
        header = {
            "Content-Type": "multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d",
        };
    }else{
        if(header["Content-Type"] === undefined){
            header["Content-Type"] = "multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d";
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
            let formData = new FormData();
            for(var key in params){
                formData.append(key,params[key]);
            }
            requestParam.body = formData;
        }
        
    }
    return new Promise(function (resolve, reject) {
        // if(!NetInfo.isConnected){
        //     var err = {"message":"没有网络连接","code":"500"};
        //     reject(err);
        //     return;
        // }
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