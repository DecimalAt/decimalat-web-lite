import {
    DEFAULT_CURRENCY_DECIMALS,
    DEFAULT_PRECISION
} from './constants';

import { BigNumberish, ethers } from 'ethers';


export function isInputAmountValid(amount: string): boolean {
    if (!amount) return true;

    const containsSpecialCharsOrAlphabets = /[^\d.]/.test(amount);
    if (containsSpecialCharsOrAlphabets) return false;

    const containsMoreThanOneDecimal = (amount.match(/\./g) || []).length > 1;
    if (containsMoreThanOneDecimal) return false;

    const integerPart = amount.split('.')[0];
    const decimalPart = amount.split('.')[1];

    if (integerPart.length > 50) return false;
    if (decimalPart && decimalPart.length > 18) return false;
    if (!decimalPart && BigInt(integerPart) === 0n) return false;
    if (decimalPart && BigInt(integerPart) === 0n && BigInt(decimalPart) === 0n) return false;

    return true;
}

export const bigNumberToString = (
    value: bigint,
    bigNumberDecimal = DEFAULT_CURRENCY_DECIMALS,
    precision = DEFAULT_PRECISION,
    commify = true
) => {
    if (value === undefined || value === null) {
        throw new Error('Invalid value');
    }
    if (value === 0n) {
        return '0.00';
    }

    const formattedValue = ethers.formatUnits(value, bigNumberDecimal);
    const [integerPart, decimalPart] = formattedValue.split('.');
    const commifiedIntegerPart = commify ? BigInt(integerPart).toLocaleString() : integerPart;
    const truncatedDecimalPart = decimalPart.slice(0, precision).padEnd(precision, '0');

    return `${commifiedIntegerPart}.${truncatedDecimalPart}`;
};

//return bignumber from string with decimal
export const stringToBigNumber = (value: string, bigNumberDecimal = DEFAULT_CURRENCY_DECIMALS) => {
    if (!value) return 0n;
    if (!isInputAmountValid(value)) return 0n;
    let newValue = value;
    // eslint-disable-next-line prefer-const
    let [integer, fraction] = value.split('.');

    if (fraction && fraction.length > bigNumberDecimal) {
        fraction = fraction.slice(0, bigNumberDecimal);
        newValue = integer + '.' + fraction;
    }
    return ethers.parseUnits(newValue, bigNumberDecimal);
};