/**
 * Transforms a string to a URI conform string
 * @since 24.06.2020
 * @author Kevin Mattutat (kevin.mattutat@spaceparrots.de)
 *
 * @param value The input value that should be slugified
 * @example
 * ```
 * import { slugify } from '@core';
 *
 * const slug = slugify('Something That, will: be transformed')
 * ```
 */
export function slugify(value: string): string {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/,:;';
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz-----';
  const p = new RegExp(a.split('').join('|'), 'g');

  return value.toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}
