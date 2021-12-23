import gql from "graphql-tag";

export const STOCK_QUERY = gql`
  query frontStockQuery {
    gsStock {
      index
      date
      check_item
      code
      code_name
      d1_diff_rate
      close
      open
      high
      low
      volume
      clo5
      clo10
      clo20
      clo40
      clo60
      clo80
      clo100
      clo120
      clo5_diff_rate
      clo10_diff_rate
      clo20_diff_rate
      clo40_diff_rate
      clo60_diff_rate
      clo80_diff_rate
      clo100_diff_rate
      clo120_diff_rate
      yes_clo5
      yes_clo10
      yes_clo20
      yes_clo40
      yes_clo60
      yes_clo80
      yes_clo100
      yes_clo120
      vol5
      vol10
      vol20
      vol40
      vol60
      vol80
      vol100
      vol120
    }
  }
`;
