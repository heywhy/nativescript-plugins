import { GetOptions, Options, RemoveAllOptions, RemoveOptions, SecureStorageCommon, SetOptions } from './common';

declare const SAMKeychainQuery, SAMKeychain;

export class SecureStorage extends SecureStorageCommon {
  private isSimulator: boolean;
  private accessibilityType: string;

  private static defaultService = 'my_app';

  // This is a copy of 'kSSKeychainAccountKey_copy' which is not exposed from SSKeychain.h by {N}
  private static kSSKeychainAccountKey_copy = 'acct';

  constructor({ accessibilityType = kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly, disableFallbackToUserDefaults = false }: Options = {}) {
    super();

    if (disableFallbackToUserDefaults) {
      this.isSimulator = false;
    } else {
      const isMinIOS9 = NSProcessInfo.processInfo.isOperatingSystemAtLeastVersion({
        majorVersion: 9,
        minorVersion: 0,
        patchVersion: 0,
      });
      if (isMinIOS9) {
        const simDeviceName = NSProcessInfo.processInfo.environment.objectForKey('SIMULATOR_DEVICE_NAME');
        this.isSimulator = simDeviceName !== null;
      } else {
        this.isSimulator = UIDevice.currentDevice.name.toLowerCase().indexOf('simulator') > -1;
      }
    }

    this.accessibilityType = accessibilityType;
  }

  public get(arg: GetOptions): Promise<unknown> {
    return new Promise((resolve) => {
      if (this.isSimulator) {
        resolve(NSUserDefaults.standardUserDefaults.objectForKey(arg.key));
        return;
      }

      const query = SAMKeychainQuery.new();
      query.service = arg.service || SecureStorage.defaultService;
      query.account = arg.key;

      try {
        query.fetch();
        resolve(query.password);
      } catch (e) {
        resolve(null);
      }
    });
  }

  getSync(arg: GetOptions): unknown {
    if (this.isSimulator) {
      return NSUserDefaults.standardUserDefaults.objectForKey(arg.key);
    }

    const query = SAMKeychainQuery.new();
    query.service = arg.service || SecureStorage.defaultService;
    query.account = arg.key;
    try {
      query.fetch();
      return query.password;
    } catch (e) {
      return null;
    }
  }

  public set(arg: SetOptions) {
    return new Promise<boolean>((resolve) => {
      if (this.isSimulator) {
        NSUserDefaults.standardUserDefaults.setObjectForKey(arg.value, arg.key);
        resolve(true);
        return;
      }

      SAMKeychain.setAccessibilityType(this.accessibilityType);
      const query = SAMKeychainQuery.new();
      query.service = arg.service || SecureStorage.defaultService;
      query.account = arg.key;
      query.password = arg.value;
      resolve(query.save());
    });
  }

  setSync(arg: SetOptions) {
    if (this.isSimulator) {
      NSUserDefaults.standardUserDefaults.setObjectForKey(arg.value, arg.key);
      return true;
    }

    SAMKeychain.setAccessibilityType(this.accessibilityType);
    const query = SAMKeychainQuery.new();
    query.service = arg.service || SecureStorage.defaultService;
    query.account = arg.key;
    query.password = arg.value;
    return query.save();
  }

  public remove(arg: RemoveOptions) {
    return new Promise<boolean>((resolve) => {
      if (this.isSimulator) {
        NSUserDefaults.standardUserDefaults.removeObjectForKey(arg.key);
        resolve(true);
        return;
      }

      const query = SAMKeychainQuery.new();
      query.service = arg.service || SecureStorage.defaultService;
      query.account = arg.key;
      try {
        resolve(query.deleteItem());
      } catch (e) {
        resolve(false);
      }
    });
  }

  removeSync(arg: RemoveOptions) {
    if (this.isSimulator) {
      NSUserDefaults.standardUserDefaults.removeObjectForKey(arg.key);
      return true;
    }

    const query = SAMKeychainQuery.new();
    query.service = arg.service || SecureStorage.defaultService;
    query.account = arg.key;
    try {
      return query.deleteItem();
    } catch (e) {
      return false;
    }
  }

  public removeAll(arg?: RemoveAllOptions) {
    return new Promise<boolean>((resolve) => {
      if (this.isSimulator) {
        const defaults = NSUserDefaults.standardUserDefaults;
        const bundleId = NSBundle.mainBundle.bundleIdentifier;
        defaults.removePersistentDomainForName(bundleId);
        resolve(true);
        return;
      }

      const allAccounts = SAMKeychain.allAccounts();
      if (allAccounts) {
        for (let i = 0; i < allAccounts.count; i++) {
          const key = allAccounts[i].objectForKey(SecureStorage.kSSKeychainAccountKey_copy);
          try {
            const query = SAMKeychainQuery.new();
            query.service = arg && arg.service ? arg.service : SecureStorage.defaultService;
            query.account = key;
            query.deleteItem();
          } catch (e) {
            console.log('SecureStorage: Could not remove key -> ' + key);
          }
        }
      }

      resolve(true);
    });
  }

  public removeAllSync(arg?: RemoveAllOptions) {
    if (this.isSimulator) {
      const defaults = NSUserDefaults.standardUserDefaults;
      const bundleId = NSBundle.mainBundle.bundleIdentifier;
      defaults.removePersistentDomainForName(bundleId);
      return true;
    }

    const allAccounts = SAMKeychain.allAccounts();
    if (allAccounts) {
      for (let i = 0; i < allAccounts.count; i++) {
        const key = allAccounts[i].objectForKey(SecureStorage.kSSKeychainAccountKey_copy);
        try {
          const query = SAMKeychainQuery.new();
          query.service = arg && arg.service ? arg.service : SecureStorage.defaultService;
          query.account = key;
          query.deleteItem();
        } catch (e) {
          console.log('SecureStorage: Could not remove key -> ' + key);
        }
      }
    }
    return true;
  }
}
