import { Component, OnInit } from '@angular/core';
import {LocalRiscoModel} from "~/models/local-risco.model";
import {requestCameraPermissions, takePicture} from "nativescript-camera";
import {fromAsset} from "tns-core-modules/image-source";
import {isAndroid} from "tns-core-modules/platform";
import {getCurrentLocation, enableLocationRequest, isEnabled} from "nativescript-geolocation";
import { Accuracy } from "tns-core-modules/ui/enums";
@Component({
    selector: 'ns-local-risco-add',
    templateUrl: './local-risco-add.component.html',
    styleUrls: ['./local-risco-add.component.css']
})
export class LocalRiscoAddComponent implements OnInit {

    private processing:boolean = false
    private lr: LocalRiscoModel
    private form
    private photoPath: string = ""
    constructor() {
        this.lr = new LocalRiscoModel()

    }

    ngOnInit() {
        requestCameraPermissions()
        enableLocationRequest();
        this.getLocation()
    }

    capturePhoto() {
        let options = {
            width: 250,
            height: 300,
            keepAspectRatio: true,
            saveToGallery: false
        }

        takePicture(options)
            .then(image => {
                if(isAndroid)
                    this.photoPath = image['_android']
                fromAsset(image)
                    .then(img => {
                        let base64 = img.toBase64String("jpeg", 100)
                        //Aqui emitir o evento para o outro component
                        this.setImg(base64)
                    })
            })

    }

    setImg(imgBase64: string) {
        this.lr.imagens = imgBase64;
    }

    getLocation(){
        console.log('tew')
        if(isEnabled()){
            let localizacao = getCurrentLocation({ desiredAccuracy: Accuracy.high, maximumAge: 5000, timeout: 20000 })
            console.log(localizacao)
        }else{
            alert('Ative o serviço de localização!')
        }

    }
}
