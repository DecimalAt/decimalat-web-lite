import { gql } from '@apollo/client';

const GET_EXECUTION_QUERY = gql`
{
    jobs {
        id
        creator
        extractor
        pricePerExecution
        maxExecutions
        totalExecutions
        executionInterval
        executions(orderBy: timestamp, orderDirection: desc, first:1) @include(if: true) {
            id
            jobId {
              id
            }
            data
            executionNumber
            timestamp
        }
    }
}
`;

export default GET_EXECUTION_QUERY;