import {Injectable} from "@angular/core";
import {HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginService} from "../";
import {TokenService} from "~/app/services/token.service";

@Injectable()
export class TokenInterceptor  implements HttpInterceptor{

    constructor(private _loginService: LoginService,
                private _token: TokenService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this._loginService.isLoggedIn()) {
            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this._token.geToken()}`
                })
            }
            const request = req.clone(httpOptions)
            return next.handle(request)
        }

        return next.handle(req);
    }

}
