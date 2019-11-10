import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {url_api} from "~/configs/url-default";
import {LocalRiscoModel} from "~/models/local-risco.model";

@Injectable({
    providedIn: "root"
})
export class LocalRiscoService {

    constructor(private http:HttpClient) {}

    store(ls: LocalRiscoModel){
        return this.http.post(`${url_api}api/local-risco/storeapi`, ls)
    }

    index(){
        return this.http.get(`${url_api}api/local-risco/index`)
    }
}
