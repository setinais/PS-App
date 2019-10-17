import { Injectable } from "@angular/core";

@Injectable()
export class HomeSliderService {

    private slide1 = `
<GridLayout width="95%" row="0" horizontalAlignment="center" verticalAlignment="center">
    <image class="logo" style="border-radius: 9;" src="~/imagens/campanha1.jpg"></image>
</GridLayout>
`;

    private slide2 = `
<GridLayout width="95%" row="0" horizontalAlignment="center" verticalAlignment="center">
    <image class="logo" style="border-radius: 9;" src="~/imagens/campanha2.jpg"></image>
</GridLayout>
`;

    private slide3 = `
<GridLayout width="95%" row="0" horizontalAlignment="center" verticalAlignment="center">
    <image class="logo" style="border-radius: 9;" src="~/imagens/campanha3.jpg"></image>
</GridLayout>
`;

    private slides;
    constructor() {
        this.slides = [this.slide1, this.slide2, this.slide3];
    }

    getSlides(): any {
        return this.slides;
    }
}
