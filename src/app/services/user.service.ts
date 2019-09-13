import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {url_api} from "~/app/configs/url-default";
import {UserModel} from "~/app/models/user.model";

@Injectable({
    providedIn: "root"
})
export class UserService {

    constructor(private http:HttpClient) {}

    index(user: number){
        return this.http.get(`${url_api}api/user`)
    }

    store(user: UserModel){
        return this.http.post(`${url_api}api/user`, user);
    }
}
