/**
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0.
 */
/**
 * Returns true if this script is running under nodejs
 *
 * @module aws-crt
 * @category System
 */
export declare function is_nodejs(): boolean;
/**
 * Returns true if this script is running in a browser
 *
 * @module aws-crt
 * @category System
 */
export declare function is_browser(): boolean;
/**
 * Returns the package information for aws-crt-nodejs
 *
 * @module aws-crt
 * @category System
 */
export declare function package_info(): any;
/**
 * Returns the AWS CRT version
 *
 * @module aws-crt
 * @category System
 */
export declare function crt_version(): any;
