import { gql } from '@apollo/client';

const GET_EXECUTION_QUERY_FOR_ADDRESS = gql`
    query GetJobs($address: String!) {
        jobs(where: { creator: $address }) {
            id
            creator
            extractor
            pricePerExecution
            maxExecutions
            totalExecutions
            executionInterval
            executions(orderBy: executionNumber, orderDirection: desc, first:1) {
                data
                timestamp
            }
        }
    }
`;

export default GET_EXECUTION_QUERY_FOR_ADDRESS;