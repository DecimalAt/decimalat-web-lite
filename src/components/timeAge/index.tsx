import React from 'react';
import moment from 'moment';

interface TimeAgeProps {
    timestamp: number; // Assuming the timestamp is in seconds
}

const TimeAge: React.FC<TimeAgeProps> = ({ timestamp }) => {
    if (!timestamp)
        return (
            <span>--</span>
        );
    const getMomentAgeFromNow = (timestamp: number) => {
        const momentTimestamp = moment.unix(timestamp);
        return momentTimestamp.fromNow();
    };

    return (
        <span>{getMomentAgeFromNow(timestamp)}</span>
    );
};

export default TimeAge;
