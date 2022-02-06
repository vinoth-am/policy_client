import { gql } from "@apollo/client";

export const GET_POLICY_DETAILS = gql`
  query searchInsurance($search: String!) {
    searchInsurance(search: $search) {
      policyId
      datePurchase
      customerId
      fuel
      vehicleSegment
      premium
      bodilyInjury
      personalInjuryProtection
      propertyDamageLiability
      collision
      comprehensive
      customerGender
      customerIncomeGroup
      customerRegion
      customerMaritalStatus
    }
  }
`;

export const GET_CHART_DATA = gql`
  query chartData($region: String!) {
    chartData(region: $region) {
      insuranceCount
    }
  }
`;

export const UPDATE_POLICY = gql`
  mutation updateInsurance(
    $policyId: ID!
    $fuel: String
    $vehicleSegment: String
    $premium: Decimal
    $bodilyInjury: Boolean
    $personalInjuryProtection: Boolean
    $propertyDamageLiability: Boolean
    $collision: Boolean
    $comprehensive: Boolean
  ) {
    updateInsurance(
      policyId: $policyId
      fuel: $fuel
      vehicleSegment: $vehicleSegment
      premium: $premium
      bodilyInjury: $bodilyInjury
      personalInjuryProtection: $personalInjuryProtection
      propertyDamageLiability: $propertyDamageLiability
      collision: $collision
      comprehensive: $comprehensive
    ) {
      ok
      success
      error
    }
  }
`;
