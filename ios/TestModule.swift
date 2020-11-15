//
//  TestModule.swift
//  whitehaxBackup
//
//  Created by Tanay Parekhji on 10/8/20.
//

import Foundation
import RealmDemo
import RealmDemo2
import network_scan
//import EmailPhishingAttackSDK
//import PermissionSDK


@objc(TestModule)
class TestModule: NSObject {
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }
//  @objc
//  func Phish(_ callback: RCTResponseSenderBlock) {
//    callback([EmailPhishingAttackSDK.shared.startEmailPhishingAttack()])
//  }
  
  @objc
  func NWScan(_ callback: RCTResponseSenderBlock){
    callback([NetworkScannerSDK.shared.startSearch()])
  }
  @objc
  func AuthDevices(_ authorizedDevices: String) {
    NetworkScannerSDK.shared.authorizeDevices(deviceListString: authorizedDevices)
    print(NetworkScannerSDK.shared.getDeviceFromStorage())
  }
  
  @objc
  func OpenAppStore() {
    OSSDK.shared.OpenAppStore();
  }
  @objc
  func OpenLocationSettingsURL() {
    OSSDK.shared.OpenLocationSettingsURL()
  }
  @objc
  func OpenBiometricSettings() {
    OSSDK.shared.OpenBiometricSettings()
  }
  
  @objc
  func OpenGlobalLocationSettingsURL() {
    OSSDK.shared.OpenGlobalLocationSettingsURL()
  }
  
  @objc
  func OpenSafariContentBlockerSettings() {
    OSSDK.shared.OpenSafariContentBlockerSettings()
  }
  
  @objc
  func connectToWifi(_ ssid : String, password : String, callback:@escaping (_ String: Any) -> ()){
    WifiSDK.shared.passwordForStrengthCheck = password
    WifiSDK.shared.scanWifi(passwordsList: ["123","admin@123","testPassword"], ssid: ssid) { data in
      print(data)
      callback([data])
    }
    
  }
  
  @objc
  func osTest( _ callback:@escaping (_ String: Any) -> ()) {
    OSSDK.shared.performOSTest() { data in
      print(data)
      callback([data])
    }
  }
}

  

