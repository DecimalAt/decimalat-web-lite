import React, { useState, FormEvent } from 'react';
import { 
    type BaseError, 
    useSendTransaction, 
    useWaitForTransactionReceipt, 
    useAccount, 
    useBalance,
    useTransactionConfirmations,
    useTransactionReceipt,
} from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { type Hex, parseEther } from 'viem';



import './styles.css';
import InlineButton from '../../components/inlineButton';

const divStyle = {
    columnGap: '20px',
};


const CreateJob: React.FC = () => {
    const account = useAccount();
    const balance = useBalance({
        address: account.address
    });
    const { data: hash, error, isPending, sendTransaction } = useSendTransaction();
    // const { confirmations,  } = useTransactionConfirmations();
    const [enclaveImage, setEnclaveImage] = useState('');
    const [validatorContract, setValidatorContract] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [frequencyValue, setFrequencyValue] = useState('');
    const [pricePerExecution, setPricePerExecution] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [rewardsError, setRewardsError] = useState('');
    const [activeStep, setActiveStep] = useState(1);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);

    const handleValidatorContractChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        setValidatorContract(selectedValue);
        // You can perform additional logic based on the selected value here
    };

    const handleRewardsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPricePerExecution(Number(event.target.value));
        // Clear rewards error when rewards field changes
        setRewardsError('');
    };

    // Function to handle step navigation
    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };

    // Function to handle marking steps as complete
    const markStepComplete = (step: number) => {
        if (!completedSteps.includes(step)) {
            setCompletedSteps([...completedSteps, step]);
        }
    };


    async function submitTransaction(e: any) {
        e.preventDefault();
        const to = account.address as Hex;
        const value = totalPrice.toString() as string;
        sendTransaction({ to, value: parseEther(value) });
    }

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    });

    // if (isConfirmed) {
    //     debugger
    //     console.log(hash);
    //     handleStepChange(1);
    //     markStepComplete(1);
    //     // TODO: Proceed to Allocate Rewards
    // }

    const handleMaxClick = () => {
        setTotalPrice(Number(balance?.data?.formatted) || 0);
    }

    const handleAllocateRewards = (e: any) => {
        // debugger
        console.log(hash);
        handleStepChange(2);
        markStepComplete(2);
    }


    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Perform validation on rewards field
        if (!pricePerExecution) {
            setRewardsError('Price per execution is required');
            return;
        }
        // Submit the form
        console.log('Form submitted!');
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
                                    {/* Add more options as needed */}
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
                                        <input type="number" value={pricePerExecution} onChange={handleRewardsChange} required />
                                        USDC
                                    </div>
                                    {<span style={{ color: 'transparent' }} className='error-message'>.</span>}
                                    {rewardsError && <span style={{ color: 'red' }} className='error-message'>{rewardsError}</span>}
                                </div>
                                <div className='form-group'>
                                    <label>Total Rewards:</label>
                                    <div className='frequency'>
                                        <input name="totalPrice" type="number" value={totalPrice} onChange={(e) => setTotalPrice(Number(e.target.value))} required />
                                        USDC
                                    </div>
                                    {
                                        balance?.data &&
                                        <>
                                            <span style={{ color: '#eee', fontStyle: 'italic' }} className='error-message'>Balance: {balance.data.formatted} {balance.data.symbol} </span>
                                            <span className='spacer-horizontal'>|</span>
                                            <InlineButton onClick={handleMaxClick}>Max</InlineButton>
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
                                <button
                                    className={activeStep === 1 ? 'active' : ''}
                                    onClick={(e) => { submitTransaction(e) }}
                                    disabled={isConfirming || isConfirmed}
                                >
                                    {isPending ? 'Approving...' : 'Approve Rewards'}
                                </button>
                                <button
                                    className={activeStep === 2 ? 'active' : ''}
                                    disabled={!completedSteps.includes(1)}
                                    onClick={(e) => {
                                        handleAllocateRewards(e);
                                    }}
                                >
                                    Allocate Rewards
                                </button>
                            </div>
                            <br />
                            {/* {hash && <div>Transaction Hash: {hash}</div>} */}
                            {isConfirming && <div>Waiting for Approval...</div>}
                            {isConfirmed && <div>Transaction Approved.</div>}
                            {error && (
                                <div className='error-message'>Error: {(error as BaseError).shortMessage || error.message}</div>
                            )}
                            <br />
                            <div className='stepper'>
                                <button
                                    className={activeStep === 3 ? 'active' : ''}
                                    disabled={!completedSteps.includes(2)}
                                    onClick={() => {
                                        handleStepChange(3);
                                        markStepComplete(3);
                                    }}
                                >
                                    Submit
                                </button>
                            </div>

                            {activeStep === 3 && (
                                <button type="submit">Submit Intent</button>
                            )}
                            {/* <button type="submit" className='submit-button'>Submit</button> */}
                        </form>
                        :
                        <div>
                            <p> Please Connect your wallet before submitting a Job</p>
                            <ConnectButton />
                        </div>
                }
            </div>
        </>
    );
};

export default CreateJob;
