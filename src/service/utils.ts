import { forwardRef, Injectable, NgModule } from '@angular/core';

@NgModule({ providers: [forwardRef(() => Utils)] })
export class UtilsModule {
}
/**
 *
 * Utils类存放和业务无关的公共方法
 * @export
 * @class Utils
 */
@Injectable()
export class Utils {

  constructor() {
  }

  static isEmpty(value): boolean {
    return value == null || typeof value === 'string' && value.length === 0;
  }

  static isNotEmpty(value): boolean {
    return !Utils.isEmpty(value);
  }

  /**
   * 格式“是”or“否”
   * @param value
   * @returns {string|string}
   */
  static formatYesOrNo(value: number | string): string {
    return value == 1 ? '是' : (value == '0' ? '否' : null);
  }


  /**
   * 日期对象转为日期字符串
   * @param date 需要格式化的日期对象
   * @param sFormat 输出格式,默认为yyyy-MM-dd                         年：y，月：M，日：d，时：h，分：m，秒：s
   * @example  dateFormat(new Date())                                "2017-02-28"
   * @example  dateFormat(new Date(),'yyyy-MM-dd')                   "2017-02-28"
   * @example  dateFormat(new Date(),'yyyy-MM-dd hh:mm:ss')         "2017-02-28 09:24:00"
   * @example  dateFormat(new Date(),'hh:mm')                       "09:24"
   * @example  dateFormat(new Date(),'yyyy-MM-ddThh:mm:ss+08:00')   "2017-02-28T09:24:00+08:00"
   * @returns {string}
   */
  dateFormat(date: Date, sFormat: String = 'yyyy-MM-dd hh:mm:ss', timetype = "24-hour"): string {
    let time = {
      Year: 0,
      TYear: '0',
      Month: 0,
      TMonth: '0',
      Day: 0,
      TDay: '0',
      Hour: 0,
      THour: '0',
      hour: 0,
      Thour: '0',
      Minute: 0,
      TMinute: '0',
      Second: 0,
      TSecond: '0',
      Millisecond: 0
    };
    time.Year = date.getFullYear();
    time.TYear = String(time.Year).substr(2);
    time.Month = date.getMonth() + 1;
    time.TMonth = time.Month < 10 ? "0" + time.Month : String(time.Month);
    time.Day = date.getDate();
    time.TDay = time.Day < 10 ? "0" + time.Day : String(time.Day);
    time.Hour = date.getHours();
    time.THour = time.Hour < 10 ? "0" + time.Hour : String(time.Hour);
    if (timetype == '24-hour') {
      time.hour = time.Hour
    } else {
      time.hour = time.Hour < 13 ? time.Hour : time.Hour - 12;
    }
    time.Thour = time.hour < 10 ? "0" + time.hour : String(time.hour);
    time.Minute = date.getMinutes();
    time.TMinute = time.Minute < 10 ? "0" + time.Minute : String(time.Minute);
    time.Second = date.getSeconds();
    time.TSecond = time.Second < 10 ? "0" + time.Second : String(time.Second);
    time.Millisecond = date.getMilliseconds();

    return sFormat.replace(/yyyy/ig, String(time.Year))
      .replace(/yyy/ig, String(time.Year))
      .replace(/yy/ig, time.TYear)
      .replace(/y/ig, time.TYear)
      .replace(/MM/g, time.TMonth)
      .replace(/M/g, String(time.Month))
      .replace(/dd/ig, time.TDay)
      .replace(/d/ig, String(time.Day))
      .replace(/HH/g, time.THour)
      .replace(/H/g, String(time.Hour))
      .replace(/hh/g, time.Thour)
      .replace(/h/g, String(time.hour))
      .replace(/mm/g, time.TMinute)
      .replace(/m/g, String(time.Minute))
      .replace(/ss/ig, time.TSecond)
      .replace(/s/ig, String(time.Second))
      .replace(/fff/ig, String(time.Millisecond))
  }

  /**
   * 获得当前时间字符串
   */
  getCurrentTime(sFormat: String = 'yyyy-MM-dd hh:mm:ss'): string {
    return this.dateFormat(new Date(), sFormat);
  }

  /**
   * 获得当天0点时间
   */
  getCurrentZoreTime(): Date {
    return this.getNDayZoreTime(0);
  }

  /**
 * 获得昨天0点时间
 */
  getYestodayZoreTime(): Date {
    return this.getNDayZoreTime(-1);
  }

  /**
 * 获得n天0点时间，n为正数是向后，n为负数是向前
 */
  getNDayZoreTime(n: number): Date {
    var date = new Date();
    date.setDate(date.getDate() + n);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  }

  /**
   * 每次调用sequence加1
   * @type {()=>number}
   */
  getSequence = (function () {
    let sequence = 100;
    return function () {
      return ++sequence;
    };
  })();

  /**
   * 通过全路径获取文件存储路径
   *
   * @param {string} fullPath
   * @returns {string}
   * @memberof Utils
   */
  getFilePath(fullPath: string): string {
    return fullPath.slice(0, fullPath.lastIndexOf("/") + 1);
  }
  /**
   * 通过全路径获取文件名
   *
   * @param {string} fullPath
   * @returns {string}
   * @memberof Utils
   */
  getFileName(fullPath: string): string {
    return fullPath.slice(fullPath.lastIndexOf("/") + 1);
  }
  /**
   * 通过全路径获取文件类型(.jpg,.mp4等)
   *
   * @param {string} fullPath
   * @returns {string}
   * @memberof Utils
   */
  getFileType(fullPath: string): string {
    return fullPath.slice(fullPath.lastIndexOf("."));
  }

  /**
   * 通过全路径获取文件夹名字(文件夹以"/"结尾)
   *
   * @param {string} fullPath
   * @memberof Utils
   */
  getDirName(fullPath: string) {
    fullPath = fullPath.slice(0, fullPath.lastIndexOf("/"));
    return fullPath.slice(fullPath.lastIndexOf("/") + 1);
  }
  /**
  * 通过全路径获取文件夹路径(文件夹以"/"结尾)
  *
  * @param {string} fullPath
  * @memberof Utils
  */
  getDirPath(fullPath: string) {
    fullPath = fullPath.slice(0, fullPath.lastIndexOf("/"));
    return fullPath.slice(0, fullPath.lastIndexOf("/") + 1);
  }


  getLocation(callback) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(res => {
        alert(res)
        callback(res)
      })
    } else {
      alert("浏览器不支持获取地理位置信息")
    }
  }
  /**
   *
   *
   * @param {any} file 压缩的图片
   * @param {any} obj 压缩配置，可选width，height，quality
   * @param {any} callback ，回掉方法
   * @memberof Utils
   */
  photoCompress(file, obj, callback) {
    let self = this
    let fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = function () {
      let result = this.result;
      self.canvasDataUrl(result, obj, callback)
    }
  }

  canvasDataUrl(path, obj, callback) {
    let img = new Image();
    // 默认图片质量为0.7
    let quality = 0.7;
    img.src = path;
    img.onload = function () {
      let that = this;
      let w = that.offsetWidth,
        h = that.offsetHeight,
        scale = w / h;

      w = obj.width || w;
      h = obj.height || (w / scale);

      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");

      let anw = document.createAttribute("width");
      anw.nodeValue = String(w);
      let anh = document.createAttribute("height");
      anh.nodeValue = String(h);

      canvas.setAttributeNode(anw);
      canvas.setAttributeNode(anh);

      ctx.drawImage(img, 0, 0, w, h);
      if (obj.quality && obj.quality > 0 && obj.quality < 1) {
        quality = obj.quality;
      }
      canvas.toBlob(res => {

      })
      if (obj.resultType && obj.resultType == "dataUrl") {
        callback(canvas.toDataURL("image/jpeg", quality))
      }
      else if (obj.resultType && obj.resultType == "blob") {
        canvas.toBlob(res => {

          callback(new File([res], "filename.jpg"))
        }, "image/jpeg", quality);
      } else {
        let base64 = canvas.toDataURL("image/jpeg", quality)
        canvas.toBlob(res => {
          callback([base64, new File([res], "filename.jpg")])
        })
      }

    }
  }

  /**
   * 计算两个GPS坐标之间的距离
   * @param lon1
   * @param lat1
   * @param lon2
   * @param lat2
   */
  getDistance(lon1: number, lat1: number, lon2: number, lat2: number): number {
    var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lat2 * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = (lon1 * Math.PI / 180.0) - (lon2 * Math.PI / 180.0);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2)
      + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    s = s * 1000;
    return s;
  }

  /**
   * long型时间戳转字符串 yyyy-MM-dd HH:mm:ss
   */
  public dataTransfer(time: string): string {
    return this.dateFormat(new Date(parseInt(time)));
  }

}
