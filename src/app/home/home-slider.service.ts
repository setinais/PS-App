import { Injectable } from "@angular/core";

@Injectable()
export class HomeSliderService {

    private slide1 = `
<GridLayout width="90%" row="0" horizontalAlignment="center" verticalAlignment="center">
    <image class="logo" src="~/imagens/campanha1.jpg"></image>
</GridLayout>
`;

    private slide2 = `
<GridLayout width="90%" row="0" horizontalAlignment="center" verticalAlignment="center">
    <image class="logo" src="~/imagens/outubrorosa.jpg"></image>
</GridLayout>
`;

    private slide3 = `
<GridLayout width="90%" row="0" horizontalAlignment="center" verticalAlignment="center">
    <image class="logo" src="~/imagens/setembroamarelo.jpg"></image>
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
