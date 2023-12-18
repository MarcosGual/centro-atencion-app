import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'masIva',
})
export class MasIvaPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): unknown {
    return value * 1.21;
  }
}
