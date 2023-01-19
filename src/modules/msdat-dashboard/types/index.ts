export interface State {
  indicatorComparision: boolean;
  zonalAnalysis: boolean;
  indicatorComparsionByPeriod: boolean;
  multisourceComparison: boolean;
  datasetComperision: boolean;
  dynamicDashboard: boolean;
  default: Defaults;
  controlConfig: ControlPanelConfig[];
  configObject: {};
}

export interface SetupObject {
  /**
   * An  example of the setup object.
   * */
  visibility?: boolean;
  type: 'dropdown' | 'checkbox' | 'toggle';
  class?: string[];
  dropdownProps?: object; // an object of the multiselect dropdown,
  label: string;
  key: 'indicator' | 'location' | 'datasource' | 'year' | 'visualization' | 'target' | 'numdenum';
  options: [];
}

export interface ControlPanelConfig {
  /**
   * The name of the control panel.
   * @type {string}
   * */

  label: string;
  setup: Array<SetupObject> | SetupObject[][] | any;
  payload: PayloadObject[] | PayloadObject[][] | null;
}

export interface PayloadObject {
  indicator: object;
  location: object;
  datasource: object;
  year: string;
  compareBy: number;
  visualization: string;
  target: {
    national: Boolean;
    sdg: Boolean;
  };
  numdenum: Boolean;
}

export interface Defaults {
  indicator: number;
  datasource: number;
  location: number;
  year: string | null;
}
