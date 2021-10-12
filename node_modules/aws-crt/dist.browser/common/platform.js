"use strict";
/**
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.crt_version = exports.package_info = exports.is_browser = exports.is_nodejs = void 0;
/**
 * Returns true if this script is running under nodejs
 *
 * @module aws-crt
 * @category System
 */
function is_nodejs() {
    return (typeof process === 'object' &&
        typeof process.versions === 'object' &&
        typeof process.versions.node !== 'undefined');
}
exports.is_nodejs = is_nodejs;
/**
 * Returns true if this script is running in a browser
 *
 * @module aws-crt
 * @category System
 */
function is_browser() {
    return !is_nodejs();
}
exports.is_browser = is_browser;
/**
 * Returns the package information for aws-crt-nodejs
 *
 * @module aws-crt
 * @category System
 */
function package_info() {
    try {
        var pkg = require('../../package.json');
        return pkg;
    }
    catch (err) {
        return {
            name: 'aws-crt-nodejs',
            version: 'UNKNOWN'
        };
    }
}
exports.package_info = package_info;
/**
 * Returns the AWS CRT version
 *
 * @module aws-crt
 * @category System
 */
function crt_version() {
    var pkg = package_info();
    return pkg.version;
}
exports.crt_version = crt_version;
//# sourceMappingURL=platform.js.map