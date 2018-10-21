import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchMenu'
})
export class SearchmenuPipe implements PipeTransform {

  transform(items: any[], field: string, value: string): any {
    //console.log(items, value, field);
    if (!items) return [];

    if(value == undefined) return items;

    const regexp = new RegExp(value, 'i');

    //console.log(items.filter(x => regexp.test(x.name)));

    //return items.filter(it => it[field] == value);
    return items.filter(x => regexp.test(x.name))
  }

}
