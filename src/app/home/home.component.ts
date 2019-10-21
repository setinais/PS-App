import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ContentView, Page} from "tns-core-modules/ui/page";
import { screen } from "tns-core-modules/platform";

import {RouterExtensions} from "nativescript-angular";
import {BannerService} from "~/services/banner.service";
import {PageChangeEventData} from "nativescript-image-swipe";
import {Accuracy} from "tns-core-modules/ui/enums";
import any = Accuracy.any;

declare var android: any;

@Component({
  selector: 'ns-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    private id = undefined;
    private slideCount = 0;
    private slideNumber: number = 0
    private fail_load: boolean = false
    private screenWidth;

    @ViewChild('slideContent', {static:true}) slide: ElementRef;
    private slideView: ContentView;
    private imagens: any[] = []
    constructor(private page: Page,
                private nav: RouterExtensions,
                private bannerService: BannerService) {
        this.page.actionBarHidden = !this.page.actionBarHidden
        this.screenWidth = screen.mainScreen.widthDIPs;

    }

    ngOnInit() {
        this.bannerInit();
        this.page.cssClasses.add("welcome-page-background");
        this.page.backgroundSpanUnderStatusBar = true;
    }
    bannerInit(){
        try{
            this.bannerService.show().subscribe(response =>{
                this.imagens = []
                for (let i=0;i<response['data'].length;i++) this.imagens.push(response['data'][i])
                console.log(this.imagens);
                this.slideCount = response['data'].length;
                this.autoSlider()
                this.fail_load = true;
            }, error => {
                this.fail_load = false;
            });
        }catch (e) {
            this.fail_load = false
        }
    }


    pageChanged(e: PageChangeEventData) {
        this.slideNumber = e.page;
    }

    autoSlider(){
        if(this.id != undefined)
            this.finishAutoSlider();
        this.id = setInterval(() => {
            if(this.slideNumber == this.slideCount -1){
                this.slideNumber = 0;
            }else{
                this.slideNumber++;
            }
        }, 5000);
    }
    finishAutoSlider(){
        clearInterval(this.id);
    }

    // checkBannerUpdate(){
    //
    // }

    getSliderItemClass(item: number) {
        if (item == this.slideNumber)
            return "caro-item-dot caro-item-dot-selected";

        return "caro-item-dot";
    }

}
