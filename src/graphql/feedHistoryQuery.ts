import { gql } from '@apollo/client';

// const GET_FEED_HISTORY_QUERY = gql`
//     query Jobs($id: String!) {
//         jobs(where: { id: $id }) {
//             id
//             creator
//             extractor
//             pricePerExecution
//             maxExecutions
//             totalExecutions
//             executionInterval
//             executions(orderBy: executionNumber, orderDirection: desc) {
//                 data
//                 executionNumber
//                 timestamp
//             }
//         }
//     }
// `;

const GET_FEED_HISTORY_QUERY = gql`
query Jobs($id: String!) {
    jobs(where: { id: $id }, orderBy:id, orderDirection:desc) {
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

export default GET_FEED_HISTORY_QUERY;