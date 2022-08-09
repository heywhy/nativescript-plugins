# @heywhy/ns-secure-storage

[![NPM version][npm-image]][npm-url]
[![Twitter Follow][twitter-image]][twitter-url]

[npm-image]:https://img.shields.io/npm/v/@heywhy/ns-secure-storage
[npm-url]:https://npmjs.org/package/@heywhy/ns-secure-storage
[twitter-image]:https://img.shields.io/twitter/follow/thebiggergeek?label=Follow%20me&style=social
[twitter-url]:https://twitter.com/thebiggergeek

## Installation

From the command prompt go to your app's root folder and execute:

```bash
ns plugin add @heywhy/ns-secure-storage
```

## Usage

This plugin maintains the same API as [@nativescript/secure-storage](https://github.com/EddyVerbruggen/nativescript-secure-storage) but with missing improvements.

## iOS Security++
By default the plugin uses `kSecAttrAccessibleAlwaysThisDeviceOnly` access control to the keychain. This means that the keychain value can be accessed even if the device is locked. If you want to enhance security and you do not need background access, or if you want to allow the value to be backed up and migrated to another device, you can use any of keys defined [here](https://developer.apple.com/documentation/security/ksecattraccessiblealwaysthisdeviceonly?language=objc#see-also) and pass it when you create an instance of `SecureStorage`, for example

```ts
declare const kSecAttrAccessibleWhenUnlockedThisDeviceOnly; // This is needed in case you don't have tns-platform-declarations module installed. 
const secureStorage = new SecureStorage({accessibilityType: kSecAttrAccessibleWhenUnlockedThisDeviceOnly})
```

## iOS Simulator

Currently this plugin defaults to using `NSUserDefaults` on **iOS Simulators**. You can change this behaviour by providing `disableFallbackToUserDefaults` to the constructor of `SecureStorage`. This then uses the keychain instead of `NSUserDefaults` on simulators.

```ts
const secureStorage = new SecureStorage({disableFallbackToUserDefaults: true})
```

If you're running into issues similar to [issue_10](https://github.com/EddyVerbruggen/nativescript-secure-storage/issues/10), consider using the default behaviour again.


## License

Apache License Version 2.0
