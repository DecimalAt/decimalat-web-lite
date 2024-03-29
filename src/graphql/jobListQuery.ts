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
    jobs {
        id
        creator
      }
}
`;

export default GET_JOB_LIST_QUERY;