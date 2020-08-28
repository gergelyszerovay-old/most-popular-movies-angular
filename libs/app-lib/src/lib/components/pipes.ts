import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'numberToFixed'})
export class NumberToFixedPipe implements PipeTransform {
  transform(value: number, fractionDigits: number): string {
    return value.toFixed(fractionDigits);
  }
}

@Pipe({name: 'getYearFromISODate'})
export class GetYearFromISODatePipe implements PipeTransform {
  transform(value: string): string {
    return value.substr(0, 4);
  }
}
