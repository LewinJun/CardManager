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
  NSLog(@"aaaaaa");
   dispatch_async(dispatch_get_main_queue(), ^{
  [SVProgressHUD showSuccessWithStatus:message];
   });
}


@end
