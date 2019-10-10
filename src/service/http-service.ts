import { forwardRef, Injectable, NgModule } from '@angular/core';
import { Headers, Http, RequestOptions, Response, RequestOptionsArgs, RequestMethod, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

// rxjs操作符
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import { NativeUtils } from './native-utils';
import { HTTP, HTTPResponse } from '@ionic-native/http/ngx';
/**
 * 请求内容的属性名
 */
const TYPE_FILE: string = 'file';


/**
 * http请求的统一服务接口
 *
 * @export
 * @class HttpService
 */


@NgModule({ providers: [forwardRef(() => HttpService)] })
export class HttpSvModule {
}

@Injectable()
export class HttpService {

    constructor(
        public http: Http,
        public nativeutils: NativeUtils,
        public ionichttp: HTTP
    ) {

    }

    public request(url: string, options: RequestOptionsArgs, isLoading: boolean = true): Observable<Response> {
        return Observable.create((observer) => {
            if (isLoading) {
                this.nativeutils.showLoading();
            }
            console.log('%c 请求前 %c', 'color:blue', '', 'url', url, 'options', options);
            let observable = this.http.request(url, options).subscribe(res => {
                this.nativeutils.loadingDismiss();
                console.log('%c 请求成功 %c', 'color:green', '', 'url', url, 'options', options, 'res', res);
                observer.next(res);
                observable.unsubscribe();
            }, err => {
                console.log('%c 请求失败 %c', 'color:red', '', 'url', url, 'options', options, 'err', err);
                this.requestFailed(url, options, err);//处理请求失败
                observer.error(err);
                observable.unsubscribe();
            });
        });
    }

    public get(url: string, paramMap?: any): Observable<Response> {
        return this.request(url, new RequestOptions({
            method: RequestMethod.Get,
            search: HttpService.buildURLSearchParams(paramMap)
        }));
    }

    public getWithoutLoading(url: string, paramMap?: any): Observable<Response> {
        return this.request(url, new RequestOptions({
            method: RequestMethod.Get,
            search: HttpService.buildURLSearchParams(paramMap)
        }), false);
    }

    // public upload(url, body): Observable<Response> {
    //     return this.request(this.addTimeStamp(url), new RequestOptions({
    //         method: RequestMethod.Post,
    //         body: body,
    //         // headers:new Headers({
    //         //   'Content-Type':'multipart/form-data'
    //         // })
    //     }))
    // }

    /*   
       public post(url: string, body: any): Observable<Response> {
           return this.request(this.addTimeStamp(url), new RequestOptions({
               method: RequestMethod.Post,
               body: JSON.stringify(body),
               headers: new Headers({
                   'Content-Type': 'application/json; charset=UTF-8'
               })
           }));
       }
   
       public postWithoutLoading(url: string, body: any): Observable<Response> {
           return this.requestWithoutLoading(this.addTimeStamp(url), new RequestOptions({
               method: RequestMethod.Post,
               body: JSON.stringify(body),
               headers: new Headers({
                   'Content-Type': 'application/json; charset=UTF-8'
               })
           }));
       }
   
       public postFormData(url: string, paramMap: any): Observable<Response> {
           return this.request(url, new RequestOptions({
               method: RequestMethod.Post,
               search: HttpService.buildURLSearchParams(paramMap).toString(),
               headers: new Headers({
                   'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
               })
           }));
       }
   
       public postAuth(url: string, paramMap: any, header?: Headers): Observable<Response> {
           return this.request(url, new RequestOptions({
               method: RequestMethod.Post,
               search: HttpService.buildURLSearchParams(paramMap).toString(),
               headers: header
           }));
       }
   
       public put(url: string, body: any): Observable<Response> {
           return this.request(this.addTimeStamp(url), new RequestOptions({
               method: RequestMethod.Put,
               body: body
           }));
       }
   
       public delete(url: string, paramMap: any): Observable<Response> {
           return this.request(url, new RequestOptions({
               method: RequestMethod.Delete,
               search: HttpService.buildURLSearchParams(paramMap).toString()
           }));
       }
   
       public patch(url: string, body: any): Observable<Response> {
           return this.request(this.addTimeStamp(url), new RequestOptions({
               method: RequestMethod.Patch,
               body: body
           }));
       }
   
       public head(url: string, paramMap: any): Observable<Response> {
           return this.request(url, new RequestOptions({
               method: RequestMethod.Head,
               search: HttpService.buildURLSearchParams(paramMap).toString()
           }));
       }
   
       public options(url: string, paramMap: any): Observable<Response> {
           return this.request(url, new RequestOptions({
               method: RequestMethod.Options,
               search: HttpService.buildURLSearchParams(paramMap).toString()
           }));
       }*/

    /**
     * 将对象转为查询参数
     * @param paramMap
     * @returns {URLSearchParams}
     */
    private static buildURLSearchParams(paramMap): URLSearchParams {
        let params: URLSearchParams = new URLSearchParams();
        // 在路径中增加一个时间戳参数，防止部分WebView的缓存
        // params.set('RandomTimeStampAvoidCache', new Date().getTime() + '');
        if (!paramMap) {
            return params;
        }
        for (let key in paramMap) {
            let val = paramMap[key];
            if (val instanceof Date) {
                // val = Utils.dateFormat(val, 'yyyy-MM-dd hh:mm:ss')
            }
            params.set(key, val);
        }
        return params;
    }

    //     /**
    //      * 为路径增加一个时间轴参数，防止部分webView的缓存
    //      * 注意：只有Post才可调用该方法
    //      */
    //     public addTimeStamp(url: string): string {
    //         return url + '?RandomTimeStampAvoidCache=' + new Date().getTime();
    //     }

    //     /**
    //      * 文件上传
    //      * url: 文件上传的路径
    //      * body: 请求体(对象)
    //      * filePath: 要上传的文件相对路径
    //      * callback: 上传文件的回调
    //      */
    //     public fileUpload(url: string, body: any, filePath: string, callback: any) {
    //         let headers = new Headers();
    //         headers.set('Content-Type', 'multipart/form-data');
    //         let uploadBody = { 'data': JSON.stringify(body) };
    //         this.ionichttp.uploadFile(this.addTimeStamp(url), uploadBody, headers, filePath, TYPE_FILE)
    //             .then(response => this.fileAfter(response, callback))
    //             .catch(err => { this.requestFailed(url, '', err); });
    //     }

    //     /**
    //      * 此处为文件上传返回时调用的方法
    //      */
    //     private fileAfter(res: HTTPResponse, callback: any) {
    //         let json = JSON.parse(res.data);
    //         callback(json);
    //     }



    /**
  * 处理请求失败事件
  * @param url
  * @param options
  * @param err
  */
    private requestFailed(url: string, options, err) {
        this.nativeutils.loadingDismiss();
        console.log('%c 请求失败 %c', 'color:red', 'options', options, 'url', url, 'err', err);
        let msg = '请求发生异常', status = err.status;
        if (!this.nativeutils.isNetConnecting()) {
            msg = '无网络连接，请先连接网络';
        } else {
            if (status === 0) {
                msg = '请求响应出错';
            } else if (status === 404) {
                msg = '未找到请求地址';
            } else if (status === 500) {
                msg = '服务器出错，请稍后再试';
            }
        }
        this.nativeutils.showAlert('请求失败', msg, '确定');
    }

}
