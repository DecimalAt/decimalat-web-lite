/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IAttestationVerifier,
  IAttestationVerifierInterface,
} from "../../../contracts/interfaces/IAttestationVerifier";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "verify",
    outputs: [],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "attestation",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "enclaveKey",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "PCR0",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "PCR1",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "PCR2",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "enclaveCPUs",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "enclaveMemory",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "verify",
    outputs: [],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class IAttestationVerifier__factory {
  static readonly abi = _abi;
  static createInterface(): IAttestationVerifierInterface {
    return new Interface(_abi) as IAttestationVerifierInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): IAttestationVerifier {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as IAttestationVerifier;
  }
}
