import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CredentialsModel} from "~/models/credentials.model";
import {url_api} from "~/configs/url-default";
import {TokenModel} from "~/models/token.model";
import {tap} from "rxjs/internal/operators";
import {getString, setBoolean, setString} from "tns-core-modules/application-settings";

@Injectable({
    providedIn: "root"
})
export class AuthService {

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
        setBoolean("status_auth", true)

    }

    isLoggedIn(){
        let date = new Date(getString("expires_in"))
        let date_atual = new Date()
        if(date.getTime() <= date_atual.getTime())
            setString("token", "");
        return !!getString("token")
    }

    logout(){
        setString("token","")
        setString("expires_in", "")
        setString("refresh_token", "")
        setString("user_id", "")
        setBoolean("status_auth", false)
    }
}
