import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FsCarouselComponent } from "./_components/fs-carousel/fs-carousel.component";
import { SvgPageBgComponent } from "../../components/common/svg-page-bg/svg-page-bg.component";
import { ProductRecommendedSectionComponent } from "../../components/product-recommended-section/product-recommended-section.component";
import { AppLayoutComponent } from "../../layouts/app-layout/app-layout.component";
import {
  ProductShowcaseButtonGroupComponent
} from "./_components/showcase-categories-buttongroup/product-showcase-button-group..component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FsCarouselComponent,
    SvgPageBgComponent,
    ProductRecommendedSectionComponent,
    AppLayoutComponent,
    ProductShowcaseButtonGroupComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      document.title = "Home";
    }
  }
}
