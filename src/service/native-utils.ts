import { forwardRef, Injectable, NgModule } from '@angular/core';
import { Toast } from '@ionic-native/toast/ngx';
import { Storage } from "@ionic/storage";
import { ActionSheetController, Alert, AlertController, Events, Loading, LoadingController, Platform, ToastController } from 'ionic-angular';
import { Utils } from "./utils";

declare let cordova: any;
/**
 * ionic原生工具封装
 *
 * @export
 * @class NativeUtils
 */

@NgModule({ providers: [forwardRef(() => NativeUtils)] })
export class NativeModule {
}

@Injectable()
export class NativeUtils {
  public loading: Loading;
  private isLoading: boolean = false;
  private alert: Alert;
  private isAlertShowing: boolean = false;

  constructor(
    public toastCtrl: ToastController,
    public toast: Toast,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    public events: Events,
    public utils: Utils,
  ) {

  }

  /**
   * 退出应用
   */
  exitApp() {
    this.platform.exitApp();
  }

  /**
  * 显示提示信息
  * @param message 信息内容
  * @param duration 显示时长
  * @param position 显示位置
  *
  */
  showToast(message: string) {
    if (this.isMobile()) {
      this.showToastShort(message);
    } else {
      this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: 'middle'
      }).present();
    }
  };

  showToastLong(message: string) {
    this.toast.showLongBottom(message).subscribe();
  };
  showToastShort(message: string) {
    this.toast.showShortBottom(message).subscribe();
  }

  showLoading(message: string = '加载中...', duration: number = 3000) {
    let self = this;
    this.loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: message,
      duration: duration,
      dismissOnPageChange: false
    });
    this.isLoading = true;
    this.loading.onDidDismiss(() => {
      self.isLoading = false;
      self.loading = null;
      console.log('Dismissed loading');
    });

    this.loading.present();
  }

  public loadingDismiss() {
    console.log('Dismissed loading');
    let self = this;
    if (this.isLoading && this.loading) {
      // setTimeout(function () {
      this.loading.dismiss()
      self.loading = null;
      self.isLoading = false;
      // }, 200);
    }
  }

  showAlert(title: string, message: string, text: string = null, callback?: any) {
    if (!this.isAlertShowing) {
      if (text) {
        this.alert = this.alertCtrl.create(
          {
            title: title, message: message, enableBackdropDismiss: true, buttons: [{
              text: text,
              handler: () => {
                callback && callback();
              }
            }]
          }
        );
      } else {
        this.alert = this.alertCtrl.create(
          { title: title, message: message, enableBackdropDismiss: true }
        );
      }
      this.alert.present();
      this.isAlertShowing = true;
      this.alert.onDidDismiss(() => { this.isAlertShowing = false });
    }
  }


  showChoiceAlert(title: string, message: string, sureText: string, callback) {
    this.alert = this.alertCtrl.create(
      { title: title, message: message, enableBackdropDismiss: true, buttons: [{ text: '取消', handler: () => { } }, { text: sureText, handler: () => { callback(); } }] }
    );
    if (!this.isAlertShowing) {
      this.alert.present();
      this.isAlertShowing = true;
    }
    this.alert.onDidDismiss(() => { this.isAlertShowing = false });
  }

  // showAlert(title: string, message: string, textArr?: string[], callback?: any, subtitle?: string) {
  //     this.alert = this.alertCtrl.create({ title: title, subTitle: subtitle, message: message });
  //     if (textArr != null) {
  //         for (var i = 0; i < textArr.length; i++) {
  //             this.alert.addButton(
  //                 {
  //                     text: textArr[i],
  //                     role: 'destructive',
  //                     handler: (event) => {
  //                         if (callback) {
  //                             callback(event.currentTarget.innerText)
  //                         }
  //                     }
  //                 }
  //             );
  //         }
  //     }
  //     this.alert.present();
  // }

  /**
   * 显示actionsheet
   * title：actionsheet的标题
   * textArr：actionsheet显示的内容
   * callback：actionsheet点击后的回调，回传点击的参数
   */
  public showActionSheet(title: string, textArr: string[], callback: any) {
    let actionSheet = this.actionSheetCtrl.create({
      title: title,
      buttons: []
    });
    if (textArr != null) {
      for (var i = 0; i < textArr.length; i++) {
        let text = textArr[i];
        actionSheet.addButton({
          text: text,
          role: 'destructive',
          handler: () => {
            if (callback) {
              callback(text);
              console.log(text);
            }
          }
        });
      }
      actionSheet.present();
    }
  }

  /**
 * 显示Alert对话框 内容包含一个可选择的列表
 * title：actionsheet的标题
 * textArr：actionsheet显示的内容
 * callback：actionsheet点击后的回调，回传点击的参数
 */
  public showListAlert(title: string, textArr: string[], callback: any) {
    let alert = this.alertCtrl.create();
    alert.setTitle(title);
    if (textArr != null) {
      for (let i = 0; i < textArr.length; i++) {
        alert.addInput({
          type: 'radio',
          label: textArr[i],
          value: textArr[i]
        });
      }
      alert.addButton('取消');
      alert.addButton({
        text: '确定',
        handler: data => {
          callback(data);
        }
      });
      alert.present();
    }
  }

  // /*********************多媒体*****************/
  // takeAudio(callback): any {
  //     let paths: string[] = [];
  //     let options: CaptureAudioOptions = { limit: 1, duration: 30 };
  //     this.mediaCapture.captureAudio(options).then(
  //         function (res: MediaFile[]) {
  //             for (var key in res) {
  //                 paths.push(res[key].fullPath);
  //             }
  //             callback(paths);
  //         }).catch(
  //         err => { this.showToast(err) });
  // }
  // takeVideo(callback): any {
  //     let paths: string[] = [];
  //     let options: CaptureVideoOptions = { limit: 1, duration: 10, quality: 10 };
  //     this.mediaCapture.captureVideo(options)
  //         .then(function (res: MediaFile[]) {
  //             for (var key in res) {
  //                 paths.push(res[key].fullPath);
  //             }
  //             callback(paths);
  //         }
  //         ).catch(err => { this.showToast(err) });
  // }
  // takePhoto(callback) {
  //     let paths: string[] = [];
  //     let options: CaptureImageOptions = { limit: 1 };
  //     this.mediaCapture.captureImage(options)
  //         .then(function (res: MediaFile[]) {
  //             for (var key in res) {
  //                 paths.push(res[key].fullPath);
  //             }
  //             callback(paths);
  //         }
  //         ).catch(err => { this.showToast(err) });;
  // }
  // /**
  //  * 设置拍照的参数
  //  */
  // setOptions(srcType) {
  //     var options = {
  //         // Some common settings are 20, 50, and 100
  //         quality: 50,//保存的图像质量，范围为0 - 100
  //         destinationType: Camera.DestinationType.FILE_URI,//返回值格式,DATA_URL:base64,FILE_URI:图片路径
  //         // In this app, dynamically set the picture source, Camera or photo gallery
  //         sourceType: srcType,//图片来源,CAMERA:拍照,PHOTOLIBRARY:相册
  //         encodingType: Camera.EncodingType.JPEG,
  //         mediaType: Camera.MediaType.PICTURE,
  //         allowEdit: true,
  //         correctOrientation: true,  //Corrects Android orientation quirks
  //         //     targetWidth: 800,//缩放图像的宽度（像素）
  //         //  targetHeight: 800,//缩放图像的高度（像素）
  //         saveToPhotoAlbum: true//是否保存到相册
  //     }
  //     return options;
  // }

  // openCamera(callback) {
  //     var options = this.setOptions(1);
  //     Camera.getPicture(options).then((imageData) => {
  //         callback(imageData);
  //     }, (err) => {
  //         this.showToast("拍摄失败！");
  //     });
  // }
  openFile(filePath: string, fileType: string) {
    // this.fileOpener.open(filePath, fileType).then(
    //     () => console.log('File is opened')
    // ).catch(
    //     e => console.log('Error openening file', e)
    //     );
  }


  getFileType(fullPath: string): string {
    let result;
    switch (fullPath.slice(fullPath.lastIndexOf(".") + 1)) {
      case "jpg":
        result = "image/jpeg";
        break;
      case "amr":
        result = "audio/amr";
        break;
      case "mp4":
        result = "video/mp4";
        break;

      default:
        break;
    }
    return result;
  }


  openImage(filePath: string) {
    // this.photoViewer.show(filePath);
  }
  // playAudio(filePath: string) {
  //     this.mediaPlugin.create(filePath, status => { }, () => { },
  //         err => { console.error(err) }).play();
  // }
  // registNativeAudio(key: string, filePath: string) {
  //     this.nativeAudio.preloadSimple(key, filePath).then().catch();
  // }
  // playNativeAudio(key: string) {
  //     this.nativeAudio.play(key).then().catch();
  // }

  /*********************数据库操作*****************/
  sqSave() {
    // this.sqLite.create(
    //     {
    //         name: "data.db",
    //         location: "default"
    //     }
    // ).then((db: SQLiteObject) => {
    //     db.executeSql('creat table my', {}).then(

    //     );
    // });
  }

  /*********************事件管理*****************/
  /**
  * 注册事件
  *
  */
  regist(key: string, callback: Function) {
    this.events.subscribe(key, callback);
  }
  /**
   * 处理事件
   *
   */
  publish(key: string, ...args: any[]) {
    this.events.publish(key, args);
  }
  /**
  * 取消事件
  *
  */
  remove(key: string, callback?: Function) {
    this.events.unsubscribe(key, callback);
  }



  /**
   * 获取imei
   * @memberof NativeUtils
   */
  getImei(callback) {
    cordova.plugins.imei.coolMethod("coolMethod",
      res => { callback(res) },
      err => { console.log(err) }
    );

  }


  /**
   * 手机振动
   *
   * @memberof NativeUtils
   */
  // shake() {
  //     this.vibration.vibrate([1000, 500, 1000, 500, 1000]);
  // }
  /**
   * 通知
   *
   * @memberof NativeUtils
   */
  setNotification() {
    // this.notification.create("ds", {
    //     body: "xxx", tag: "Xxx", icon: "img/ic_user.png"
    // });
  }

  /*********************运行环境*****************/
  public isMobile(): boolean {
    return this.platform.is('mobile') && !this.platform.is('mobileweb');
  }
  public isAndroid(): boolean {
    return this.isMobile() && this.platform.is('android');
  }
  public isIos(): boolean {
    return this.isMobile() && this.platform.is('ios');
  }

  /**********************网络信息*******************/
  getNetworkType() {
    if (this.isMobile()) {
      // this.network.type;
    } else {
      return 'wifi';
    }
  }
  isNetConnecting() {
    return this.getNetworkType() != 'none';
  }

  /***********************app信息********************/
  // getAppName(callback?) {
  //     return this.appVersion.getAppName().then(res => { callback(res) }).catch(err => { console.log(err); });
  // }
  // getPackageName(callback?) {
  //     return this.appVersion.getPackageName().then(res => { callback(res) }).catch(err => { console.log(err); });
  // }
  // /**
  //  * 版本号,内部用的
  //  * @returns
  //  * @memberof NativeUtils
  //  */
  // getVersionCode(callback?) {
  //     return this.appVersion.getVersionCode().then(res => { callback(res) }).catch(err => { console.log(err); });
  // }
  // /**
  //  * 版本名,显示给用户看的
  //  * @returns
  //  * @memberof NativeUtils
  //  */
  // getVersionNumber(callback?) {
  //     return this.appVersion.getVersionNumber().then(res => { callback(res) }).catch(err => { console.log(err); });
  // }

  /*********************坐标信息******************/
  // getLocation(callback) {
  //     let geoOptions: GeolocationOptions = { enableHighAccuracy: true };
  //     this.geolocation.getCurrentPosition().then(res => {
  //         callback(res.coords);
  //     }).catch(
  //         err => {
  //             this.showToast(err.message);
  //         });
  // }
  /*********************文件操作******************/
  getSdCard(): string {
    // return this.file.externalRootDirectory;
    return ''
  }
  moveFile(path: string, fileName: string, newPath: string, newFileName: string, callback?: any) {
    // this.file.moveFile(path, fileName, newPath, newFileName).then(
    //     res => {
    //         callback(newPath + "/" + newFileName);
    //     }
    // ).catch(
    //     err => {
    //         console.error(err);
    //     })
  }

  creatDir(path: string, dirName: string) {
    // this.file.createDir(path, dirName, true);
  }
  isDirExist(path: string, dir: string) {
    // return this.file.checkDir(path, dir).then(res => { console.log(res) }).catch(err => { console.error(err); });
  }
  renameFile(fullPath: string, callback?: any) {
    this.moveFile(this.utils.getFilePath(fullPath), this.utils.getFileName(fullPath), this.utils.getFilePath(fullPath), this.utils.dateFormat(new Date()), callback);
  }
  getFileList(dirPath: string, dirName: string, callback) {
    // this.file.listDir(dirPath, dirName).then(function (res: Entry[]) {
    //     // var fileList: string[]=[];
    //     // for (var key in res) {
    //     //     if (res.hasOwnProperty(key)) {
    //     //         var element = res[key];
    //     //         element.isFile && fileList.push(element.nativeURL);
    //     //     }
    //     // }
    //     callback(res);
    // }).catch(err => { console.error(err) });
  }
  deleteFile(filePath: string, fileName: string, callback?) {
    // this.file.removeFile(filePath, fileName).then(res => { callback }).catch(err=>{console.error(err)});
  }
  /**
   * 删除文件夹,如果有子文件,则不删除
   *
   * @param {string} dirPath
   * @param {string} dirName
   * @memberof NativeUtils
   */
  deleteDir(dirPath: string, dirName: string) {
    // this.file.removeDir(dirPath, dirName).then().catch(err => {
    //     console.error(err);
    // });
  }
  /**
   * 删除文件夹以及所有子文件
   *
   * @param {string} dirPath
   * @param {string} dirName
   * @memberof NativeUtils
   */
  deleteDir2(dirPath: string, dirName: string) {
    // let self = this;
    // this.getFileList(dirPath, dirName, function (res: Entry[]) {
    //     if (res && res.length != 0) {
    //         for (var item in res) {

    //             if (res[item].isDirectory) {
    //                 //循环删除所有文件
    //                 self.deleteDir2(self.utils.getDirPath(res[item].nativeURL), res[item].name);
    //             } else {
    //                 //每次删除文件之后尝试删除文件夹
    //                 self.file.removeFile(self.utils.getFilePath(res[item].nativeURL), self.utils.getFileName(res[item].nativeURL)).then(res => {
    //                     self.deleteDir(dirPath, dirName)
    //                 }).catch();
    //             }
    //         }
    //     }
    //     self.deleteDir(dirPath, dirName);
    // });
  }

  /**********************app更新******************/
  updateVersion() {
    //引入版本升级模块还是自己做?

  }
  checkUpdate(url: string) {
    // let self = this;
    // self.getAppName(res => {
    //     self.http.get(url){

    //     }
    // });

  }
}
