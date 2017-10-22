import { Alert, ToastAndroid, Platform,NativeModules } from 'react-native';

var toast = NativeModules.ToastUtil;

const showShort = (content, isAlert) => {
  if (!content) {
    return;
  }
  if (isAlert || Platform.OS === 'ios') {
    toast.showToast(content.toString());
  } else {
    toast.dismiss();
    ToastAndroid.show(content.toString(), ToastAndroid.SHORT);
  }
};

const showLong = (content, isAlert) => {
  if (isAlert || Platform.OS === 'ios') {
    toast.showToast(content.toString());

  } else {
    toast.dismiss();
    ToastAndroid.show(content.toString(), ToastAndroid.LONG);
  }
};
const showLoading = ()=>{
  toast.showLoading();
}
const showError = (msg)=>{
  if(Platform.OS === 'ios'){
    toast.showError(msg);
  }else{
    toast.dismiss();
    ToastAndroid.show(msg.toString(), ToastAndroid.SHORT);
  }
  
}
const dismiss = ()=>{
  toast.dismiss();
}

export default {
  showShort,
  showLong,
  showError,
  showLoading,
  dismiss
};