import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {


  // Remove the duplicate elements
  transform(items, field: string, value): any[] {
    if (!items) { return []; }
    if (!value || value.length === 0) { return items; }
    return items.filter(it => value.filter(val => it[field].includes(val)).length > 0);
  }
}
