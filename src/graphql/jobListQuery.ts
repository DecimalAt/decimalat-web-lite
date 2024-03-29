import { gql } from '@apollo/client';

// const GET_JOB_LIST_QUERY = gql`
// {
//     jobs {
//         id
//         creator
//         extractor
//         pricePerExecution
//         maxExecutions
//         totalExecutions
//         executionInterval
//     }
// }
// `;

const GET_JOB_LIST_QUERY = gql`
{
  jobs(orderBy:id, orderDirection:desc) {
        id
        creator
        image {
          id
        }
        paymentPerExecution
        rewardAmount
    }
}
`;

export default GET_JOB_LIST_QUERY;