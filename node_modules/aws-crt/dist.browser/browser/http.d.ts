/**
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0.
 */
import { HttpHeader, HttpHeaders as CommonHttpHeaders, HttpProxyOptions } from '../common/http';
export { HttpHeader, HttpProxyOptions, HttpProxyAuthenticationType } from '../common/http';
import { BufferedEventEmitter } from '../common/event';
import { ClientBootstrap, InputStream, SocketOptions, TlsConnectionOptions } from './io';
/**
 * A collection of HTTP headers
 *
 * @module aws-crt
 * @category HTTP
 */
export declare class HttpHeaders implements CommonHttpHeaders {
    private headers;
    /** Construct from a collection of [name, value] pairs */
    constructor(headers?: HttpHeader[]);
    get length(): number;
    /**
     * Add a name/value pair
     * @param name - The header name
     * @param value - The header value
    */
    add(name: string, value: string): void;
    /**
     * Set a name/value pair, replacing any existing values for the name
     * @param name - The header name
     * @param value - The header value
    */
    set(name: string, value: string): void;
    /**
     * Get the list of values for the given name
     * @param name - The header name to look for
     * @return List of values, or empty list if none exist
     */
    get_values(name: string): string[];
    /**
     * Gets the first value for the given name, ignoring any additional values
     * @param name - The header name to look for
     * @param default_value - Value returned if no values are found for the given name
     * @return The first header value, or default if no values exist
     */
    get(name: string, default_value?: string): string;
    /**
     * Removes all values for the given name
     * @param name - The header to remove all values for
     */
    remove(name: string): void;
    /**
     * Removes a specific name/value pair
     * @param name - The header name to remove
     * @param value - The header value to remove
     */
    remove_value(name: string, value: string): void;
    /** Clears the entire header set */
    clear(): void;
    /**
     * Iterator. Allows for:
     * let headers = new HttpHeaders();
     * ...
     * for (const header of headers) { }
    */
    [Symbol.iterator](): Generator<HttpHeader, void, unknown>;
    /** @internal */
    _flatten(): HttpHeader[];
}
/** Represents a request to a web server from a client */
export declare class HttpRequest {
    /** The verb to use for the request (i.e. GET, POST, PUT, DELETE, HEAD) */
    method: string;
    /** The URI of the request */
    path: string;
    /** Additional custom headers to send to the server */
    headers: HttpHeaders;
    /** The request body, in the case of a POST or PUT request */
    body?: InputStream | undefined;
    constructor(
    /** The verb to use for the request (i.e. GET, POST, PUT, DELETE, HEAD) */
    method: string, 
    /** The URI of the request */
    path: string, 
    /** Additional custom headers to send to the server */
    headers?: HttpHeaders, 
    /** The request body, in the case of a POST or PUT request */
    body?: InputStream | undefined);
}
export declare class HttpClientConnection extends BufferedEventEmitter {
    _axios: any;
    private axios_options;
    protected bootstrap: ClientBootstrap | undefined;
    protected socket_options?: SocketOptions;
    protected tls_options?: TlsConnectionOptions;
    protected proxy_options?: HttpProxyOptions;
    constructor(bootstrap: ClientBootstrap | undefined, host_name: string, port: number, socketOptions?: SocketOptions, tlsOptions?: TlsConnectionOptions, proxyOptions?: HttpProxyOptions);
    /** Emitted when the connection is connected and ready to start streams */
    on(event: 'connect', listener: () => void): this;
    /** Emitted when an error occurs on the connection */
    on(event: 'error', listener: (error: Error) => void): this;
    /** Emitted when the connection has completed */
    on(event: 'close', listener: () => void): this;
    /**
     * Make a client initiated request to this connection.
     * @param request - The HttpRequest to attempt on this connection
     * @returns A new stream that will deliver events for the request
     */
    request(request: HttpRequest): HttpClientStream;
    close(): void;
}
/**
 * Represents a single http message exchange (request/response) in HTTP.
 *
 * NOTE: Binding either the ready or response event will uncork any buffered events and start
 * event delivery
 */
export declare class HttpClientStream extends BufferedEventEmitter {
    readonly connection: HttpClientConnection;
    private response_status_code?;
    private encoder;
    private constructor();
    /**
     * HTTP status code returned from the server.
     * @return Either the status code, or undefined if the server response has not arrived yet.
     */
    status_code(): number | undefined;
    /**
     * Begin sending the request.
     *
     * The stream does nothing until this is called. Call activate() when you
     * are ready for its callbacks and events to fire.
     */
    activate(): void;
    /**
     * Emitted when the header block arrives from the server.
     */
    on(event: 'response', listener: (status_code: number, headers: HttpHeaders) => void): this;
    /**
     * Emitted when a body chunk arrives from the server
     * @param body_data - The chunk of body data
     */
    on(event: 'data', listener: (body_data: ArrayBuffer) => void): this;
    /**
     * Emitted when an error occurs
     * @param error - A CrtError containing the error that occurred
     */
    on(event: 'error', listener: (error: Error) => void): this;
    /** Emitted when stream has completed sucessfully. */
    on(event: 'end', listener: () => void): this;
    static _create(connection: HttpClientConnection): HttpClientStream;
    _on_response(response: any): void;
    _on_error(error: any): void;
}
/** Creates, manages, and vends connections to a given host/port endpoint */
export declare class HttpClientConnectionManager {
    readonly bootstrap: ClientBootstrap | undefined;
    readonly host: string;
    readonly port: number;
    readonly max_connections: number;
    readonly initial_window_size: number;
    readonly socket_options?: SocketOptions | undefined;
    readonly tls_opts?: TlsConnectionOptions | undefined;
    readonly proxy_options?: HttpProxyOptions | undefined;
    private pending_connections;
    private live_connections;
    private free_connections;
    private pending_requests;
    constructor(bootstrap: ClientBootstrap | undefined, host: string, port: number, max_connections: number, initial_window_size: number, socket_options?: SocketOptions | undefined, tls_opts?: TlsConnectionOptions | undefined, proxy_options?: HttpProxyOptions | undefined);
    private remove;
    private resolve;
    private reject;
    private pump;
    /**
     * Vends a connection from the pool
     * @returns A promise that results in an HttpClientConnection. When done with the connection, return
     *          it via {@link release}
     */
    acquire(): Promise<HttpClientConnection>;
    /**
     * Returns an unused connection to the pool
     * @param connection - The connection to return
    */
    release(connection: HttpClientConnection): void;
    /** Closes all connections and rejects all pending requests */
    close(): void;
}
