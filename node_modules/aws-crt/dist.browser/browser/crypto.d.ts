/**
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0.
 */
import { Hashable } from "../common/crypto";
/**
 * Object that allows for continuous MD5 hashing of data.
 *
 * @module aws-crt
 * @category Crypto
 */
export declare class Md5Hash {
    private hash?;
    /**
     * Digests additional data
     * @param data Additional data to digest
     */
    update(data: Hashable): void;
    /**
     * Completes the hash computation and returns the final digest.
     *
     * @param truncate_to The maximum number of bytes to receive. Leave as undefined or 0 to receive the entire digest.
     */
    finalize(truncate_to?: number): DataView;
}
/**
 * Computes an MD5 hash. Use this if you don't need to stream the data you're hashing and can load the entire input
 * into memory.
 *
 * @param data The data to hash
 * @param truncate_to The maximum number of bytes to receive. Leave as undefined or 0 to receive the entire digest.
 *
 * @module aws-crt
 * @category Crypto
 */
export declare function hash_md5(data: Hashable, truncate_to?: number): DataView;
/**
 * Object that allows for continuous SHA256 hashing of data.
 *
 * @module aws-crt
 * @category Crypto
 */
export declare class Sha256Hash {
    private hash?;
    /**
     * Digests additional data
     * @param data Additional data to digest
     */
    update(data: Hashable): void;
    /**
    * Completes the hash computation and returns the final digest.
    *
    * @param truncate_to The maximum number of bytes to receive. Leave as undefined or 0 to receive the entire digest.
    */
    finalize(truncate_to?: number): DataView;
}
/**
 * Computes an SHA256 hash. Use this if you don't need to stream the data you're hashing and can load the entire input
 * into memory.
 *
 * @param data The data to hash
 * @param truncate_to The maximum number of bytes to receive. Leave as undefined or 0 to receive the entire digest.
 *
 * @module aws-crt
 * @category Crypto
 */
export declare function hash_sha256(data: Hashable, truncate_to?: number): DataView;
/**
 * Object that allows for continuous hashing of data with an hmac secret.
 *
 * @module aws-crt
 * @category Crypto
 */
export declare class Sha256Hmac {
    private hmac;
    constructor(secret: Hashable);
    /**
     * Digests additional data
     * @param data Additional data to digest
     */
    update(data: Hashable): void;
    /**
    * Completes the hash computation and returns the final digest.
    *
    * @param truncate_to The maximum number of bytes to receive. Leave as undefined or 0 to receive the entire digest.
    */
    finalize(truncate_to?: number): DataView;
}
/**
 * Computes an SHA256 HMAC. Use this if you don't need to stream the data you're hashing and can load the entire input
 * into memory.
 *
 * @param secret The key to use for the HMAC process
 * @param data The data to hash
 * @param truncate_to The maximum number of bytes to receive. Leave as undefined or 0 to receive the entire digest.
 *
 * @module aws-crt
 * @category Crypto
 */
export declare function hmac_sha256(secret: Hashable, data: Hashable, truncate_to?: number): DataView;
