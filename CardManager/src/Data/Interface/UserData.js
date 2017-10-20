import GetUrl from './GetUrl'
import NetworkManager from '../Network/NetworkManager'
import ToastUtil from '../../Component/ToastUtil'
const UserData = {
    register:  (params, success, fail) => {
        NetworkManager.post(GetUrl('register'), params).then(res => {
            if(success){
                success(res);
            }
        }).catch(err => {
            //请求失败
            if(fail){
                fail(res);
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