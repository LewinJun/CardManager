//
//  ToastUtil.m
//  CardManager
//
//  Created by Lewin on 2017/10/20.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "ToastUtil.h"
#import <SVProgressHUD/SVProgressHUD.h>

@implementation ToastUtil

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(showToast:(nonnull NSString*)message resolve:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
   dispatch_async(dispatch_get_main_queue(), ^{
  [SVProgressHUD showSuccessWithStatus:message];
   });
}

RCT_EXPORT_METHOD(showLoading:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  dispatch_async(dispatch_get_main_queue(), ^{
    [SVProgressHUD show];
  });
}
RCT_EXPORT_METHOD(dismiss:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  dispatch_async(dispatch_get_main_queue(), ^{
    [SVProgressHUD dismiss];
  });
}

RCT_EXPORT_METHOD(showError:(nonnull NSString*)message resolve:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  dispatch_async(dispatch_get_main_queue(), ^{
    [SVProgressHUD showErrorWithStatus:message];
  });
}


@end
