import {required} from '@rxweb/reactive-form-validators';

/**
 * ConfigLabel Interface
 */
export interface IConfigLabel {
  language: string;
  label: string;
}

/**
 * ConfigLabel Model
 */
export class ConfigLabel implements IConfigLabel {

  @required()
  public language: string;

  @required()
  public label: string;

  /**
   * Constructor
   * @param props properties or empty object
   */
  constructor(props: Partial<IConfigLabel> = {}) {
    this.language = props.language || 'de-DE';
    this.label = props.label || null;
  }

  /**
   * Builds a theme config entry
   * @return label config format: `${language}: ${label}`
   */
  public toConfigFormat(): any {
    const obj = {};
    obj[this.language] = this.label;
    return obj;
  }
}
