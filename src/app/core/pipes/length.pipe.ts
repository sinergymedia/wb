import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'length'
})
export class LengthPipe implements PipeTransform {
  transform(value, args ? ) { // ES6 array destructuring
  console.log('Arguments: ' , value.length);
  return value.filter(data => {
      return data.cost >= args;
    });
  }
}