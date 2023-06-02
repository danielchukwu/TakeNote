import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-display-svg',
  templateUrl: './display-svg.component.html',
  styleUrls: ['./display-svg.component.css']
})

// To use this component all you have to do is specify an 
// @svgName - is the name of the svg to be displayed e.g 'pen' | 'todo' | 'bin' | 'plus' | 'send'
// @svgSizeStyle - is a string that carries the size of the svg's class style  
// @svgStyles - is a string that carries all the styles you want 
export class DisplaySvgComponent {
  @Input() svgName = 'pen';
  @Input() svgSizeStyle = '';
  @Input() svgStyles = 'svg pointer';
  @Input() svgStylesHover = 'pointer ';
  @Input() press = function(){};

  removeHoverStyle() {
    this.svgStyles = 'svg pointer';
  }
  
  addHoverStyle() {
    this.svgStyles = this.svgStylesHover;
  }
}
