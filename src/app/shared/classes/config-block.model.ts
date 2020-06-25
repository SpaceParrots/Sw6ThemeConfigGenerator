import {UUID} from '@core/uuid';
import {propArray, required} from '@rxweb/reactive-form-validators';
import {ConfigLabel} from '@app/shared/classes/config-label.model';
import {slugify} from '@core/slugify';

/**
 * ConfigBlock interface
 */
export interface IConfigBlock {
  id: string;
  name: string;
  label: ConfigLabel[];
}

/**
 * ConfigBlock Model
 */
export class ConfigBlock implements IConfigBlock {

  id: string;

  @required()
  name: string;

  @propArray(ConfigLabel)
  label: ConfigLabel[];

  /**
   * Constructor
   * @param props properties or empty object
   */
  constructor(props: Partial<IConfigBlock> = {}) {
    this.id = props.id || UUID.generate();
    this.name = props.name || 'Default Block';
    this.label = props.label || null;
    if (props.label == null) {
      this.label = [
        new ConfigLabel({language: 'de-DE', label: `${this.name} DE`}),
        new ConfigLabel({language: 'en-GB', label: `${this.name} EN`})
      ];
    } else {
      this.label = props.label.map(value => new ConfigLabel(value));
    }
  }

  /**
   * Gets a name that is usable inside a json file
   * @see slugify
   */
  get formattedName(): string {
    return slugify(this.name);
  }

  /**
   * Builds a theme config entry
   * @return label config format: `${name}: { ${label}.toMap() }`
   */
  public toConfigFormat(): any {
    const label = this.label
      .map(value => value.toConfigFormat()) // Transforms array to: [{"de-DE":"Label"},{"en-GB":"Label"}]
      .reduce((result, item) => {
        const key = Object.keys(item)[0]; // get first properties: "de-DE", "en-GB"
        result[key] = item[key]; // assign object property with value
        return result;
      }, {});

    const section = {};
    section[this.formattedName] = {label};
    return section;
  }

}
