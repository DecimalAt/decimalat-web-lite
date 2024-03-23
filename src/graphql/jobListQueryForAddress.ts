import { gql } from '@apollo/client';

const GET_JOB_LIST_QUERY_FOR_ADDRESS = gql`
    query GetJobs($address: String!) {
        jobs(where: { creator: $address }) {
            id
            creator
            extractor
            pricePerExecution
            maxExecutions
            totalExecutions
            executionInterval
        }
    }
`;

export default GET_JOB_LIST_QUERY_FOR_ADDRESS;