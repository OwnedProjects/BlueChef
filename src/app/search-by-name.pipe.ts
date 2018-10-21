import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchByName'
})
export class SearchByNamePipe implements PipeTransform {

  transform(itemArray: any[], searchText?: any): any {
    if (!itemArray) {  return []; }
    if (!searchText) { return itemArray; }

    if (itemArray && searchText) {
      searchText = searchText.toLowerCase();

      return itemArray.filter( it => {
        return it.name.toLowerCase().includes(searchText);
      });
    }
  }

}
