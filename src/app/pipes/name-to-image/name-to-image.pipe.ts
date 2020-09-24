import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'nameToImage',
})
export class NameToImagePipe implements PipeTransform {

  transform(name: string, ...args: unknown[]): unknown {
    return name.toLowerCase().replace(/\s/g, '-').concat('.png');
  }

}
