import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {url_api} from "~/app/configs/url-default";
import {UserModel} from "~/app/models/user.model";

@Injectable({
    providedIn: "root"
})
export class UserService {

    url_mod: 'api/'

    constructor(private http:HttpClient) {}

    getuser(user: UserModel){
        return this.http.get(`${url_api}${this.url_mod}user`)
    }
}
