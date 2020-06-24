import { slugify } from './slugify';


describe('Slugify', () => {
  it('should create a slug that is different from the original', () => {
    const toBeSlugified = 'Some!Really  dirty: path';
    expect(toBeSlugified).not.toBe(slugify(toBeSlugified));
  });
});
