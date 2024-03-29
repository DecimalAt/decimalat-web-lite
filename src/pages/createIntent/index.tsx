import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    type BaseError,
    useSendTransaction,
    useWaitForTransactionReceipt,
    useAccount,
    useBalance,
} from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
// import { type Hex, parseEther } from 'viem';
import { ethers } from 'ethers';
import { erc20Abi } from 'viem';

import InlineButton from '../../components/inlineButton';
import { useEthersSigner } from '../../walletInteraction/ethers';
import { BASE_TOKEN_DECIMALS, DECIMALS, JOB_CREATION_GAS, decimalContractAddress, erc20USDC } from '../../walletInteraction/contractReference';
import decimalAbiJson from '../../walletInteraction/decimal.abi';
import { IValidator, IValidator__factory, JobManager__factory } from '../../typechain-types';
import { bigNumberToString, stringToBigNumber } from '../../utils/conversionHelper';
import { IJobManager } from '../../typechain-types/contracts/JobManager';
import WaitCursor from '../../components/waitCursor';

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
    const [frequencyType, setFrequencyType] = useState('');
    const [pricePerExecution, setPricePerExecution] = useState<string>('');
    const [totalPrice, setTotalPrice] = useState<string>('');
    const [gasFee, setGasFee] = useState<string>('');
    const [rewardsError, setRewardsError] = useState('');
    const [activeStep, setActiveStep] = useState(1);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);
    const [balanceOfUser, setBalanceOfUser] = useState(0n);
    const [allowance, setAllowance] = useState(0n);
    const [checkifApprovalRequired, setCheckifApprovalRequired] = useState(true);
    const [approvalRejectionReason, setApprovalRejectionReason] = useState('');
    const [approvalAcceptanceReason, setApprovalAcceptanceReason] = useState('');
    const [isWaiting, setIsWaiting] = useState(false);


    const account = useAccount();
    const balance = useBalance({ address: account?.address });
    const navigate = useNavigate();
    const { data: hash, error, isPending } = useSendTransaction();
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
    const signer = useEthersSigner({ chainId: account?.chain?.id });

    let chain = account && account.chain ? account.chain.name?.toLowerCase().toString() : '';

    useEffect(() => {
        if (chain && signer) {
            let contractOfUser = new ethers.Contract(erc20USDC[chain], erc20Abi, signer);
            //To get the balance
            contractOfUser && contractOfUser.balanceOf(account.address).then((resp) => {
                setBalanceOfUser(resp);
            }, err => {
                console.log(err);
                setBalanceOfUser(0n);
            });
            //To Check Allowance
            contractOfUser && contractOfUser.allowance(account.address, decimalContractAddress[chain]).then((resp) => {
                setAllowance(resp);
            }, err => {
                console.log(err);
                setAllowance(0n);
            });
        }
    }, [account]);

    useEffect(() => {
        if (allowance >= stringToBigNumber(totalPrice, DECIMALS[chain])) {
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
        setPricePerExecution(event.target.value);
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
        setIsWaiting(true);
        let contractOfDecimal;
        setApprovalRejectionReason('');
        setApprovalAcceptanceReason('');
        if (chain && signer) {
            contractOfDecimal = new ethers.Contract(erc20USDC[chain], erc20Abi, signer);
            try {
                const expoValue = stringToBigNumber(totalPrice, DECIMALS[chain]);
                const resp = await contractOfDecimal.approve(decimalContractAddress[chain], expoValue);
                if (resp && resp.wait) {
                    const response = await resp.wait();
                    if (response.status) {
                        handleStepChange(2);
                        markStepComplete(1);
                        setApprovalAcceptanceReason('Approved')
                    } else {
                        setApprovalRejectionReason('Please select a valid range for approval');
                    }
                }
                setIsWaiting(false);
            } catch (err: any) {
                console.log(err);
                setApprovalRejectionReason(err.shortMessage);
                setIsWaiting(false);
            }
        } else {
            setApprovalRejectionReason('Please select a valid chain!');
        }
    }

    const handleMaxChainClick = () => {
        setTotalPrice(bigNumberToString(balanceOfUser, DECIMALS[chain]));
    }

    const handleMaxClick = () => {
        setGasFee(bigNumberToString((balance?.data?.value || 0n) /*/ JOB_CREATION_GAS[chain]*/, DECIMALS[chain]));
    }

    const checkApprovalButtonDisabled = () => {
        const a = stringToBigNumber(totalPrice);
        return stringToBigNumber(totalPrice) == 0n ||
            allowance >= stringToBigNumber(totalPrice) ||
            !checkifApprovalRequired ||
            isConfirming ||
            isConfirmed;
    }

    const checkSubmitButtonDisabled = () => {
        return stringToBigNumber(totalPrice) == 0n ||
            !completedSteps.includes(1) ||
            allowance < stringToBigNumber(totalPrice);
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (!pricePerExecution) {
            setRewardsError('Price per execution is required');
            return;
        }

        setIsWaiting(true);
        // let contractOfDecimal;
        // contractOfDecimal = new ethers.Contract(decimalContractAddress[chain], decimalAbiJson.abi, signer);
        let contractOfDecimal = JobManager__factory.connect(decimalContractAddress[chain], signer)

        const abi = ethers.AbiCoder.defaultAbiCoder();
        const initKeys: string[] = ['type', 'token0', 'token1', 'frequency'];
        const initValues: string[] = ['priceFeed', address1, address2, frequencyValue];
        const image: IJobManager.ImageStruct = { PCR0: "0x12", PCR1: "0x34", PCR2: "0x56" };
        const bytes = '0x1234';
        const validatorArray: IJobManager.ValidationSetupStruct[] = [
            {
                validationAddress: '0xddCEBb0fDa24166a0526A5228Ba9Ee6457F280D4',
                validationFunction: IValidator__factory.createInterface().getFunction("validate").selector,
                initializerFunction: IValidator__factory.createInterface().getFunction("initialize").selector,
                initializerData: abi.encode(["string[]", "string[]"], [initKeys, initValues])
            }
        ];

        try {
            console.log({
                validatorArray,
                enclaveImage,
                image,
                bytes,
                payment: stringToBigNumber(pricePerExecution, DECIMALS[chain]),
                a: 1000000000,
                b: 1000000000,
                c: 100000,
                amount: stringToBigNumber(totalPrice, DECIMALS[chain])
            })
            const resp = await contractOfDecimal.createJob(
                validatorArray,
                enclaveImage,
                image,
                bytes,
                stringToBigNumber(pricePerExecution, DECIMALS[chain]).toString(),
                1000000000,
                1000000000,
                100000,
                stringToBigNumber(totalPrice, DECIMALS[chain]).toString(),
                { value: 100000 }
            );
            console.log(resp);
            if (resp && resp.wait) {
                const response = await resp.wait();
                if (response?.status) {
                    handleStepChange(3);
                    markStepComplete(2);
                    alert('Intent Submitted Successfully !');
                    navigate('/');
                } else {
                    // TODO: failure Success message
                    alert('Cannot Submit !');
                }
            }
            setIsWaiting(false);
        } catch (err) {
            alert('Cannot Submit !');
            console.log(err);
            setIsWaiting(false);
        }
    };

    return (
        <>
            <div className='createJob'>
                <h2>
                    Create Intent
                </h2>
                <div className='formAndSummary'>
                    <div className='intentForm'>
                        {
                            account.address ?
                                <form onSubmit={handleSubmit} className='form-container'>
                                    <div className='form-group'>
                                        <label>Validator Contract:</label>
                                        <select value={validatorContract} onChange={handleValidatorContractChange} required>
                                            <option value="">Select Validator Contract</option>
                                            <option value="Price feed">Price feed</option>
                                            <option value="Custom code">Custom code</option>
                                        </select>
                                    </div>
                                    {
                                        validatorContract === 'Custom code' && (
                                            <>
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
                                            </>
                                        )
                                    }
                                    {
                                        validatorContract === 'Price feed' && (
                                            <>
                                                <div className='form-group'>
                                                    <label>Fetch me the price value pair of: </label>
                                                    <div className='frequency'>
                                                        <input type="text" placeholder='0x1234' value={address1} onChange={e => setAddress1(e.target.value)} required />
                                                        vs
                                                        <input type="text" placeholder='0x4321' value={address2} onChange={e => setAddress2(e.target.value)} required />
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }
                                    <div className='frequency' style={divStyle}>
                                        <div className='form-group' style={{ maxWidth: frequencyType === '' ? '100%' : '150px' }}>
                                            <label>Select Trigger:</label>
                                            <select value={frequencyType} onChange={(e) => { setFrequencyType(e.target.value); setFrequencyValue(''); }} required>
                                                <option value="">Select trigger</option>
                                                <option value="Frequency">Frequency</option>
                                                <option value="Custom code">Custom code</option>
                                            </select>
                                        </div>
                                        {
                                            frequencyType === 'Frequency' && (
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
                                            )
                                        }
                                        {
                                            frequencyType === 'Custom code' && (
                                                <div className='form-group'>
                                                    <label>Custom validation code:</label>
                                                    <div className='frequency'>
                                                        <input
                                                            type="url"
                                                            value={frequencyValue}
                                                            onChange={(e) => setFrequencyValue(e.target.value)}
                                                            placeholder='https://github.com/....'
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className='frequency' style={divStyle}>
                                        <div className='form-group'>
                                            <label>Rewards Per Execution:</label>
                                            <div className='frequency'>
                                                <input type='text' value={pricePerExecution} onChange={handleRewardsChange} required />
                                                DPT
                                            </div>
                                            {<span style={{ color: 'transparent' }} className='error-message'>.</span>}
                                            {rewardsError && <span style={{ color: 'red' }} className='error-message'>{rewardsError}</span>}
                                        </div>
                                        <div className='form-group'>
                                            <label>Total Rewards:</label>
                                            <div className='frequency'>
                                                <input type='text' name="totalPrice" value={totalPrice} onChange={(e) => setTotalPrice(e.target.value)} required />
                                                DPT
                                            </div>
                                            {
                                                <>
                                                    {/* <span style={{ fontStyle: 'italic' }} className='sub-message'>Balance: {bigNumberToString(balanceOfUser, DECIMALS[chain])} DPT </span>
                                                    <span className='spacer-horizontal'>|</span> */}
                                                    <InlineButton onClick={handleMaxChainClick}>Max</InlineButton>
                                                </>
                                            }
                                            {rewardsError && <span style={{ color: 'red' }} className='error-message'>{rewardsError}</span>}
                                        </div>
                                    </div>
                                    {/* <div className='form-group'>
                                        <i>
                                            {
                                                stringToBigNumber(pricePerExecution) > 0 && !!(totalPrice && pricePerExecution) && (`Approx executions: ~ ${stringToBigNumber(totalPrice) / stringToBigNumber(pricePerExecution)}`)
                                            }
                                        </i>
                                    </div> */}
                                    <div className="stepper">
                                        <div className='form-group'>
                                            <button
                                                className={!checkApprovalButtonDisabled() ? 'active' : ''}
                                                onClick={(e) => { submitForApproval(e) }}
                                                disabled={checkApprovalButtonDisabled()}
                                            >
                                                {isPending ? 'Approving...' : 'Approve Rewards'}
                                            </button>
                                            <div>
                                                {approvalRejectionReason && <span style={{ color: 'red' }} className='error-message'>{approvalRejectionReason}</span>}
                                                {approvalAcceptanceReason && <span style={{ color: '#00ff0a' }} className='error-message'>{approvalAcceptanceReason}</span>}
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className='frequency' style={divStyle}>
                                <div className='form-group'>
                                    <label>Gas Fee:</label>
                                    <div className='frequency'>
                                        <input type='text' name="gasFee" value={gasFee} onChange={(e) => setGasFee(e.target.value)} required />
                                        Gwei
                                    </div>
                                    {
                                        // balance?.data &&
                                        <>
                                    <span style={{ fontStyle: 'italic' }} className='sub-message'>Balance: {bigNumberToString((balance?.data?.value || 0n) */}
                                    {/*/ JOB_CREATION_GAS[chain], DECIMALS[chain])} {balance?.data?.symbol} </span>
                                            <span className='spacer-horizontal'>|</span>
                                            <InlineButton onClick={handleMaxClick}>Max</InlineButton>
                                        </>
                                    }
                                    {rewardsError && <span style={{ color: 'red' }} className='error-message'>{rewardsError}</span>}
                                </div>
                            </div> */}
                                    {/* <br /> */}
                                    {isConfirming && <div>Waiting for Approval...</div>}
                                    {isConfirmed && <div>Transaction Approved.</div>}
                                    {error && (
                                        <div className='error-message'>Error: {(error as BaseError).shortMessage || error.message}</div>
                                    )}
                                    {/* <br /> */}
                                    <div className='stepper'>
                                        <button
                                            className={!checkSubmitButtonDisabled() ? 'active' : ''}
                                            disabled={checkSubmitButtonDisabled()}
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
                    <div className='summary'>
                        {
                            account.address &&
                            <>
                                <div className='summaryHeader'>
                                    Here's your intent summary: Let's Go!
                                </div>
                                <div className='summaryBody'>
                                    Your wallet address is <span className='args'>{account.address}</span>
                                    <br />
                                    <br />
                                    with token balance <span className='args'>{bigNumberToString((balance?.data?.value || 0n), DECIMALS[chain])} {balance?.data?.symbol}</span>
                                    <br />
                                    <br />
                                    <br />
                                    {
                                        validatorContract === 'Price feed' && (
                                            <p>Get me the price feed for <span className='args'>{address1 || 'token0'}</span> vs <span className='args'>{address2 || 'token1'}</span></p>
                                        )
                                    }
                                    {
                                        validatorContract === 'Custom code' && (
                                            <p>Run my custom code from: <span className='args'>{enclaveImage || '<URL1>'}</span></p>
                                        )
                                    }
                                    {
                                        frequencyType === 'Frequency' && (
                                            <p>every <span className='args'>{frequencyValue || '0'}</span> blocks.</p>
                                        )
                                    }
                                    {
                                        frequencyType === 'Custom code' && (
                                            <p>when the trigger conditions of <span className='args'>{frequencyValue || '<URL2>'}</span> is set.</p>
                                        )
                                    }
                                    <br />
                                    {
                                        !!balanceOfUser && pricePerExecution && (
                                            <p>Of my current rewards balance: <span className='args'>{`${bigNumberToString(balanceOfUser, DECIMALS[chain])}`}</span> DPT</p>
                                        )
                                    }
                                    {
                                        pricePerExecution && (
                                            <>
                                                <p>I'll pay <span className='args'>{pricePerExecution}</span> DPT for every execution;
                                                    {
                                                        totalPrice && (
                                                            <span> & allocate <span className='args'>{totalPrice}</span> DPT for this job in total.</span>
                                                        )
                                                    }
                                                </p>
                                            </>
                                        )
                                    }
                                    {/* {
                                        totalPrice && (
                                            <p>& allocate <span className='args'>{totalPrice}</span> DPT for this job in total.</p>
                                        )
                                    } */}
                                    {

                                        stringToBigNumber(pricePerExecution) > 0 && !!(totalPrice && pricePerExecution) && (
                                            <p>This means the job can be run ~ <span className='args'>{`${stringToBigNumber(totalPrice) / stringToBigNumber(pricePerExecution)}`}</span> times.</p>
                                        )
                                    }
                                    <br />
                                    {
                                        !!allowance && pricePerExecution && (
                                            <p>There are total <span className='args'>{`${bigNumberToString(allowance, DECIMALS[chain])}`}</span> DPT approved rewards for this job.</p>
                                        )
                                    }

                                </div>
                            </>
                        }
                    </div>
                </div>
                {
                    <WaitCursor isLoading={isWaiting} />
                }
            </div>
        </>
    );
};

export default CreateIntent;
