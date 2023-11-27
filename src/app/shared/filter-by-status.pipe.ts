import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByStatus'
})
export class FilterByStatusPipe implements PipeTransform {

  transform(tasks: any[], status: string): any[] {
    return tasks.filter(
      task => task.status === status);
  }
}
