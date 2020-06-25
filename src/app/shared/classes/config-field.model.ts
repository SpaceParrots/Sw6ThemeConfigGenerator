import {UUID} from '@core/uuid';
import {ConfigTab} from '@app/shared/classes/config-tab.model';
import {ConfigBlock} from '@app/shared/classes/config-block.model';
import {ConfigSection} from '@app/shared/classes/config-section.model';
import {json, prop, propArray, required, unique} from '@rxweb/reactive-form-validators';
import {ConfigLabel} from '@app/shared/classes/config-label.model';
import {slugify} from '@core/slugify';

// Possible config field types
export type ConfigFieldType = 'color' | 'text' | 'number' | 'fontFamily' | 'media' | 'checkbox' | 'switch';

/**
 * ConfigField Interface
 */
export interface IConfigField {
  id: string;
  name: string;
  label: ConfigLabel[];
  type: ConfigFieldType;
  value: string | number;
  editable: boolean;
  scss: boolean;
  custom: any | string;

  tab: string;
  block: string;
  section: string;

  tabId: string;
  blockId: string;
  sectionId: string;
}

/**
 * ConfigField Model
 */
export class ConfigField implements IConfigField {

  @unique()
  id: string;

  @unique()
  name: string;

  @propArray(ConfigLabel)
  label: ConfigLabel[];

  @required()
  type: ConfigFieldType;

  @required()
  value: string | number;

  @prop()
  editable: boolean;

  @prop()
  tab: string;
  @prop()
  tabId: string;

  @prop()
  block: string;
  @prop()
  blockId: string;

  @prop()
  section: string;
  @prop()
  sectionId: string;

  @prop()
  scss: boolean;

  @prop()
  @json()
  custom: any | string;

  /**
   * Constructor
   * @param props properties or empty object
   */
  constructor(props: Partial<IConfigField> = {}) {
    this.id = props.id || UUID.generate();
    this.name = props.name || 'Default Field';
    this.type = props.type || 'text';
    this.value = props.value || null;
    this.editable = props.editable || false;
    this.scss = props.scss || true;
    this.custom = props.custom || null;
    this.tab = props.tab || null;
    this.tabId = props.tabId || null;
    this.block = props.block || null;
    this.blockId = props.blockId || null;
    this.section = props.section || null;
    this.sectionId = props.sectionId || null;

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
   * Sets a ConfigSection
   * @param section the field should be placed in
   */
  public setSection(section: ConfigSection) {
    this.section = section.name || null;
    this.sectionId = section.id || null;
  }

  /**
   * Sets a ConfigTab
   * @param tab the field should be placed in
   */
  public setTab(tab: ConfigTab) {
    this.tab = tab.name || null;
    this.tabId = tab.id || null;
  }

  /**
   * Sets a ConfigBlock
   * @param block the field should be placed in
   */
  public setBlock(block: ConfigBlock) {
    this.block = block.name || null;
    this.blockId = block.id || null;
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

    const customObj = !!this.custom ? JSON.parse(this.custom) : null;

    const field = {};
    field[this.formattedName] = {
      type: this.type,
      value: this.value,
      editable: this.editable,
      scss: this.scss,
      customObj: customObj || undefined,
      label,
      tab: slugify(this.tab) || undefined,
      block: slugify(this.block) || undefined,
      section: slugify(this.section) || undefined
    };
    return field;
  }
}
