import {ConfigSection} from '@app/shared/classes/config-section.model';

export class ConfigBlockLabel {
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

export class ConfigBlock {
  name: string;

  label: ConfigBlockLabel[];
  sections: ConfigSection[];

  constructor(name: string, label: ConfigBlockLabel[] = null) {
    this.name = name;
    this.label = label;
    if (this.label == null) {
      this.label = [
        new ConfigBlockLabel('de-DE', `${this.name} DE`),
        new ConfigBlockLabel('en-GB', `${this.name} EN`)
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
