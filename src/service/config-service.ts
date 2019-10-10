import { Injectable, NgModule, forwardRef } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Configuration, Key, CONFIGURATION } from '../application-config';
import { Storage } from "@ionic/storage";
import { Observable } from "rxjs";
/**
 * 配置读取服务
 */

@NgModule({ providers: [forwardRef(() => ConfigService)] })
export class ConfigModule {
}
@Injectable()
export class ConfigService {
  constructor(private platform: Platform,
    private storage: Storage,
  ) {
  }

  // /**
  //  * 取配置 需要传递回调进来
  //  */
  // public getItem(key: string, callback: any): any {
  //     let config;
  //     this.storage.get(key).then(res => { config = res; });
  //     if (config) {
  //         callback(config);
  //     } else {
  //         config = Configuration.getConfig(key);
  //         if (config) {
  //             this.setItem(key, config);
  //         }
  //         callback(config);
  //     }
  // }
  /**
   *预读数据,内存中为空则存,内存中有的放到localstorage中
   *
   */
  readConfig() {
    let self = this;
    for (let i in Key) {
      this.storage.get(Key[i]).then(
        res => {
          if (res == null) {
            self.setItem(Key[i], Configuration.getConfig(Key[i]));
            localStorage.setItem(Key[i], Configuration.getConfig(Key[i]));
          } else {
            localStorage.setItem(Key[i], res);
          }
        }
      );
    }
  }
  /**
   * 取配置
   */
  public getStringItem(key: string, callback?): any {
    if (localStorage.getItem(key) == null) {
      this.storage.get(key)
        .then(res => {//只要能查,即使不存在,走的也是then,结果为null
          if (res) {
            localStorage.setItem(key, res);
          } else if (Configuration.getConfig(key)) {
            this.setItem(key, Configuration.getConfig(key));
            localStorage.setItem(key, Configuration.getConfig(key));
          }
          callback && callback(localStorage.getItem(key));
          console.log('取得值---' + key + "---:" + localStorage.getItem(key));
        })
        .catch(err => { console.log('err' + err) });
    } else {
      callback && callback(localStorage.getItem(key));
    }
    return localStorage.getItem(key);
  }
  public setStringItem(key: string, value: string) {
    localStorage.setItem(key, value);
    this.setItem(key, value);
  }
  /**
   * 取配置
   */
  public getItem(key: string, callback) {
    return this.storage.get(key).then(
      res => {
        callback(res);
      }
    ).catch();
  }

  /**
   * 修改或增加配置项，存储到NativeStorage中
   */
  public setItem(key: string, value: any): any {
    localStorage.setItem(key, value)
    this.storage.set(key, value).then(res => { console.log('存储成功----------' + res); }).catch(err => { console.log('存储失败----------' + err); });
  }

  /**
   * 从数据库(NativeStorage)中移除配置项
   */
  public removeItem(key: string): any {
    this.storage.remove(key).then(res => { console.log('移除成功----------' + res); }).catch(err => { console.log('移除失败----------' + err); });
  }

  /**
  * 取基础网络请求路径
  */
  public getBaseHttpPath(): any {
    let ip = this.getStringItem("REMOTE_IP");
    let port = this.getStringItem("REMOTE_PORT");
    let proxy = this.getStringItem("PROXY");
    if (proxy == "1") {
      return "/mit-service/";
    } else if (proxy == "2") {
      return "http://" + ip + ":" + port + "/msweb/";
    } else {
      return "msweb/";
    }
  }
  /**
  * 取心跳反应地址
  */
  public getHeartPath() {
    let self = this;
    return Observable.create(observer => {
      self.getStringItem("REMOTE_IP", function (ip: string) {

        self.getStringItem("HEART_PORT", function (port: string) {
          observer.next("ws://" + ip + ":" + port + "/msweb");
        });
      });
    });
  }

  public getMenhuPath() {
    return "http://" + CONFIGURATION.MENHU_IP + ":" + CONFIGURATION.MENHU_PORT + "/ds-portal-web/v1/user/verify_user_by_params"
  }


  public static get(key: string) {
    let text = "CONFIGURATION." + key.toUpperCase();
    let value = eval(text);
    return value;
  }


}
