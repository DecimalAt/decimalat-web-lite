import { gql } from '@apollo/client';

const CREATE_JOB_QUERY = gql`
    mutation CreateJob($imageId: String!, $validator: String!, $extractor: String!) {
        createJob(imageId: $imageId, validator: $validator, extractor: $extractor) {
            id
            imageId
            validator
            extractor
        }
    }
`;

export default CREATE_JOB_QUERY;