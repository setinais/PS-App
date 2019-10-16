import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ContentView, Page} from "tns-core-modules/ui/page";
import {HomeSliderService} from "~/app/home/home-slider.service";
import { SwipeGestureEventData } from "tns-core-modules/ui/gestures/gestures";
import { GridLayout, GridUnitType, ItemSpec } from "tns-core-modules/ui/layouts/grid-layout";
import { AnimationDefinition, Animation } from 'tns-core-modules/ui/animation';
import { screen } from "tns-core-modules/platform";

import * as builder from "tns-core-modules/ui/builder";
import {RouterExtensions} from "nativescript-angular";

declare var android: any;

@Component({
  selector: 'ns-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    private currentSlideNum: number = 0;
    private slideCount = 3;

    private screenWidth;
    private slidesView: GridLayout;

    @ViewChild('slideContent', {static:true}) slide: ElementRef;
    private slideView: ContentView;
    private slidesService: HomeSliderService

    constructor(private page: Page,
                private nav: RouterExtensions) {
        this.page.actionBarHidden = !this.page.actionBarHidden
        this.screenWidth = screen.mainScreen.widthDIPs;
        this.slidesService = new HomeSliderService()

    }

    ngOnInit() {
        this.page.cssClasses.add("welcome-page-background");
        this.page.backgroundSpanUnderStatusBar = true;

        this.slideView = this.slide.nativeElement;

        this.loadSlides(this.slidesService.getSlides()).then((slides: any) => {
            var row = new ItemSpec(1, GridUnitType.STAR);
            let gridLayout = new GridLayout();
            slides.forEach((element, i) => {
                GridLayout.setColumn(element, 0);
                if (i > 0)
                    element.opacity = 0
                gridLayout.addChild(element);
            });
            gridLayout.addRow(row);
            this.slideView.content = (this.slidesView = gridLayout);
        });
    }
    private loadSlides(slides) {
        return new Promise(function (resolve, reject) {
            const slideViews = []
            slides.forEach((slide, i) => {
                slideViews.push(builder.parse(slide))
            });

            resolve(slideViews);
        });
    }

    skipIntro() {
        // this.nav.navigate(["/home"], { clearHistory: true });
        this.nav.navigate(["/home"]);
    }

    onSwipe(args: SwipeGestureEventData) {
        let prevSlideNum = this.currentSlideNum;
        let count = this.slideCount;
        if (args.direction == 2) {
            this.currentSlideNum = (this.currentSlideNum + 1) % count;
        } else if (args.direction == 1) {
            this.currentSlideNum = (this.currentSlideNum - 1 + count) % count;
        } else {
            // We are interested in left and right directions
            return;
        }

        const currSlide = this.slidesView.getChildAt(prevSlideNum);
        const nextSlide = this.slidesView.getChildAt(this.currentSlideNum);

        this.animate(currSlide, nextSlide, args.direction);
    }

    animate(currSlide, nextSlide, direction) {
        nextSlide.translateX = (direction == 2 ? this.screenWidth : -this.screenWidth);
        nextSlide.opacity = 1;
        var definitions = new Array<AnimationDefinition>();
        var defn1: AnimationDefinition = {
            target: currSlide,
            translate: { x: (direction == 2 ? -this.screenWidth : this.screenWidth), y: 0 },
            duration: 500
        };
        definitions.push(defn1);

        var defn2: AnimationDefinition = {
            target: nextSlide,
            translate: { x: 0, y: 0 },
            duration: 500
        };
        definitions.push(defn2);

        var animationSet = new Animation(definitions);
        animationSet.play()
            .then(() => {
                // console.log("Animation finished");
            })
            .catch((e) => {
                console.log(e.message);
            });
    }

    itemSelected(item: number) {

        console.log(item)
    }

    getSliderItemClass(item: number) {
        if (item == this.currentSlideNum)
            return "caro-item-dot caro-item-dot-selected";

        return "caro-item-dot";
    }

}
