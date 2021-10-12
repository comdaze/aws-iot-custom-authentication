/**
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0.
 */
import { MqttConnectionConfig } from "./mqtt";
import WebsocketStream = require("websocket-stream");
/**
 * Options for websocket based connections in browser
 *
 * @module aws-crt
 * @category HTTP
 */
export interface WebsocketOptions {
    /** Additional headers to add */
    headers?: {
        [index: string]: string;
    };
    /** Websocket protocol, used during Upgrade */
    protocol?: string;
}
/** Standard AWS Credentials */
export interface AWSCredentials {
    /** Optional region */
    aws_region?: string;
    /** AWS access id */
    aws_access_id: string;
    /** AWS secret access key */
    aws_secret_key: string;
    /** STS token if one has been vended (by a {@link CredentialsProvider}) */
    aws_sts_token?: string;
}
/** @internal */
export declare function create_websocket_url(config: MqttConnectionConfig): string;
/** @internal */
export declare function create_websocket_stream(config: MqttConnectionConfig): WebsocketStream.WebSocketDuplex;
