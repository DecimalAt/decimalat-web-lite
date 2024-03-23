import { FormEvent } from 'react';
import { type Hex, parseEther } from 'viem';
import { type BaseError, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';

import './styles.css';

interface SendTransactionProps {
    address: string,
    amount: number,
    onResponse: Function
}

export const SendTransaction: React.FC<SendTransactionProps> = ({ address, amount, onResponse }) => {
    debugger
    const { data: hash, error, isPending, sendTransaction } = useSendTransaction();

    async function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const to = formData.get('address') as Hex
        const value = formData.get('value') as string
        sendTransaction({ to, value: parseEther(value) })
    }

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        })

    return (
        <div className="container">
            <div className="stack">
                <form className="set" onSubmit={submit}>
                    <input name="address" placeholder="Address" value={address} required hidden />
                    <input
                        name="value"
                        placeholder="Amount (ETH)"
                        type="number"
                        value={amount}
                        step="0.000000001"
                        required
                        hidden
                    />
                    <button disabled={isPending} type="submit" className='stepper button active'>
                        {isPending ? 'Approving...' : 'Approve Rewards'}
                    </button>
                </form>
                {hash && <div>Transaction Hash: {hash}</div>}
                {isConfirming && <div>Waiting for Approval...</div>}
                {isConfirmed && <div>Transaction Approved.</div> && (onResponse(hash))}
                {error && (
                    <div>Error: {(error as BaseError).shortMessage || error.message}</div>
                )}
            </div>
        </div>
    )
}
