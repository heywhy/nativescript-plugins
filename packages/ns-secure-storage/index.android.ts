import { GetOptions, SetOptions, RemoveOptions, SecureStorageCommon } from './common';
import { Utils } from '@nativescript/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const com: any;

export class SecureStorage extends SecureStorageCommon {
  private hawk; // com.orhanobut.hawk.Hawk

  constructor() {
    super();
    this.hawk = com.orhanobut.hawk.Hawk.init(Utils.android.getApplicationContext()).build();
  }

  public get(arg: GetOptions): Promise<unknown> {
    return new Promise((resolve) => {
      resolve(com.orhanobut.hawk.Hawk.get(arg.key));
    });
  }

  getSync(arg: GetOptions): unknown {
    return com.orhanobut.hawk.Hawk.get(arg.key);
  }

  public set(arg: SetOptions) {
    return new Promise<boolean>((resolve) => {
      resolve(com.orhanobut.hawk.Hawk.put(arg.key, arg.value));
    });
  }

  setSync(arg: SetOptions): boolean {
    return com.orhanobut.hawk.Hawk.put(arg.key, arg.value);
  }

  public remove(arg: RemoveOptions) {
    return new Promise<boolean>((resolve) => {
      resolve(com.orhanobut.hawk.Hawk.delete(arg.key));
    });
  }

  removeSync(arg: RemoveOptions): boolean {
    return com.orhanobut.hawk.Hawk.delete(arg.key);
  }

  public removeAll() {
    return new Promise<boolean>((resolve) => {
      resolve(com.orhanobut.hawk.Hawk.deleteAll());
    });
  }

  public removeAllSync(): boolean {
    return com.orhanobut.hawk.Hawk.deleteAll();
  }
}
