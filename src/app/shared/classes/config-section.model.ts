import {UUID} from '@core/uuid';
import {propArray, required, unique} from '@rxweb/reactive-form-validators';
import {ConfigLabel} from '@app/shared/classes/config-label.model';
import {slugify} from '@core/slugify';

export interface IConfigSection {
  id: string;
  name: string;
  label: ConfigLabel[];
}

export class ConfigSection {

  id: string;

  @required()
  name: string;

  @propArray(ConfigLabel)
  label: ConfigLabel[];

  constructor(props: Partial<IConfigSection> = {}) {
    this.id = props.id || UUID.generate();
    this.name = props.name || 'Default Section';
    if (props.label == null) {
      this.label = [
        new ConfigLabel({language: 'de-DE', label: `${this.name} DE`}),
        new ConfigLabel({language: 'en-GB', label: `${this.name} EN`})
      ];
    } else {
      this.label = props.label.map(value => new ConfigLabel(value));
    }
  }

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
