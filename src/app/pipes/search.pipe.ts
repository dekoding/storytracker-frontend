import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search'
})
export class SearchPipe implements PipeTransform {
    transform(items: any[], searchText: string, searchCase: boolean): any[] {
        if(!items) {
            return [];
        }
        if(!searchText) {
            return items;
        }

        if(!searchCase) {
            searchText = searchText.toLowerCase();
        }

        return items.filter(item => {
            let valid:boolean = false;

            Object.values(item).forEach(value => {
                if (typeof value === 'string') {
                    if(!searchCase) {
                        value = value.toLowerCase();
                    }
                    if (value.includes(searchText)) {
                        valid = true;
                    }
                }
            });

            if (valid) {
                return item;
            }
        });
    }
}
