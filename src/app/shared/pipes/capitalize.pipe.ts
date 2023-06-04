import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string): string {
    var capitalizedResult = '';
    
    for (let word of value.split(' ')) {
      capitalizedResult = capitalizedResult + word[0].toUpperCase() + word.substring(1, word.length).toLowerCase() + " ";
    }
    return capitalizedResult;
  }
}