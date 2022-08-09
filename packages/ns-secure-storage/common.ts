import { ApplicationSettings } from '@nativescript/core';

export interface SetOptions {
  accessGroup?: string;
  service?: string;
  key: string;
  value: string;
}

export interface GetOptions {
  accessGroup?: string;
  service?: string;
  key: string;
}

export interface RemoveOptions {
  accessGroup?: string;
  service?: string;
  key: string;
}

export interface RemoveAllOptions {
  service?: string;
}

export type Options = {
  accessibilityType?: string;
  disableFallbackToUserDefaults?: boolean;
};

export abstract class SecureStorageCommon {
  protected static IS_FIRST_RUN = '__IS_FIRST_RUN__';
  private isFirst: boolean;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(_options?: Options) {
    this.isFirst = ApplicationSettings.getBoolean(SecureStorageCommon.IS_FIRST_RUN, true);
    if (this.isFirst) {
      ApplicationSettings.setBoolean(SecureStorageCommon.IS_FIRST_RUN, false);
    }
  }

  abstract get(arg: GetOptions): Promise<unknown>;

  abstract getSync(arg: GetOptions): unknown;

  abstract set(arg: SetOptions): Promise<boolean>;

  abstract setSync(arg: SetOptions): boolean;

  abstract remove(arg: RemoveOptions): Promise<boolean>;

  abstract removeSync(arg: RemoveOptions): boolean;

  abstract removeAll(arg?: RemoveAllOptions): Promise<boolean>;

  abstract removeAllSync(arg?: RemoveAllOptions): boolean;

  public isFirstRunSync() {
    return this.isFirst;
  }

  public isFirstRun() {
    return new Promise<boolean>((resolve) => {
      resolve(this.isFirstRunSync());
    });
  }

  public clearAllOnFirstRun() {
    return new Promise<boolean>((resolve) => {
      if (this.isFirstRunSync()) {
        this.removeAll();
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  public clearAllOnFirstRunSync() {
    try {
      if (this.isFirstRunSync()) {
        this.removeAllSync();
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
