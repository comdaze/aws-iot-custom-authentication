/**
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0.
 */
/**
 * Represents an error thrown by the CRT browser shim
 *
 * @module aws-crt
* @category System
 */
export declare class CrtError extends Error {
    readonly error: any;
    /** @var error - The original error, provided for context. Could be any type, often from underlying libraries */
    constructor(error: any);
}
