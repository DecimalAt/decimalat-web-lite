import React, { useState, useEffect } from 'react';
import {
    type BaseError,
    useSendTransaction,
    useWaitForTransactionReceipt,
    useAccount,
    useBalance,
} from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { type Hex, parseEther } from 'viem';
import { ethers } from 'ethers';
import { erc20Abi } from 'viem';

import InlineButton from '../../components/inlineButton';
import { useEthersSigner } from '../../walletInteraction/ethers';
import { decimalContractAddress, erc20USDC } from '../../walletInteraction/contractReference';
import decimalAbiJson from '../../walletInteraction/decimal.abi';

import './styles.css';

const divStyle = {
    columnGap: '20px',
};

const CreateIntent: React.FC = () => {

    const [enclaveImage, setEnclaveImage] = useState('');
    const [validatorContract, setValidatorContract] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [frequencyValue, setFrequencyValue] = useState('');
    const [pricePerExecution, setPricePerExecution] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [gasFee, setGasFee] = useState<number>(0);
    const [rewardsError, setRewardsError] = useState('');
    const [activeStep, setActiveStep] = useState(1);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);
    const [balanceOfUser, setBalanceOfUser] = useState(0);
    const [allowance, setAllowance] = useState(0);
    const [checkifApprovalRequired, setCheckifApprovalRequired] = useState(true);


    const account = useAccount();
    const balance = useBalance({ address: account?.address });
    const { data: hash, error, isPending } = useSendTransaction();
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
    const signer = useEthersSigner({ chainId: account?.chain?.id });

    let chain = account && account.chain ? account.chain.name?.toLowerCase().toString() : '';

    useEffect(() => {
        if (chain && signer) {
            let contractOfUser = new ethers.Contract(erc20USDC[chain], erc20Abi, signer);
            //To get the balance
            contractOfUser && contractOfUser.balanceOf(account.address).then((resp) => {
                setBalanceOfUser(Number(ethers.formatEther(resp)));
            }, err => {
                console.log(err);
                setBalanceOfUser(0);
            });
            //To Check Allowance
            contractOfUser && contractOfUser.allowance(account.address, decimalContractAddress[chain]).then((resp) => {
                setAllowance(Number(ethers.formatEther(resp)));
            }, err => {
                console.log(err);
                setAllowance(0);
            });
        }
    }, [account]);

    useEffect(() => {
        if (allowance >= totalPrice) {
            setCheckifApprovalRequired(false);
            handleStepChange(2);
            markStepComplete(1);
        } else {
            setCheckifApprovalRequired(true);
            handleStepChange(1);
            setCompletedSteps([]);
        }
    }, [allowance, totalPrice]);

    const handleValidatorContractChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        setValidatorContract(selectedValue);
    };

    const handleRewardsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPricePerExecution(Number(event.target.value));
        setRewardsError('');
    };

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };

    const markStepComplete = (step: number) => {
        if (!completedSteps.includes(step)) {
            setCompletedSteps([...completedSteps, step]);
        }
    };

    const submitForApproval = async (e: any) => {
        e.preventDefault();
        let contractOfDecimal;
        if (chain && signer) {
            contractOfDecimal = new ethers.Contract(decimalContractAddress[chain], erc20Abi, signer);
            try {
                const expoValue = totalPrice * (10 ** 9);
                const resp = await contractOfDecimal.approve(decimalContractAddress[chain], expoValue);
                console.log(resp);
                handleStepChange(2);
                markStepComplete(1);
            } catch (err) {
                console.log(err);
            }
        }
    }

    const handleMaxChainClick = () => {
        setTotalPrice(Number(balanceOfUser));
    }

    const handleMaxClick = () => {
        setGasFee(Number(balance?.data?.formatted));
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (!pricePerExecution) {
            setRewardsError('Price per execution is required');
            return;
        }
        console.log('Form submitted!');

        let contractOfDecimal;
        contractOfDecimal = new ethers.Contract(decimalContractAddress[chain], decimalAbiJson.abi, signer);

        try {
            const resp = await contractOfDecimal.createJob({
                _validations: [],
                _enclave_url: enclaveImage,
                _pcrs: '',
                _input: '',
                _paymentPerExecution: pricePerExecution,
                _maxBaseFee: 1,
                _maxPriorityFee: 1,
                _gasRefundAmount: 3,
                _amount: totalPrice,
                value: gasFee
            });
            console.log(resp);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className='createJob'>
                <h2>
                    Create Intent
                </h2>
                {
                    account.address ?
                        <form onSubmit={handleSubmit} className='form-container'>
                            <div className='form-group'>
                                <label>Enclave Image URL:</label>
                                <input
                                    type="url"
                                    value={enclaveImage}
                                    onChange={(e) => setEnclaveImage(e.target.value)}
                                    placeholder='https://github.com/....'
                                    required
                                />
                            </div>
                            <br />
                            <div className='form-group'>
                                <label>Validator Contract:</label>
                                <select value={validatorContract} onChange={handleValidatorContractChange} required>
                                    <option value="">Select Validator Contract</option>
                                    <option value="Price Feed Oracle">Price Feed Oracle</option>
                                </select>
                            </div>
                            {validatorContract && (
                                <>
                                    <div className='form-group'>
                                        <label>Fetch me the price value pair of: </label>
                                        <div className='frequency'>
                                            <input type="text" placeholder='0x1234' value={address1} onChange={e => setAddress1(e.target.value)} required />
                                            vs
                                            <input type="text" placeholder='0x4321' value={address2} onChange={e => setAddress2(e.target.value)} required />
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <label>Every:</label>
                                        <div className='frequency'>
                                            <input
                                                type="number"
                                                value={frequencyValue}
                                                onChange={(e) => setFrequencyValue(e.target.value)}
                                                required
                                            />
                                            Blocks
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <i>
                                            Example: Fetch me the price value pair of BTC vs USDC, every 5 blocks.
                                        </i>
                                    </div>
                                </>
                            )}
                            <br />
                            <div className='frequency' style={divStyle}>
                                <div className='form-group'>
                                    <label>Rewards Per Execution:</label>
                                    <div className='frequency'>
                                        <input type="number" min="0" value={pricePerExecution} onChange={handleRewardsChange} required />
                                        USDC
                                    </div>
                                    {<span style={{ color: 'transparent' }} className='error-message'>.</span>}
                                    {rewardsError && <span style={{ color: 'red' }} className='error-message'>{rewardsError}</span>}
                                </div>
                                <div className='form-group'>
                                    <label>Total Rewards:</label>
                                    <div className='frequency'>
                                        <input name="totalPrice" type="number" min="0" value={totalPrice} onChange={(e) => setTotalPrice(Number(e.target.value))} required />
                                        USDC
                                    </div>
                                    {
                                        // balanceOfUser &&
                                        <>
                                            <span style={{ fontStyle: 'italic' }} className='sub-message'>Balance: {balanceOfUser} USDC </span>
                                            <span className='spacer-horizontal'>|</span>
                                            <InlineButton onClick={handleMaxChainClick}>Max</InlineButton>
                                        </>
                                    }
                                    {rewardsError && <span style={{ color: 'red' }} className='error-message'>{rewardsError}</span>}
                                </div>
                            </div>
                            <div className='form-group'>
                                <i>
                                    {
                                        !!(totalPrice && pricePerExecution) && (`Approx executions: ~ ${Math.floor(totalPrice / pricePerExecution)}`)
                                    }
                                </i>
                            </div>
                            <div className="stepper">
                                <div className='form-group'>
                                    <button
                                        className={activeStep === 1 ? 'active' : ''}
                                        onClick={(e) => { submitForApproval(e) }}
                                        disabled={totalPrice == 0 || !checkifApprovalRequired || isConfirming || isConfirmed}
                                    >
                                        {isPending ? 'Approving...' : 'Approve Rewards'}
                                    </button>
                                </div>
                            </div>
                            <div className='frequency' style={divStyle}>
                                <div className='form-group'>
                                    <label>Gas Fee:</label>
                                    <div className='frequency'>
                                        <input name="gasFee" type="number" value={gasFee} onChange={(e) => setGasFee(Number(e.target.value))} required />
                                        Gwei
                                    </div>
                                    {
                                        // balance?.data &&
                                        <>
                                            <span style={{ fontStyle: 'italic' }} className='sub-message'>Balance: {balance?.data?.formatted} {balance?.data?.symbol} </span>
                                            <span className='spacer-horizontal'>|</span>
                                            <InlineButton onClick={handleMaxClick}>Max</InlineButton>
                                        </>
                                    }
                                    {rewardsError && <span style={{ color: 'red' }} className='error-message'>{rewardsError}</span>}
                                </div>
                            </div>
                            <br />
                            {isConfirming && <div>Waiting for Approval...</div>}
                            {isConfirmed && <div>Transaction Approved.</div>}
                            {error && (
                                <div className='error-message'>Error: {(error as BaseError).shortMessage || error.message}</div>
                            )}
                            <br />
                            <div className='stepper'>
                                <button
                                    className={activeStep === 2 && totalPrice > 0 && allowance >= totalPrice ? 'active' : ''}
                                    disabled={totalPrice == 0 || !completedSteps.includes(1) || allowance < totalPrice}
                                    onClick={(e) => {
                                        handleStepChange(1);
                                        markStepComplete(2);
                                        handleSubmit(e);
                                    }}
                                >
                                    Submit Intent
                                </button>
                            </div>
                        </form>
                        :
                        <div>
                            <p> Please Connect your wallet before submitting an Intent</p>
                            <ConnectButton />
                        </div>
                }
            </div>
        </>
    );
};

export default CreateIntent;
