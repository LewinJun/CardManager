import { Alert, ToastAndroid, Platform,NativeModules } from 'react-native';

var toast = NativeModules.ToastUtil;

const showShort = (content, isAlert) => {
  if (!content) {
    return;
  }
  if (isAlert || Platform.OS === 'ios') {
    toast.showToast(content.toString());
  } else {
    toast.dimiss();
    ToastAndroid.show(content.toString(), ToastAndroid.SHORT);
  }
};

const showLong = (content, isAlert) => {
  if (isAlert || Platform.OS === 'ios') {
    toast.showToast(content.toString());

  } else {
    toast.dimiss();
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
    toast.dimiss();
    ToastAndroid.show(msg.toString(), ToastAndroid.SHORT);
  }
  
}
const dimiss = ()=>{
  toast.dimiss();
}

export default {
  showShort,
  showLong,
  showError,
  showLoading,
  dimiss
};