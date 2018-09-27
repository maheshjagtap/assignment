import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'age',
})
export class AgePipe implements PipeTransform {
  transform(value: Date): string {
    return moment().diff(value, 'years')+" yr";
  }
}
