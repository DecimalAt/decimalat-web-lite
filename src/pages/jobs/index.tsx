import React, { useState } from 'react';
import { DocumentNode, useQuery } from '@apollo/client';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import ResponsiveTable from '../../components/responsiveTable';
import GET_JOB_LIST_QUERY from '../../graphql/jobListQuery';
import GET_JOB_LIST_QUERY_FOR_ADDRESS from '../../graphql/jobListQueryForAddress';
import ToggleSwitch from '../../components/toggle';

import './styles.css';

interface Job {
    id: string;
    creator: string;
    extractor: string;
    pricePerExecution: string;
    maxExecutions: string;
    totalExecutions: string;
    executionInterval: string;
}

interface JobsProps {
    jobs?: Job[];
}

const filterOptions: Record<string, DocumentNode> = {
    'All': GET_JOB_LIST_QUERY,
    'My': GET_JOB_LIST_QUERY_FOR_ADDRESS,
};

const Jobs: React.FC<JobsProps> = ({ jobs }) => {
    const account = useAccount();
    const [filter, setFilter] = useState<string>('All');
    // const [currentAddress, setCurrentAddress] = useState<string>(account.address || '');

    const handleJobsFilter = (selected: string) => {
        setFilter(selected);
    }

    const { loading, error, data } = useQuery(filterOptions[filter], {
        variables: { address: account.address },
    });

    if (filter === 'My' && !account.address) {
        return (
            <div className='content-page'>
                <div className='jobsHeader'>
                    <h2>Jobs</h2>
                    <ToggleSwitch option1={'All'} option2={'My'} initialSelected={filter} onToggle={handleJobsFilter} />
                </div>
                {
                    <div>
                        <p> Please connect your wallet to continue</p>
                        <ConnectButton />
                    </div>
                }
            </div>
        );
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const columns = [
        { key: 'id', header: 'ID' },
        { key: 'creator', header: 'Creator', truncate: true },
        // { key: 'extractor', header: 'Extractor', truncate: true },
        // { key: 'pricePerExecution', header: 'Price Per Execution' },
        // { key: 'maxExecutions', header: 'Max Executions' },
        // { key: 'totalExecutions', header: 'Total Executions' },
        // { key: 'executionInterval', header: 'Execution Interval' },
        { key: 'feedIcon', header: 'Feed', feedIcon: true }
    ];

    return (
        <div className='content-page'>
            <div className='jobsHeader'>
                <h2>Jobs</h2>
                <ToggleSwitch option1={'All'} option2={'My'} initialSelected={filter} onToggle={handleJobsFilter} />
            </div>
            {
                data.jobs && data.jobs.length > 0
                    ?
                    <ResponsiveTable data={data.jobs} columns={columns} />
                    :
                    <p>OOPS ! There are no jobs for the selected criteria !</p>
            }
        </div>
    );
};

export default Jobs;
