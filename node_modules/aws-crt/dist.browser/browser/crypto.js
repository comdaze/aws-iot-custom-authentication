"use strict";
/**
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hmac_sha256 = exports.Sha256Hmac = exports.hash_sha256 = exports.Sha256Hash = exports.hash_md5 = exports.Md5Hash = void 0;
var Crypto = __importStar(require("crypto-js"));
var polyfills_1 = require("./polyfills");
/**
 * Object that allows for continuous MD5 hashing of data.
 *
 * @module aws-crt
 * @category Crypto
 */
var Md5Hash = /** @class */ (function () {
    function Md5Hash() {
    }
    /**
     * Digests additional data
     * @param data Additional data to digest
     */
    Md5Hash.prototype.update = function (data) {
        this.hash = Crypto.MD5(data.toString(), this.hash ? this.hash.toString() : undefined);
    };
    /**
     * Completes the hash computation and returns the final digest.
     *
     * @param truncate_to The maximum number of bytes to receive. Leave as undefined or 0 to receive the entire digest.
     */
    Md5Hash.prototype.finalize = function (truncate_to) {
        var digest = this.hash ? this.hash.toString() : '';
        var truncated = digest.substring(0, truncate_to ? truncate_to : digest.length);
        var encoder = new polyfills_1.TextEncoder();
        var bytes = encoder.encode(truncated);
        return new DataView(bytes.buffer);
    };
    return Md5Hash;
}());
exports.Md5Hash = Md5Hash;
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
function hash_md5(data, truncate_to) {
    var md5 = new Md5Hash();
    md5.update(data);
    return md5.finalize(truncate_to);
}
exports.hash_md5 = hash_md5;
/**
 * Object that allows for continuous SHA256 hashing of data.
 *
 * @module aws-crt
 * @category Crypto
 */
var Sha256Hash = /** @class */ (function () {
    function Sha256Hash() {
    }
    /**
     * Digests additional data
     * @param data Additional data to digest
     */
    Sha256Hash.prototype.update = function (data) {
        this.hash = Crypto.SHA256(data.toString(), this.hash ? this.hash.toString() : undefined);
    };
    /**
    * Completes the hash computation and returns the final digest.
    *
    * @param truncate_to The maximum number of bytes to receive. Leave as undefined or 0 to receive the entire digest.
    */
    Sha256Hash.prototype.finalize = function (truncate_to) {
        var digest = this.hash ? this.hash.toString() : '';
        var truncated = digest.substring(0, truncate_to ? truncate_to : digest.length);
        var encoder = new polyfills_1.TextEncoder();
        var bytes = encoder.encode(truncated);
        return new DataView(bytes.buffer);
    };
    return Sha256Hash;
}());
exports.Sha256Hash = Sha256Hash;
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
function hash_sha256(data, truncate_to) {
    var digest = Crypto.SHA256(data.toString()).toString();
    var truncated = digest.substring(0, truncate_to ? truncate_to : digest.length);
    var encoder = new polyfills_1.TextEncoder();
    var bytes = encoder.encode(truncated);
    return new DataView(bytes.buffer);
}
exports.hash_sha256 = hash_sha256;
/**
 * Object that allows for continuous hashing of data with an hmac secret.
 *
 * @module aws-crt
 * @category Crypto
 */
var Sha256Hmac = /** @class */ (function () {
    function Sha256Hmac(secret) {
        // @ts-ignore types file doesn't have this signature of create()
        this.hmac = Crypto.algo.HMAC.create(Crypto.algo.SHA256, secret);
    }
    /**
     * Digests additional data
     * @param data Additional data to digest
     */
    Sha256Hmac.prototype.update = function (data) {
        this.hmac.update(data.toString());
    };
    /**
    * Completes the hash computation and returns the final digest.
    *
    * @param truncate_to The maximum number of bytes to receive. Leave as undefined or 0 to receive the entire digest.
    */
    Sha256Hmac.prototype.finalize = function (truncate_to) {
        var digest = this.hmac.finalize();
        var truncated = digest.toString().substring(0, truncate_to ? truncate_to : digest.length);
        var encoder = new polyfills_1.TextEncoder();
        var bytes = encoder.encode(truncated);
        return new DataView(bytes.buffer);
    };
    return Sha256Hmac;
}());
exports.Sha256Hmac = Sha256Hmac;
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
function hmac_sha256(secret, data, truncate_to) {
    var hmac = new Sha256Hmac(secret);
    hmac.update(data);
    return hmac.finalize(truncate_to);
}
exports.hmac_sha256 = hmac_sha256;
//# sourceMappingURL=crypto.js.map