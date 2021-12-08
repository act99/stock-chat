/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: frontStockQuery
// ====================================================

export interface frontStockQuery_gsStock {
  __typename: "Gs";
  index: number;
  date: number;
  check_item: string;
  code: number;
  code_name: string;
  d1_diff_rate: number;
  close: number;
  open: number;
  high: number;
  low: number;
  volume: number;
  clo5: number;
  clo10: number;
  clo20: number;
  clo40: number;
  clo60: number;
  clo80: number;
  clo100: number;
  clo120: number;
  clo5_diff_rate: number;
  clo10_diff_rate: number;
  clo20_diff_rate: number;
  clo40_diff_rate: number;
  clo60_diff_rate: number;
  clo80_diff_rate: number;
  clo100_diff_rate: number;
  clo120_diff_rate: number;
  yes_clo5: number;
  yes_clo10: number;
  yes_clo20: number;
  yes_clo40: number;
  yes_clo60: number;
  yes_clo80: number;
  yes_clo100: number;
  yes_clo120: number;
  vol5: number;
  vol10: number;
  vol20: number;
  vol40: number;
  vol60: number;
  vol80: number;
  vol100: number;
  vol120: number;
}

export interface frontStockQuery {
  gsStock: frontStockQuery_gsStock[];
}
