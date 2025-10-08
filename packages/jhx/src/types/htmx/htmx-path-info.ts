export interface HtmxPathInfo {
    /**
     * The original request path specified for the HTMX request.
     */
    requestPath: string;

    /**
     * The final request path after any server-side redirections or URL rewrites.
     */
    finalRequestPath: string;

    /**
     * The path extracted from the server response, or `null` if none was provided.
     */
    responsePath: string | null;

    /**
     * The URL fragment (anchor) associated with the request.
     */
    anchor: string;
}
