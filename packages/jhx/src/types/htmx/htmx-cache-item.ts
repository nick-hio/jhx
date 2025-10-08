export interface HtmxCacheItem {
    /**
     * The request URL used as the cache key.
     */
    url: string;

    /**
     * The cached HTML content or response text associated with the URL.
     */
    content: string;
}
