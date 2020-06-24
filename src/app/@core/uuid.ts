/**
 * UUID util class
 * @since 23.06.2020
 * @author Kevin Mattutat (kevin.mattutat@spaceparrots.de)
 */
export class UUID {

  private static readonly PATTERN = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

  /**
   * Generates an UUID string
   * @return a uuid string
   * @example
   * ```
   * const uid = UUID.generate();
   * ```
   */
  public static generate(): string {
    let dt = new Date().getTime();
    const uuid = this.PATTERN.replace(/[xy]/g, (char: string) => {

      // tslint:disable-next-line:no-bitwise
      const rndm = (dt + Math.random() * 16) % 16 | 0;

      // Reassign date time for next replacer callback
      dt = Math.floor(dt / 16);

      // tslint:disable-next-line:no-bitwise
      return (char === 'x' ? rndm : (rndm & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }
}
