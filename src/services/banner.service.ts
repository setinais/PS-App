import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {url_api} from "~/configs/url-default";

@Injectable({
    providedIn: "root"
})
export class BannerService {

    constructor(private http:HttpClient) {}

    show(){
        return this.http.get(`${url_api}api/banners`)
    }

    checkUpdates(){
        return this.http.get(`${url_api}api/check`)
    }

    getHospitais(){
        return this.http.get(`${url_api}api/hospitais`)
    }
    getUbs(){
        return this.http.get(`${url_api}api/ubs`)
    }
    getUbsHid(id: number){
        return this.http.get(`${url_api}api/ubsh/${id}`)
    }
}
