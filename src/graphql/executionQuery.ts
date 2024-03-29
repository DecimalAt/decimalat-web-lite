import { gql } from '@apollo/client';

// const GET_EXECUTION_QUERY = gql`
// {
//     jobs {
//         id
//         creator
//         extractor
//         pricePerExecution
//         maxExecutions
//         totalExecutions
//         executionInterval
//         executions(orderBy: timestamp, orderDirection: desc, first:1) @include(if: true) {
//             id
//             jobId {
//               id
//             }
//             data
//             executionNumber
//             timestamp
//         }
//     }
// }
// `;

const GET_EXECUTION_QUERY = gql`
{
    jobs(orderBy:id, orderDirection:desc) {
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

export default GET_EXECUTION_QUERY;