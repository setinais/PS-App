import { Component, OnInit } from '@angular/core';
import {LocalRiscoModel} from "~/models/local-risco.model";
import {requestCameraPermissions, takePicture} from "nativescript-camera";
import {fromAsset} from "tns-core-modules/image-source";
import {isAndroid} from "tns-core-modules/platform";
import {
    getCurrentLocation,
    enableLocationRequest,
    isEnabled
} from "nativescript-geolocation";
import { Accuracy } from "tns-core-modules/ui/enums";
import {Page} from "tns-core-modules/ui/page";
import {LocalRiscoService} from "~/services/local-risco.service";
import {Image} from "tns-core-modules/ui/image";
import {fs} from "@angular-devkit/core/node";
import * as bgHttp from "nativescript-background-http"
import {url_api} from "~/configs/url-default";
import {LocalizacaoModel} from "~/models/visualizacao.model";
import {getString} from "tns-core-modules/application-settings";
import {RouterExtensions} from "nativescript-angular";

@Component({
    selector: 'ns-local-risco-add',
    templateUrl: './local-risco-add.component.html',
    styleUrls: ['./local-risco-add.component.css']
})
export class LocalRiscoAddComponent implements OnInit {

    private processing:boolean = false
    lr: LocalRiscoModel
    private image
    private photoPath: string = ""

    public locations: LocalizacaoModel;
    watchIds = [];

    constructor(private page: Page, private lrs: LocalRiscoService, private rt: RouterExtensions) {
        this.lr = new LocalRiscoModel();
        this.lr.location = new LocalizacaoModel()
        this.locations = new LocalizacaoModel()
        this.session = bgHttp.session("image-upload");
    }

    ngOnInit() {
        requestCameraPermissions()
        enableLocationRequest();
        this.image = new Image()
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
                this.image.imageSource = image
                if(isAndroid)
                    this.photoPath = image['_android']
                fromAsset(image)
                    .then(img => {
                        let base64 = img.toBase64String("jpeg", 100)
                        //Aqui emitir o evento para o outro component

                    })
            })

    }

    store(){
        console.log(this.lr)
        this.lr.location = this.locations
        this.processing = true
        this.lrs.store(this.lr).subscribe(response => {
            this.upload(response['data']['id']);
            console.log(response)
        }, error => {
            this.processing = false
            console.log(error)
        })
    }

    getLocation(){

        if(isEnabled()){
            let that = this;
            getCurrentLocation({
                desiredAccuracy: Accuracy.high,
                maximumAge: 5000,
                timeout: 10000
            }).then(function (loc) {
                if (loc) {
                    that.locations.latitude = loc.latitude
                    that.locations.longitude = loc.longitude
                }
            }, function (e) {
                // console.log("Error: " + (e.message || e));
            });
        }else{
            alert('Ative o serviço de localização!')
        }

    }

    public tasks: bgHttp.Task[] = [];
    public events: { eventTitle: string, eventData: any }[] = [];
    private counter: number = 0;
    private session: any;
    private showMessage: boolean = false
    private message: string = ""
    private background: any

    upload(id: number) {
        this.start_upload(false, false, id);
    }

    start_upload(should_fail, isMulti, id) {

        const name = this.photoPath.substr(this.photoPath.lastIndexOf("/") + 1);
        const description = `${name} (${++this.counter})`;
        const request = {
            url: `${url_api}api/local-risco/uploadImage/${id}`,
            method: "POST",
            headers: {
                "Content-Type": "application/octet-stream",
                "File-Name": name,
                'Accept': 'application/json',
                'Authorization': `Bearer ${getString("token")}`
            },
            description: description,
            androidAutoDeleteAfterUpload: false,
            androidNotificationTitle: 'NativeScript HTTP background',
        };

        if (should_fail) {
            request.headers["Should-Fail"] = true;
        }

        let task: bgHttp.Task;
        let lastEvent = "";

        const params = [
            { name: "status", value: "iamge"},
            { name: "fileToUpload", filename: this.photoPath, mimeType: 'image/jpeg' }
        ];
        task = this.session.multipartUpload(params, request);


        function onEvent(e) {
            if (lastEvent !== e.eventName) {
                // suppress all repeating progress events and only show the first one
                lastEvent = e.eventName;
            } else {
                return;
            }

            this.events.push({
                eventTitle: e.eventName + " " + e.object.description,
                eventData: JSON.stringify({
                    error: e.error ? e.error.toString() : e.error,
                    currentBytes: e.currentBytes,
                    totalBytes: e.totalBytes,
                    body: e.data,
                    responseCode: e.responseCode
                })
            });
        }
        function progressHandler(e) {
            console.log("Progress " + e.currentBytes + " / " + e.totalBytes);
        }

// event arguments:
// task: Task
// responseCode: number
// error: java.lang.Exception (Android) / NSError (iOS)
// response: net.gotev.uploadservice.ServerResponse (Android) / NSHTTPURLResponse (iOS)
        let that = this;
        function errorHandler(e) {
            console.log("error " + e.responseCode + " code." + e.toString());
            var serverResponse = e.response;
        }


// event arguments:
// task: Task
// responseCode: number
// data: string
        function respondedHandler(e) {
            console.log("response " + e.responseCode + " code. Server sent: " + e.data);
            that.successImage(e.data);
        }

// event arguments:
// task: Task
// responseCode: number
// response: net.gotev.uploadservice.ServerResponse (Android) / NSHTTPURLResponse (iOS)
        function completeHandler(e) {
            console.log("complete " + e.responseCode + " code");
            var serverResponse = e.response;
        }


        task.on("progress", progressHandler);
        task.on("error", errorHandler);
        task.on("responded", respondedHandler);
        task.on("complete", completeHandler);
        lastEvent = "";
        this.tasks.push(task);
    }

    successImage(data){
        this.processing = false;
        this.lr = new LocalRiscoModel();
        this.lr.location = new LocalizacaoModel();
        this.locations = new LocalizacaoModel();
        this.session = bgHttp.session("image-upload");
        this.tasks = [];
        this.events = [];
        this.photoPath = "";
        this.showMessage = true;
        this.message = "Cadastrado com sucesso!";
        this.background = 'rgba(42,183,20,0.8)';
        setTimeout(() => {
            this.showMessage = false
        }, 3000);
    }
}
