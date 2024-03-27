/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "../../common";

export interface IAttestationVerifierInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "verify(bytes)"
      | "verify(bytes,bytes,bytes,bytes,bytes,uint256,uint256,uint256)"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "verify(bytes)",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "verify(bytes,bytes,bytes,bytes,bytes,uint256,uint256,uint256)",
    values: [
      BytesLike,
      BytesLike,
      BytesLike,
      BytesLike,
      BytesLike,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "verify(bytes)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "verify(bytes,bytes,bytes,bytes,bytes,uint256,uint256,uint256)",
    data: BytesLike
  ): Result;
}

export interface IAttestationVerifier extends BaseContract {
  connect(runner?: ContractRunner | null): IAttestationVerifier;
  waitForDeployment(): Promise<this>;

  interface: IAttestationVerifierInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  "verify(bytes)": TypedContractMethod<[data: BytesLike], [void], "view">;

  "verify(bytes,bytes,bytes,bytes,bytes,uint256,uint256,uint256)": TypedContractMethod<
    [
      attestation: BytesLike,
      enclaveKey: BytesLike,
      PCR0: BytesLike,
      PCR1: BytesLike,
      PCR2: BytesLike,
      enclaveCPUs: BigNumberish,
      enclaveMemory: BigNumberish,
      timestamp: BigNumberish
    ],
    [void],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "verify(bytes)"
  ): TypedContractMethod<[data: BytesLike], [void], "view">;
  getFunction(
    nameOrSignature: "verify(bytes,bytes,bytes,bytes,bytes,uint256,uint256,uint256)"
  ): TypedContractMethod<
    [
      attestation: BytesLike,
      enclaveKey: BytesLike,
      PCR0: BytesLike,
      PCR1: BytesLike,
      PCR2: BytesLike,
      enclaveCPUs: BigNumberish,
      enclaveMemory: BigNumberish,
      timestamp: BigNumberish
    ],
    [void],
    "view"
  >;

  filters: {};
}