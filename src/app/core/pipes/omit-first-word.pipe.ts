import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'omitFirstWord'
})
export class OmitFirstWordPipe implements PipeTransform {

  transform(value: string, args: any[]): string {
    if (!value) { return ''; }
    return value.split(' ').slice(1).join(' ');
  }

}
