import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'autoria'
})
export class AutoriaPipe implements PipeTransform {

  transform(autoria: string[]): string {
    if (autoria && autoria.length >= 2) {
      return autoria.slice(0, 2).join(', ');
    } else if (autoria) {
      return autoria[0]
    }
    return ''
  }
}
