export interface ControlPanelConfig {
    /**
     * The name of the control panel.
     * @type {string}
     * */

    label: string;
    setup: Array<SetupObject> | Array<SetupObject>[];
    payload: PayloadObject[] | PayloadObject[][];

}

export interface SetupObject {
    /**
     * An  example of the setup object.
     * */
    type: 'dropdown' | 'checkbox' | 'toggle',
    class?: string[],
    dropdownProps?: object // an object of the multiselect dropdown,
    label: string,
    key: 'indicator' | 'location' | 'datasource' | 'year' | 'visualization' | 'target' | 'numdenum',
    options: any[],
}

export interface PayloadObject {
    indicator: object,
    location: object,
    datasource: object,
    year: string,
    compareBy: number,
    visualization: string,
    target: {
        national: Boolean,
        sdg: Boolean,
    },
    numdenum: Boolean,
}

export interface Defaults {
    indicator: number,
    datasource: number,
    location: number,
    year: string | null,
}

export interface State {
    default: Defaults,
    controlConfig: ControlPanelConfig[],
}
