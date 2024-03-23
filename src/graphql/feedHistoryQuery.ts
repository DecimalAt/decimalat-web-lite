import { gql } from '@apollo/client';

const GET_FEED_HISTORY_QUERY = gql`
    query Jobs($id: String!) {
        jobs(where: { id: $id }) {
            id
            creator
            extractor
            pricePerExecution
            maxExecutions
            totalExecutions
            executionInterval
            executions(orderBy: executionNumber, orderDirection: desc) {
                data
                executionNumber
                timestamp
            }
        }
    }
`;

export default GET_FEED_HISTORY_QUERY;