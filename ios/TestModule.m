//
//  TestModule.m
//  whitehaxBackup
//
//  Created by Tanay Parekhji on 10/8/20.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"
@interface RCT_EXTERN_MODULE(TestModule, NSObject)
  RCT_EXTERN_METHOD(connectToWifi:(NSString *)ssid password:(NSString *)password callback: (RCTResponseSenderBlock)callback)
  RCT_EXTERN_METHOD(osTest: (RCTResponseSenderBlock)callback)

  RCT_EXTERN_METHOD(OpenAppStore)
  RCT_EXTERN_METHOD(OpenLocationSettingsURL)
  RCT_EXTERN_METHOD(OpenBiometricSettings)
  RCT_EXTERN_METHOD(OpenGlobalLocationSettingsURL)
  RCT_EXTERN_METHOD(OpenSafariContentBlockerSettings)
  RCT_EXTERN_METHOD(NWScan: (RCTResponseSenderBlock)callback)
  //RCT_EXTERN_METHOD(Phish: (RCTResponseSenderBlock)callback)
  RCT_EXTERN_METHOD(AuthDevices: (NSString *)authorizedDevices)

@end
