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
