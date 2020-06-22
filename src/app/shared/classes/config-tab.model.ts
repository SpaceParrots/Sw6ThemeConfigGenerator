import {ConfigSection} from '@app/shared/classes/config-section.model';

export class ConfigTabLabel {
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
  public toConfig(): any {
    return Object.defineProperty({}, this.language, this.label);
  }
}

export class ConfigTab {
  name: string;
  label: ConfigTabLabel[];

  constructor(name: string, label: ConfigTabLabel[] = null) {
    this.name = name;
    this.label = label;
    if (this.label == null) {
      this.label = [
        new ConfigTabLabel('de-DE', `${this.name} DE`),
        new ConfigTabLabel('en-GB', `${this.name} EN`)
      ];
    }
  }

  /**
   * Builds a theme config entry
   * @return label config format: `${name}: { ${label}.toMap() }`
   */
  public toConfig(): any {
    const labels = this.label
      .map(value => value.toConfig()) // Transforms array to: [{"de-DE":"Label"},{"en-GB":"Label"}]
      .reduce((result, item) => {
        const key = Object.keys(item)[0]; // get first properties: "de-DE", "en-GB"
        result[key] = item[key]; // assign object property with value
        return result;
      }, {});
    return Object.defineProperty({}, this.name, labels);
  }

}
