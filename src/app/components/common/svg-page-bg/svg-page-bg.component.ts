import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-svg-page-bg',
  standalone: true,
  templateUrl: './svg-page-bg.component.html',
  styleUrls: ['./svg-page-bg.component.css']
})
export class SvgPageBgComponent {
  @Input() color1: string = '#35273f';
  @Input() color2: string = '#1a141f';
}
