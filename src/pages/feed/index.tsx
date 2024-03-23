import React, { useState } from 'react';
import { useQuery, DocumentNode } from '@apollo/client';
import { useAccount } from 'wagmi';

import ResponsiveTable from '../../components/responsiveTable';
import GET_EXECUTION_QUERY from '../../graphql/executionQuery';
import GET_EXECUTION_QUERY_FOR_ADDRESS from '../../graphql/executionQueryForAddress';
import ToggleSwitch from '../../components/toggle';

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

interface FeedProps {
    jobs?: Job[];
}

const filterOptions: Record<string, DocumentNode> = {
    'All': GET_EXECUTION_QUERY,
    'My': GET_EXECUTION_QUERY_FOR_ADDRESS,
};

const Feed: React.FC<FeedProps> = ({ jobs }) => {
    const account = useAccount();
    const [filter, setFilter] = useState<string>('All');
    const [currentAddress, setCurrentAddress] = useState<string>(account.address || '');

    const handleFeedFilter = (selected: string) => {
        setFilter(selected);
    }

    const { loading, error, data } = useQuery(filterOptions[filter], {
        variables: { address: currentAddress },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    let feed: any[] = [];
    if (data && data.jobs) {
        data.jobs.forEach((item: any) => {
            let feedItem = item;
            if (item.executions.length > 0) {
                feedItem = {
                    ...item,
                    data: item.executions[0].data,
                    timestamp: item.executions[0].timestamp
                }
            }
            feed.push(feedItem);
        })
    }

    const columns = [
        { key: 'id', header: 'ID' },
        { key: 'creator', header: 'Creator', truncate: true },
        // { key: 'extractor', header: 'Extractor', truncate: true },
        // { key: 'pricePerExecution', header: 'Price Per Execution' },
        // { key: 'maxExecutions', header: 'Max Executions' },
        // { key: 'totalExecutions', header: 'Total Executions' },
        // { key: 'executionInterval', header: 'Execution Interval' },
        // { key: 'executions', header: 'Executions' }
        { key: 'data', header: 'Data' },
        { key: 'timestamp', header: 'Timestamp', timestamp: true },
        { key: 'historyIcon', header: 'History', history: true }
    ];

    return (
        <div className='content-page'>
            <div className='feedHeader'>
                <h2>Feed</h2>
                <ToggleSwitch option1={'All'} option2={'My'} initialSelected={filter} onToggle={handleFeedFilter} />
            </div>
            {
                feed && feed.length > 0
                    ?
                    <ResponsiveTable data={feed} columns={columns} />
                    :
                    <p>OOPS ! There are no feeds for the selected criteria !</p>
            }
        </div>
    );
};

export default Feed;
