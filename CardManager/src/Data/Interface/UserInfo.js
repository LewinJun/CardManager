let instance = null;  

var userInfo = undefined;  

// user_id	string	true	用户id
// 0	user_account	string	true	用户登录账号
// 0	user_name	string	true	用户名
// 0	user_nike	string	true	用户昵称
// 0	user_phone	string	true	用户手机
// 0	user_img	string	true	用户虚拟头像
// 0	user_qr_code	string	true	用户二维码
// 0	user_id_card	string	true	用户身份证
// 0	user_true_name	string	true	用户真实姓名
// 0	user_sex	string	true	用户性别
// 0	user_email	string	true	用户邮箱
// 0	user_birthday	string	true	用户生日
// 0	region	string	true	用户地址
// 0	balance	string	true	用户余额
// 0	integral	string	true	用户积分
// 0	is_certified	string	true	是否已实名
// 0	bank_card	string	true	绑定银行卡
// 0	bank_name	string	true	银行名称

export default class UserInfo {  

  constructor() {  
      if(!instance){  
            instance = this;  
      }  
      return instance;  
   }  

  setUserInfo(info){
      if(info.balance === undefined){
        info.balance = '0.00';
      }  
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