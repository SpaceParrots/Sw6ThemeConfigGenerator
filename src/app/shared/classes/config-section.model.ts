import {ConfigField} from '@app/shared/classes/config-field.model';

export class ConfigSectionLabel {
  public language: string;
  public label: string;

  constructor(language: string, label: string) {
    this.language = language;
    this.label = label;
  }

  /**
   * Builds a theme config entry
   * @return label config format: `${language}: ${label}`
   */
  public toConfigFormat(): any {
    return Object.defineProperty({}, this.language, this.label);
  }
}

export class ConfigSection {
  name: string;

  label: ConfigSectionLabel[];
  fields: ConfigField[];

  constructor(name: string, label: ConfigSectionLabel[] = null) {
    this.name = name;
    this.label = label;
    if (this.label == null) {
      this.label = [
        new ConfigSectionLabel('de-DE', `${this.name} DE`),
        new ConfigSectionLabel('en-GB', `${this.name} EN`)
      ];
    }
  }

  /**
   * Builds a theme config entry
   * @return label config format: `${name}: { ${label}.toMap() }`
   */
  public toConfigFormat(): any {
    const labels = this.label
      .map(value => value.toConfigFormat()) // Transforms array to: [{"de-DE":"Label"},{"en-GB":"Label"}]
      .reduce((result, item) => {
        const key = Object.keys(item)[0]; // get first properties: "de-DE", "en-GB"
        result[key] = item[key]; // assign object property with value
        return result;
      }, {});
    return Object.defineProperty({}, this.name, labels);
  }

}
