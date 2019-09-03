import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
    private platform: Platform,
    private nativeStorage: NativeStorage,
    public storage: Storage,



  ) { }
  public set(settingName,value){
    if (this.platform.is('cordova')) {
      return this.nativeStorage.setItem(`setting:${ settingName }`,value);
    } else {
      return this.storage.set(`setting:${ settingName }`,value);
    }
  }
  public async get(settingName){
    if (this.platform.is('cordova')) {
      return await this.nativeStorage.getItem(`setting:${ settingName }`);
    } else {
      return await this.storage.get(`setting:${ settingName }`);
    }
  
  }
  public async remove(settingName){
    if (this.platform.is('cordova')) {
      return await this.nativeStorage.remove(`setting:${ settingName }`);
    } else {
      return await this.storage.remove(`setting:${ settingName }`);
    }

  }
  public clear() {
    if (this.platform.is('cordova')) {
      this.nativeStorage.clear().then(() => {
        console.log('all keys cleared');
      });
      } else {
      this.storage.clear().then(() => {
        console.log('all keys cleared');
      });
      }

  }
}
