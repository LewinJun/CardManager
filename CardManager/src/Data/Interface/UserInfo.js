let instance = null;  

var userInfo = undefined;  

export default class UserInfo {  

  constructor() {  
      if(!instance){  
            instance = this;  
      }  
      return instance;  
   }  

  setUserInfo(info){  
      this.userInfo=info;  
  }  

  getUserInfo(){  
      return this.userInfo;  
  }  

  getToken(){
      if(this.userInfo === undefined || this.userInfo === null || this.userInfo.token === undefined){
          return undefined;
      }else{
          return this.userInfo.token;
      }
  }
  isLogin(){
      if(this.getToken() === undefined){
          return false;
      }else{
          return true;
      }
  }
}  