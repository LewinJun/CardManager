import ToastUtil from '../../Component/ToastUtil'
import NetworkManager from '../Network/NetworkManager'
import UserInfo from './UserInfo'
import {  Platform } from 'react-native';


var userInfo = new UserInfo();

const GetUrl = (url) => {
    if(url.indexOf('http')>=0){
        return url;
    }else{
        return 'http://wwk.weiyunshidai.com/api/'+url;
    }
}
const showErrorTip = (res,fail) => {
    if(Platform.OS === 'android'){
        ToastUtil.dismiss();
    }
    var message = "请求失败，没有code或请求异常";
    if(res.message){
        message = res.message;
    }
    ToastUtil.showError(message);
    //请求失败
    if(fail){
        fail(res);
    }
}
const checkSuccess = (res,isSuccessTip,success,fail) => {
    if(Platform.OS === 'android'){
        ToastUtil.dismiss();
    }
    if(res.code !== "0"){
        showErrorTip(res,fail);
    }else{
        var message = res.message;
        if(message === undefined){
            messag = "请求成功";
        }
        if(isSuccessTip){
            ToastUtil.showShort(res.message);
        }
        if(success){
            success(res);
        }
    }
}
const getWithTip = (url,params,success,fail) => {
    request(url,true,'GET',params,success,fail);
}
const postWithTip = (url,params,success,fail) => {
    request(url,true,'POST',params,success,fail);
}


const get = (url,params,success,fail) => {
    request(url,false,'GET',params,success,fail);
}
const post = (url,params,success,fail) => {
    request(url,false,'POST',params,success,fail);
}

const request = (url,isSuccessTip,menthod,params,success,fail)=>{
    
    if(isSuccessTip){
        ToastUtil.showLoading();
    }
    if(menthod === 'POST'){
        NetworkManager.post(GetUrl(url), params, getCommonHeader()).then(res => {
            checkSuccess(res,isSuccessTip,success,fail);
        }).catch(err => {
            //请求失败
            showErrorTip(err,fail);
        })
    }else{
        NetworkManager.get(GetUrl(url), params, getCommonHeader()).then(res => {
            checkSuccess(res,isSuccessTip,success,fail);
        }).catch(err => {
            //请求失败
            showErrorTip(err,fail);
        })
    }
    
}

const getCommonHeader = () => {
    if(userInfo.getToken() !== undefined){
        return {token:userInfo.getToken()};
    }else{
        return undefined;
    }
}

const showResTip = (res)=>{
    if (Platform.OS === 'android') {
        ToastUtil.dismiss();
    }
    if(res.code === '0'){
        ToastUtil.showShort(res.message);        
    }else{
        ToastUtil.showError(err.message);
    }
}

export default {GetUrl,showErrorTip,checkSuccess,getWithTip,postWithTip,get,post,showResTip};