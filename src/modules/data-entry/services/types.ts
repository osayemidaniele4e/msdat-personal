/* eslint-disable camelcase */
export interface dataSourceI {
  id: number;
  datasource: string;
  full_name: string;
  description: string;
  year_available: string;
  period_available: string;
  methodology: string;
  subnational_data: string;
  classification: string;
  link: string;
  created_at: string;
  updated_at: string;
  group: string[];
}

export interface indicatorI {
  id: number;
  full_name: string;
  short_name: string;
  desirable_slope: string;
  indicator_type: string;
  program_area: string;
  national_target: string;
  national_source: string;
  national_information: string;
  sdg_target: string | null;
  sdg_information: string;
  created_at: string;
  updated_at: string;
  factor: number;
  first_related: number;
  second_related: number;
  third_related: number;
  fourth_related: number | null;
  datasources: number[];
  group: string[];
}

export interface ProgramAreaIndicatorI {
  programArea: string;
  data: indicatorI[];
}

export interface LocationI {
  id: number;
  name: string;
  parent: number;
  level: number;
  created_at: string;
  updated_at: string;
}

export interface valueTypeI {
    id: number
    value_type: string,
}

export interface dataSourceConfigI {
  data: dataSourceI;
  location: LocationI[];
  classification: valueTypeI[];
  period: string[];
}
