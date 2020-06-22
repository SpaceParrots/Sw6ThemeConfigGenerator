export class ConfigFieldLabel {
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

export type ConfigFieldType = 'color' | 'text' | 'number';

export class ConfigField {
  label: ConfigFieldLabel[];
  type: ConfigFieldType;
  value: string | number;
  editable: boolean;

  tab: string;
  block: string;
  section: string;
}
