import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summarizePipe'
})
export class SummarizePipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.substring(0, 10);
  }

}
