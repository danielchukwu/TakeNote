import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-display-svg',
  templateUrl: './display-svg.component.html',
  styleUrls: ['./display-svg.component.css']
})

// To use this component all you have to do is specify an 
// @svgName - is the name of the svg to be displayed e.g 'pen' | 'bin' | 'plus' | 'send'
// @svgStyles - is a string that carries all the styles you want 
export class DisplaySvgComponent {
  @Input() svgName = 'pen';
  @Input() svgStyles = 'svg svg-12 pointer';
  @Input() press = function(){};

  removeHoverStyle() {
    this.svgStyles = 'svg svg-12 pointer';
  }
  
  addHoverStyle() {
    this.svgStyles = 'svg-12 pointer';
  }
}
