import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CredentialsModel} from "~/app/models/credentials.model";
import {url_api} from "~/app/configs/url-default";
import {TokenModel} from "~/app/models/token.model";
import {tap} from "rxjs/internal/operators";
import {setString} from "tns-core-modules/application-settings";
import {getString} from "tns-core-modules/http";

@Injectable({
    providedIn: "root"
})
export class AuthService {

    url_mod: 'api/'
    token: TokenModel

    constructor(private http:HttpClient) {}

    getToken(auth: CredentialsModel){
        return this.http.post(`${url_api}oauth/token`, auth)
            .pipe(tap(response => {
                this.setToken(response as TokenModel)
            }))
    }

    setToken(theToken: TokenModel){
        let today = new Date()
        today.setSeconds(new Date().getSeconds() + 2592000)

        setString("token",theToken.access_token)
        setString("expires_in", today.toString())
        setString("refresh_token",theToken.refresh_token)
    }

    isLoggedIn(){
        return !!getString("token")
    }
}
