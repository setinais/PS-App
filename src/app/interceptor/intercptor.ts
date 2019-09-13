import {Injectable} from "@angular/core";
import {HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "~/app/services/auth.service";
import {getString} from "tns-core-modules/http";

@Injectable()
export class TokenInterceptor  implements HttpInterceptor{

    constructor(private _loginService: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this._loginService.isLoggedIn()) {
            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${getString("token")}`
                })
            }
            const request = req.clone(httpOptions)
            return next.handle(request)
        }

        return next.handle(req);
    }

}
