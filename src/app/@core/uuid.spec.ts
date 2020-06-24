import { UUID } from './uuid';

describe('Uuid', () => {
  it('should create an instance', () => {
    expect(new UUID()).toBeTruthy();
  });
  it('should create two different uuid', () => {
    expect(UUID.generate()).not.toBe(UUID.generate());
  });
});
