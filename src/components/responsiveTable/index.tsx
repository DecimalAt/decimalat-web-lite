import React from 'react';
import { useNavigate } from 'react-router-dom';

import HideCharacters from '../hideCharacters';
import ArrowIcon from '../icons/arrowIcon';
import HistoryIcon from '../icons/historyIcon';
import TimeAge from '../timeAge';
import './styles.css';
import styled from 'styled-components';

interface TableColumn {
    key: string;
    header: string;
    truncate?: boolean;
    feedIcon?: boolean;
    timestamp?: boolean;
    history?: boolean;
}

interface TableProps {
    data: any[];
    columns: TableColumn[];
}

const StyledTh = styled.th`
    background-color:  ${(props) => props.theme.background};
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    color:  ${(props) => props.theme.tableText};
`;

const StyledTd = styled.td`
    background-color:  ${(props) => props.theme.background};
    color:  ${(props) => props.theme.tableText};
`;

const ResponsiveTable: React.FC<TableProps> = ({ data, columns }) => {
    const navigate = useNavigate();
    const goToHistory = (e: any, id: string) => {
        const path = `/history/${id}`;
        navigate(path);
    }
    return (
        <div style={{ overflowX: 'auto', backgroundColor: 'white' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <StyledTh key={column.key}>
                                {/* <th key={column.key}> */}
                                {column.header}
                                {/* </th> */}
                            </StyledTh>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            {columns.map((column) => (
                                <StyledTd key={column.key}>
                                    {column.feedIcon
                                        ?
                                        <span className='go-to-history' onClick={(e) => goToHistory(e, row['id'])}>
                                            <ArrowIcon />
                                        </span>
                                        :
                                        column.history
                                            ?
                                            <span className='go-to-history' onClick={(e) => goToHistory(e, row['id'])}>
                                                <HistoryIcon />
                                            </span>
                                            :
                                            column.truncate
                                                ?
                                                <HideCharacters text={row[column.key]} />
                                                :
                                                column.timestamp
                                                    ?
                                                    <TimeAge timestamp={row[column.key]} />
                                                    :
                                                    row[column.key]}
                                </StyledTd>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResponsiveTable;
