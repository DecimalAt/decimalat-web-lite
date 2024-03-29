import { gql } from '@apollo/client';

// const GET_EXECUTION_QUERY_FOR_ADDRESS = gql`
//     query GetJobs($address: String!) {
//         jobs(where: { creator: $address }) {
//             id
//             creator
//             extractor
//             pricePerExecution
//             maxExecutions
//             totalExecutions
//             executionInterval
//             executions(orderBy: executionNumber, orderDirection: desc, first:1) {
//                 data
//                 timestamp
//             }
//         }
//     }
// `;

const GET_EXECUTION_QUERY_FOR_ADDRESS = gql`
query GetJobs($address: String!) {
    jobs(where: { creator: $address }, orderBy:id, orderDirection:desc) {
          id
          creator
          image {
            id
          }
          paymentPerExecution
          rewardAmount
          executions(orderBy: timestamp, orderDirection: desc, first:1) @include(if: true) {
              id
              job {
                id
              }
              data
              txHash
              timestamp
          }
      }
  }
`;

export default GET_EXECUTION_QUERY_FOR_ADDRESS;