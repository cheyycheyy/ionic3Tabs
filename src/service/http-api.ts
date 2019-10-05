import { forwardRef, Injectable, NgModule } from '@angular/core';
// rxjs操作符
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import { NativeUtils } from '../service/native-utils';
import { HttpService } from './http-service';
import { Utils } from './utils';


/**
 * 封装系统所有http请求的内容
 *
 * @export
 * @class HttpApi
 */

@NgModule({ providers: [forwardRef(() => HttpApi)] })
export class HttpApiModule {
}

@Injectable()
export class HttpApi {
  userCode: string = '';//工号
  cardId: string = '';//身份证号
  sortType: number = 0;

  constructor(
    public nativeUtils: NativeUtils,
    public httpService: HttpService,
    public utils: Utils
  ) {

  }

  get_articles(callback) {
    this.httpService.getWithoutLoading("http://api.icheyy.top/api/v1/articles", {})
      .map(res => res.json())
      .subscribe(res => {
        callback(res);
      })
  }

  get_article(id: string, callback) {
    this.httpService.get("http://api.icheyy.top/api/v1/articles/" + id, {})
      .map(res => res.json())
      .subscribe(res => {
        callback(res);
      })
  }

}
