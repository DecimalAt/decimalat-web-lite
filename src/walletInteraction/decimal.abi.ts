const decimalAbiJson: any = {
    "abi": [
        {
            "type": "constructor",
            "inputs": [
                {
                    "name": "_token",
                    "type": "address",
                    "internalType": "address"
                },
                {
                    "name": "_verifier",
                    "type": "address",
                    "internalType": "address"
                },
                {
                    "name": "_admin",
                    "type": "address",
                    "internalType": "address"
                },
                {
                    "name": "_maxAge",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "nonpayable"
        },
        {
            "type": "function",
            "name": "ATTESTATION_MAX_AGE",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "ATTESTATION_VERIFIER",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "address",
                    "internalType": "contract IAttestationVerifier"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "DEFAULT_ADMIN_ROLE",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "bytes32",
                    "internalType": "bytes32"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "admin",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "address",
                    "internalType": "address"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "createJob",
            "inputs": [
                {
                    "name": "_validations",
                    "type": "tuple[]",
                    "internalType": "struct IJobManager.ValidationSetup[]",
                    "components": [
                        {
                            "name": "validationAddress",
                            "type": "address",
                            "internalType": "address"
                        },
                        {
                            "name": "validationFunction",
                            "type": "bytes4",
                            "internalType": "bytes4"
                        },
                        {
                            "name": "initializerFunction",
                            "type": "bytes4",
                            "internalType": "bytes4"
                        },
                        {
                            "name": "initializerData",
                            "type": "bytes",
                            "internalType": "bytes"
                        }
                    ]
                },
                {
                    "name": "_enclave_url",
                    "type": "string",
                    "internalType": "string"
                },
                {
                    "name": "_pcrs",
                    "type": "tuple",
                    "internalType": "struct IJobManager.Image",
                    "components": [
                        {
                            "name": "PCR0",
                            "type": "bytes",
                            "internalType": "bytes"
                        },
                        {
                            "name": "PCR1",
                            "type": "bytes",
                            "internalType": "bytes"
                        },
                        {
                            "name": "PCR2",
                            "type": "bytes",
                            "internalType": "bytes"
                        }
                    ]
                },
                {
                    "name": "_input",
                    "type": "bytes",
                    "internalType": "bytes"
                },
                {
                    "name": "_paymentPerExecution",
                    "type": "uint256",
                    "internalType": "uint256"
                },
                {
                    "name": "_maxBaseFee",
                    "type": "uint256",
                    "internalType": "uint256"
                },
                {
                    "name": "_maxPriorityFee",
                    "type": "uint256",
                    "internalType": "uint256"
                },
                {
                    "name": "_gasRefundAmount",
                    "type": "uint256",
                    "internalType": "uint256"
                },
                {
                    "name": "_amount",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "payable"
        },
        {
            "type": "function",
            "name": "executeJob",
            "inputs": [
                {
                    "name": "jobId",
                    "type": "uint256",
                    "internalType": "uint256"
                },
                {
                    "name": "data",
                    "type": "bytes",
                    "internalType": "bytes"
                },
                {
                    "name": "attestation",
                    "type": "bytes",
                    "internalType": "bytes"
                }
            ],
            "outputs": [],
            "stateMutability": "nonpayable"
        },
        {
            "type": "function",
            "name": "getRoleAdmin",
            "inputs": [
                {
                    "name": "role",
                    "type": "bytes32",
                    "internalType": "bytes32"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "bytes32",
                    "internalType": "bytes32"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "getRoleMember",
            "inputs": [
                {
                    "name": "role",
                    "type": "bytes32",
                    "internalType": "bytes32"
                },
                {
                    "name": "index",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "address",
                    "internalType": "address"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "getRoleMemberCount",
            "inputs": [
                {
                    "name": "role",
                    "type": "bytes32",
                    "internalType": "bytes32"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "getVerifiedKey",
            "inputs": [
                {
                    "name": "_key",
                    "type": "address",
                    "internalType": "address"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "bytes32",
                    "internalType": "bytes32"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "getWhitelistedImage",
            "inputs": [
                {
                    "name": "_imageId",
                    "type": "bytes32",
                    "internalType": "bytes32"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "tuple",
                    "internalType": "struct AttestationAuther.EnclaveImage",
                    "components": [
                        {
                            "name": "PCR0",
                            "type": "bytes",
                            "internalType": "bytes"
                        },
                        {
                            "name": "PCR1",
                            "type": "bytes",
                            "internalType": "bytes"
                        },
                        {
                            "name": "PCR2",
                            "type": "bytes",
                            "internalType": "bytes"
                        }
                    ]
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "grantRole",
            "inputs": [
                {
                    "name": "role",
                    "type": "bytes32",
                    "internalType": "bytes32"
                },
                {
                    "name": "account",
                    "type": "address",
                    "internalType": "address"
                }
            ],
            "outputs": [],
            "stateMutability": "nonpayable"
        },
        {
            "type": "function",
            "name": "hasRole",
            "inputs": [
                {
                    "name": "role",
                    "type": "bytes32",
                    "internalType": "bytes32"
                },
                {
                    "name": "account",
                    "type": "address",
                    "internalType": "address"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "bool",
                    "internalType": "bool"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "isEnclaveKeyValid",
            "inputs": [
                {
                    "name": "key",
                    "type": "address",
                    "internalType": "address"
                }
            ],
            "outputs": [],
            "stateMutability": "nonpayable"
        },
        {
            "type": "function",
            "name": "jobCount",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "jobs",
            "inputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "outputs": [
                {
                    "name": "creator",
                    "type": "address",
                    "internalType": "address"
                },
                {
                    "name": "image",
                    "type": "tuple",
                    "internalType": "struct IJobManager.Image",
                    "components": [
                        {
                            "name": "PCR0",
                            "type": "bytes",
                            "internalType": "bytes"
                        },
                        {
                            "name": "PCR1",
                            "type": "bytes",
                            "internalType": "bytes"
                        },
                        {
                            "name": "PCR2",
                            "type": "bytes",
                            "internalType": "bytes"
                        }
                    ]
                },
                {
                    "name": "enclave_url",
                    "type": "string",
                    "internalType": "string"
                },
                {
                    "name": "input",
                    "type": "bytes",
                    "internalType": "bytes"
                },
                {
                    "name": "paymentPerExecution",
                    "type": "uint256",
                    "internalType": "uint256"
                },
                {
                    "name": "lastExecutionTime",
                    "type": "uint256",
                    "internalType": "uint256"
                },
                {
                    "name": "maxBaseFee",
                    "type": "uint256",
                    "internalType": "uint256"
                },
                {
                    "name": "maxPriorityFee",
                    "type": "uint256",
                    "internalType": "uint256"
                },
                {
                    "name": "gasRefundAmount",
                    "type": "uint256",
                    "internalType": "uint256"
                },
                {
                    "name": "amount",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "renounceRole",
            "inputs": [
                {
                    "name": "role",
                    "type": "bytes32",
                    "internalType": "bytes32"
                },
                {
                    "name": "account",
                    "type": "address",
                    "internalType": "address"
                }
            ],
            "outputs": [],
            "stateMutability": "nonpayable"
        },
        {
            "type": "function",
            "name": "revokeRole",
            "inputs": [
                {
                    "name": "role",
                    "type": "bytes32",
                    "internalType": "bytes32"
                },
                {
                    "name": "account",
                    "type": "address",
                    "internalType": "address"
                }
            ],
            "outputs": [],
            "stateMutability": "nonpayable"
        },
        {
            "type": "function",
            "name": "supportsInterface",
            "inputs": [
                {
                    "name": "interfaceId",
                    "type": "bytes4",
                    "internalType": "bytes4"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "bool",
                    "internalType": "bool"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "token",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "address",
                    "internalType": "contract ERC20"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "updateToken",
            "inputs": [
                {
                    "name": "_token",
                    "type": "address",
                    "internalType": "address"
                }
            ],
            "outputs": [],
            "stateMutability": "nonpayable"
        },
        {
            "type": "function",
            "name": "verifyKey",
            "inputs": [
                {
                    "name": "signature",
                    "type": "bytes",
                    "internalType": "bytes"
                },
                {
                    "name": "enclavePubKey",
                    "type": "bytes",
                    "internalType": "bytes"
                },
                {
                    "name": "imageId",
                    "type": "bytes32",
                    "internalType": "bytes32"
                },
                {
                    "name": "enclaveCPUs",
                    "type": "uint256",
                    "internalType": "uint256"
                },
                {
                    "name": "enclaveMemory",
                    "type": "uint256",
                    "internalType": "uint256"
                },
                {
                    "name": "timestampInMilliseconds",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "outputs": [],
            "stateMutability": "nonpayable"
        },
        {
            "type": "event",
            "name": "EnclaveImageRevoked",
            "inputs": [
                {
                    "name": "imageId",
                    "type": "bytes32",
                    "indexed": true,
                    "internalType": "bytes32"
                }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "EnclaveImageWhitelisted",
            "inputs": [
                {
                    "name": "imageId",
                    "type": "bytes32",
                    "indexed": true,
                    "internalType": "bytes32"
                },
                {
                    "name": "PCR0",
                    "type": "bytes",
                    "indexed": false,
                    "internalType": "bytes"
                },
                {
                    "name": "PCR1",
                    "type": "bytes",
                    "indexed": false,
                    "internalType": "bytes"
                },
                {
                    "name": "PCR2",
                    "type": "bytes",
                    "indexed": false,
                    "internalType": "bytes"
                }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "EnclaveKeyRevoked",
            "inputs": [
                {
                    "name": "enclavePubKey",
                    "type": "bytes",
                    "indexed": true,
                    "internalType": "bytes"
                }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "EnclaveKeyVerified",
            "inputs": [
                {
                    "name": "enclavePubKey",
                    "type": "bytes",
                    "indexed": true,
                    "internalType": "bytes"
                },
                {
                    "name": "imageId",
                    "type": "bytes32",
                    "indexed": true,
                    "internalType": "bytes32"
                }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "EnclaveKeyWhitelisted",
            "inputs": [
                {
                    "name": "enclavePubKey",
                    "type": "bytes",
                    "indexed": true,
                    "internalType": "bytes"
                },
                {
                    "name": "imageId",
                    "type": "bytes32",
                    "indexed": true,
                    "internalType": "bytes32"
                }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "JobCreated",
            "inputs": [
                {
                    "name": "jobId",
                    "type": "uint256",
                    "indexed": true,
                    "internalType": "uint256"
                },
                {
                    "name": "enclaveUrl",
                    "type": "string",
                    "indexed": false,
                    "internalType": "string"
                },
                {
                    "name": "input",
                    "type": "bytes",
                    "indexed": false,
                    "internalType": "bytes"
                },
                {
                    "name": "creator",
                    "type": "address",
                    "indexed": true,
                    "internalType": "address"
                },
                {
                    "name": "validations",
                    "type": "tuple[]",
                    "indexed": false,
                    "internalType": "struct JobManager.Validation[]",
                    "components": [
                        {
                            "name": "validationAddress",
                            "type": "address",
                            "internalType": "address"
                        },
                        {
                            "name": "validationFunction",
                            "type": "bytes4",
                            "internalType": "bytes4"
                        }
                    ]
                },
                {
                    "name": "paymentPerExecution",
                    "type": "uint256",
                    "indexed": false,
                    "internalType": "uint256"
                },
                {
                    "name": "maxBaseFee",
                    "type": "uint256",
                    "indexed": false,
                    "internalType": "uint256"
                },
                {
                    "name": "maxPriorityFee",
                    "type": "uint256",
                    "indexed": false,
                    "internalType": "uint256"
                },
                {
                    "name": "gasRefundAmount",
                    "type": "uint256",
                    "indexed": false,
                    "internalType": "uint256"
                },
                {
                    "name": "amount",
                    "type": "uint256",
                    "indexed": false,
                    "internalType": "uint256"
                }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "JobExecuted",
            "inputs": [
                {
                    "name": "jobId",
                    "type": "uint256",
                    "indexed": true,
                    "internalType": "uint256"
                },
                {
                    "name": "executor",
                    "type": "address",
                    "indexed": true,
                    "internalType": "address"
                },
                {
                    "name": "payment",
                    "type": "uint256",
                    "indexed": false,
                    "internalType": "uint256"
                },
                {
                    "name": "data",
                    "type": "bytes",
                    "indexed": false,
                    "internalType": "bytes"
                }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "RoleAdminChanged",
            "inputs": [
                {
                    "name": "role",
                    "type": "bytes32",
                    "indexed": true,
                    "internalType": "bytes32"
                },
                {
                    "name": "previousAdminRole",
                    "type": "bytes32",
                    "indexed": true,
                    "internalType": "bytes32"
                },
                {
                    "name": "newAdminRole",
                    "type": "bytes32",
                    "indexed": true,
                    "internalType": "bytes32"
                }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "RoleGranted",
            "inputs": [
                {
                    "name": "role",
                    "type": "bytes32",
                    "indexed": true,
                    "internalType": "bytes32"
                },
                {
                    "name": "account",
                    "type": "address",
                    "indexed": true,
                    "internalType": "address"
                },
                {
                    "name": "sender",
                    "type": "address",
                    "indexed": true,
                    "internalType": "address"
                }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "RoleRevoked",
            "inputs": [
                {
                    "name": "role",
                    "type": "bytes32",
                    "indexed": true,
                    "internalType": "bytes32"
                },
                {
                    "name": "account",
                    "type": "address",
                    "indexed": true,
                    "internalType": "address"
                },
                {
                    "name": "sender",
                    "type": "address",
                    "indexed": true,
                    "internalType": "address"
                }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "TokenUpdated",
            "inputs": [
                {
                    "name": "token",
                    "type": "address",
                    "indexed": true,
                    "internalType": "address"
                }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "VerifierUpdated",
            "inputs": [
                {
                    "name": "verifier",
                    "type": "address",
                    "indexed": true,
                    "internalType": "address"
                }
            ],
            "anonymous": false
        }
    ]
}

export default decimalAbiJson;