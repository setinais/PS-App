import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {url_api} from "~/configs/url-default";
import {AvaliacaoModel} from "~/models/avaliacao.model";

@Injectable({
    providedIn: "root"
})
export class AvaliacaoService {

    constructor(private http:HttpClient) {}

    store(avaliacao: AvaliacaoModel){
        return this.http.post(`${url_api}api/avaliacaos/storeapi`, avaliacao)
    }

}
