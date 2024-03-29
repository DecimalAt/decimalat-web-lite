import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import ResponsiveTable from '../../components/responsiveTable';
import GET_FEED_HISTORY_QUERY from '../../graphql/feedHistoryQuery';
import BackButton from '../../components/backButton';

import './styles.css';


interface Execution {
    data: Blob;
    timestamp: string;
}

interface Job {
    id: string;
    creator: string;
    extractor: string;
    pricePerExecution: number;
    maxExecutions: number;
    totalExecutions: number;
    executionInterval: number;
    executions: Execution[];
}

interface HistoryProps {
    jobs?: Job[];
}

interface JobsVariables {
    id: string;
}



const History: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { loading, error, data } = useQuery<HistoryProps, JobsVariables>(GET_FEED_HISTORY_QUERY, {
        variables: { id: id || '' }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    let feed: any[] = [];
    if (data && data.jobs && data.jobs[0] && data.jobs[0].executions) {
        data.jobs[0].executions.forEach((item: any, i) => {
            // item.id = id?.substring(0, id.length - 4);
            let feedItem = item;
            // feedItem.num = i + 1;
            // if (item.executions.length > 0) {
            //     feedItem = {
            //         ...item,
            //         data: item.executions[0].data,
            //         timestamp: item.executions[0].timestamp
            //     }
            // }
            feed.push(feedItem);
        })
    } else {
        return <p>No Data Found!</p>;
    }

    const columns = [
        { key: 'id', header: 'Execution Number', truncate: true },
        { key: 'data', header: 'Data' },
        { key: 'timestamp', header: 'Timestamp', timestamp: true }
    ];

    return (
        <div className='content-page'>
            <div className='historyHeader'>
                <h2>Feed History for Job: {id}</h2>
                <div className='backButton'>
                    <BackButton />
                </div>
            </div>
            {
                feed && feed.length > 0
                    ?
                    <ResponsiveTable data={feed} columns={columns} />
                    :
                    <p>OOPS ! There is no feed history for the selected criteria !</p>
            }
        </div>
    );
};

export default History;
