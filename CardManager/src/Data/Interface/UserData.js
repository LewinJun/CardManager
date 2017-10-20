import GetUrl from './GetUrl'
import NetworkManager from '../Network/NetworkManager'
import ToastUtil from '../../Component/ToastUtil'
const UserData = {
    register:  (params, success, fail) => {
        NetworkManager.get(GetUrl('register'), params).then(res => {
            if(res.code !== "0"){
                if(fail){
                    fail(res);
                }else{
                    var message = res;
                    if(res.message){
                        message = res.message;
                    }
                    ToastUtil.showError(message);
                }
            }else{
                if(success){
                    success(res);
                }
            }
            
        }).catch(err => {
            //请求失败
            if(fail){
                fail(res);
            }else{
                var message = err;
                if(err.message){
                    message = err.message;
                }
                ToastUtil.showError(message);
            }
        })

    },
    getMobileCode:(mobile,success,fail) => {
        NetworkManager.get(GetUrl('getVerificationCode'), {'user_phone':mobile,'method':'register'}).then(res => {
            if(success){
                success(res);
            }
            
        }).catch(err => {
            //请求失败
            if(fail){
                fail(res);
            }

        })
    }
    
}
export default UserData;