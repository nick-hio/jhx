import { eventAttributes } from './event-attributes';

/**
 * @see https://htmx.org/reference/#attributes
 * @see https://htmx.org/reference/#attributes-additional
 */
export const attribute = {
    /**
     * The `hx-get` attribute will cause an element to issue a `GET` to the specified URL and
     * swap the HTML into the DOM using a swap strategy.
     *
     * @see https://htmx.org/attributes/hx-get/
     * @see https://htmx.org/docs/#ajax
     * @see https://htmx.org/reference/#attributes
     */
    get: 'hx-get',

    /**
     * The `hx-post` attribute will cause an element to issue a `POST` to the specified URL and
     * swap the HTML into the DOM using a swap strategy.
     *
     * @see https://htmx.org/attributes/hx-post/
     * @see https://htmx.org/docs/#ajax
     * @see https://htmx.org/reference/#attributes
     */
    post: 'hx-post',

    /**
     * The `hx-put` attribute will cause an element to issue a `PUT` to the specified URL and
     * swap the HTML into the DOM using a swap strategy
     *
     * @see https://htmx.org/attributes/hx-put/
     * @see https://htmx.org/docs/#ajax
     * @see https://htmx.org/reference/#attributes
     */
    put: 'hx-put',

    /**
     * The `hx-delete` attribute will cause an element to issue a `DELETE` to the specified URL and
     * swap the HTML into the DOM using a swap strategy.
     *
     * @see https://htmx.org/attributes/hx-delete/
     * @see https://htmx.org/docs/#ajax
     * @see https://htmx.org/reference/#attributes
     */
    delete: 'hx-delete',

    /**
     * The `hx-patch` attribute will cause an element to issue a `PATCH` to the specified URL and swap
     * the HTML into the DOM using a swap strategy.
     *
     * @see https://htmx.org/attributes/hx-patch/
     * @see https://htmx.org/docs/#ajax
     * @see https://htmx.org/reference/#attributes
     */
    patch: 'hx-patch',

    /**
     * The `hx-push-url` attribute allows you to push a URL into the
     * browser [location history](https://developer.mozilla.org/en-US/docs/Web/API/History_API).
     * This creates a new history entry,
     * allowing navigation with the browser’s back and forward buttons.
     * htmx snapshots the current DOM and saves it into its history cache, and restores from this
     * cache on navigation.
     *
     * @see https://htmx.org/attributes/hx-push-url/
     * @see https://htmx.org/reference/#attributes
     */
    pushUrl: 'hx-push-url',

    /**
     * The `hx-select` attribute allows you to select the content you want swapped from a response.
     * The value of this attribute is a CSS query selector of the element or elements to select from the response.
     *
     * @see https://htmx.org/attributes/hx-select/
     * @see https://htmx.org/reference/#attributes
     */
    select: 'hx-select',

    /**
     * The `hx-select-oob` attribute allows you to select content from a response to be swapped in
     * via an out-of-band swap.
     *
     * The value of this attribute is comma separated list of elements to be swapped out of band.
     * This attribute is almost always paired with [`hx-select`](https://htmx.org/attributes/hx-select/).
     *
     * @see https://htmx.org/attributes/hx-select-oob/
     * @see https://htmx.org/reference/#attributes
     */
    selectOob: 'hx-select-oob',

    /**
     * The `hx-swap` attribute allows you to specify how the response will be swapped in relative to
     * the [`target`](https://htmx.org/attributes/hx-target/) of an AJAX request.
     * If you do not specify the option, the default is `htmx.config.defaultSwapStyle` (`innerHTML`).
     *
     * @see https://htmx.org/attributes/hx-swap/
     * @see https://htmx.org/reference/#attributes
     */
    swap: 'hx-swap',

    /**
     * The `hx-swap-oob` attribute allows you to specify that some content in a response should be
     * swapped into the DOM somewhere other than the target, that is “Out of Band”.
     * This allows you to piggyback updates to other element updates on a response.
     *
     * @see https://htmx.org/attributes/hx-swap-oob/
     * @see https://htmx.org/reference/#attributes
     */
    swapOob: 'hx-swap-oob',

    /**
     * The `hx-target` attribute allows you to target a different element for swapping than the one issuing the AJAX request.
     *
     * @see https://htmx.org/attributes/hx-target/
     * @see https://htmx.org/reference/#attributes
     */
    target: 'hx-target',

    /**
     * The `hx-trigger` attribute allows you to specify what triggers an AJAX request.
     *
     * @see https://htmx.org/attributes/hx-trigger/
     * @see https://htmx.org/reference/#attributes
     */
    trigger: 'hx-trigger',

    /**
     * The `hx-vals` attribute allows you to add to the parameters that will be submitted with an AJAX request.
     *
     * By default, the value of this attribute is a list of name-expression values in
     * [JSON (JavaScript Object Notation)](https://www.json.org/json-en.html) format.
     *
     * @see https://htmx.org/attributes/hx-vals/
     * @see https://htmx.org/reference/#attributes
     */
    vals: 'hx-vals',

    /**
     * The `hx-boost` attribute allows you to “boost” normal anchors and form tags to use AJAX instead.
     * This has the [nice fallback](https://en.wikipedia.org/wiki/Progressive_enhancement) that, if the
     * user does not have javascript enabled, the site will continue to work.
     *
     * @see https://htmx.org/attributes/hx-boost/
     * @see https://htmx.org/reference/#attributes
     */
    boost: 'hx-boost',

    /**
     * The `hx-confirm` attribute allows you to confirm an action before issuing a request.
     * This can be useful in cases where the action is destructive and you want to ensure that the user really wants to do it.
     *
     * @see https://htmx.org/attributes/hx-confirm/
     * @see https://htmx.org/reference/#attributes
     */
    confirm: 'hx-confirm',

    /**
     * The `hx-disable` attribute will disable htmx processing for a given element and all its children.
     * This can be useful as a backup for HTML escaping, when you include user generated content in your site,
     * and you want to prevent malicious scripting attacks.
     *
     * The value of the tag is ignored, and it cannot be reversed by any content beneath it.
     *
     * @see https://htmx.org/attributes/hx-disable/
     * @see https://htmx.org/reference/#attributes
     */
    disable: 'hx-disable',

    /**
     * The `hx-disabled-elt` attribute allows you to specify elements that will have the disabled attribute added to them for the duration of the request.
     *
     * @see https://htmx.org/attributes/hx-disabled-elt/
     * @see https://htmx.org/reference/#attributes
     */
    disabledElt: 'hx-disabled-elt',

    /**
     * The `hx-disinherit` attribute allows you to control this automatic attribute inheritance.
     * An example scenario is to allow you to place an `hx-boost` on the body element of a page, but
     * overriding that behavior in a specific part of the page to allow for more specific behaviors.
     *
     * The default behavior for htmx is to “inherit” many attributes automatically: that is,
     * an attribute such as [`hx-target`](https://htmx.org/attributes/hx-target/) may be placed on a
     * parent element, and all child elements will inherit that target.
     *
     * @see https://htmx.org/attributes/hx-disinherit/
     * @see https://htmx.org/reference/#attributes
     */
    disinherit: 'hx-disinherit',

    /**
     * The `hx-encoding` attribute allows you to switch the request encoding from the usual
     * `application/x-www-form-urlencoded` encoding to `multipart/form-data`, usually to
     * support file uploads in an ajax request.
     *
     * The value of this attribute should be `multipart/form-data`.
     *
     * @see https://htmx.org/attributes/hx-encoding/
     * @see https://htmx.org/reference/#attributes
     */
    encoding: 'hx-encoding',

    /**
     * The `hx-ext` attribute enables an htmx extension for an element and all its children.
     *
     * The value can be a single extension name or a comma-separated list of extensions to apply.
     *
     * The `hx-ext` tag may be placed on parent elements if you want a plugin to apply to an entire swath of the DOM, and on the `body` tag for it to apply to all htmx requests.
     *
     * @see https://htmx.org/attributes/hx-ext/
     * @see https://htmx.org/reference/#attributes
     */
    ext: 'hx-ext',

    /**
     * The `hx-headers` attribute allows you to add to the headers that will be submitted with an AJAX request.
     *
     * By default, the value of this attribute is a list of name-expression values in
     * [JSON (JavaScript Object Notation)](https://www.json.org/json-en.html) format.
     *
     * @see https://htmx.org/attributes/hx-headers/
     * @see https://htmx.org/reference/#attributes
     */
    headers: 'hx-headers',

    /**
     * Set the `hx-history` attribute to `false` on any element in the current document,
     * or any html fragment loaded into the current document by htmx, to prevent sensitive data being
     * saved to the localStorage cache when htmx takes a snapshot of the page state.
     *
     * History navigation will work as expected, but on restoration the URL will be requested from
     * the server instead of the history cache.
     *
     * @see https://htmx.org/attributes/hx-history/
     * @see https://htmx.org/reference/#attributes
     */
    history: 'hx-history',

    /**
     * The `hx-history-elt` attribute allows you to specify the element that will be used to snapshot
     * and restore page state during navigation. By default, the `body` tag is used. This is typically
     * good enough for most setups, but you may want to narrow it down to a child element.
     * Just make sure that the element is always visible in your application, or htmx will not be able
     * to restore history navigation properly.
     *
     * @see https://htmx.org/attributes/hx-history-elt/
     * @see https://htmx.org/reference/#attributes
     */
    historyElt: 'hx-history-elt',

    /**
     * The `hx-include` attribute allows you to include additional element values in an AJAX request.
     *
     * @see https://htmx.org/attributes/hx-include/
     * @see https://htmx.org/reference/#attributes
     */
    include: 'hx-include',

    /**
     * The `hx-indicator` attribute allows you to specify the element that will have the `htmx-request` class
     * added to it for the duration of the request. This can be used to show spinners or progress indicators
     * while the request is in flight.
     *
     * The value of this attribute is a CSS query selector of the element or elements to apply the class to,
     * or the keyword [`closest`](https://developer.mozilla.org/docs/Web/API/Element/closest), followed by a
     * CSS selector, which will find the closest ancestor element or itself, that matches the given
     * CSS selector (e.g. `closest tr`).
     *
     * @see https://htmx.org/attributes/hx-indicator/
     * @see https://htmx.org/reference/#attributes
     */
    indicator: 'hx-indicator',

    /**
     * The `hx-inherit` attribute allows you to control the inheritance of attributes manually.
     *
     * The default behavior for htmx is to “inherit” many attributes automatically: that is, an attribute
     * such as [`hx-target`](https://htmx.org/attributes/hx-target/) may be placed on a parent element, and
     * all child elements will inherit that target.
     * Some people do not like this feature and instead prefer to explicitly specify inheritance for attributes.
     *
     * To support this mode of development, htmx offers the `htmx.config.disableInheritance` setting, which can
     * be set to `true` to prevent inheritance from being the default behavior for any of the htmx attributes.
     *
     * @see https://htmx.org/attributes/hx-inherit/
     * @see https://htmx.org/reference/#attributes
     */
    inherit: 'hx-inherit',

    /**
     * The `hx-params` attribute allows you to filter the parameters that will be submitted with an AJAX request.
     *
     * @see https://htmx.org/attributes/hx-params/
     * @see https://htmx.org/reference/#attributes
     */
    params: 'hx-params',

    /**
     * The `hx-preserve` attribute allows you to keep an element unchanged during HTML replacement.
     * Elements with `hx-preserve` set are preserved by `id` when htmx updates any ancestor element.
     * You must set an unchanging `id` on elements for `hx-preserve` to work.
     * The response requires an element with the same `id`, but its type and other attributes are ignored.
     *
     * @see https://htmx.org/attributes/hx-preserve/
     * @see https://htmx.org/reference/#attributes
     */
    preserve: 'hx-preserve',

    /**
     * The `hx-prompt` attribute allows you to show a prompt before issuing a request.
     * The value of the prompt will be included in the request in the `HX-Prompt` header.
     *
     * @see https://htmx.org/attributes/hx-prompt/
     * @see https://htmx.org/reference/#attributes
     */
    prompt: 'hx-prompt',

    /**
     * The `hx-replace-url` attribute allows you to replace the current url of the browser
     * [location history](https://developer.mozilla.org/en-US/docs/Web/API/History_API).
     *
     * @see https://htmx.org/attributes/hx-replace-url/
     * @see https://htmx.org/reference/#attributes
     */
    replaceUrl: 'hx-replace-url',

    /**
     * The `hx-request` attribute allows you to configure various aspects of the request
     *
     * @see https://htmx.org/attributes/hx-request/
     * @see https://htmx.org/reference/#attributes
     */
    request: 'hx-request',

    /**
     * The `hx-sync` attribute allows you to synchronize AJAX requests between multiple elements.
     *
     * The `hx-sync` attribute consists of a CSS selector to indicate the element to synchronize on,
     * followed optionally by a colon and then by an optional syncing strategy.
     *
     * @see https://htmx.org/attributes/hx-sync/
     * @see https://htmx.org/reference/#attributes
     */
    sync: 'hx-sync',

    /**
     * The `hx-validate` attribute will cause an element to validate itself by way of the
     * [HTML5 Validation API](https://htmx.org/docs/#validation) before it submits a request.
     *
     * Only `<form>` elements validate data by default, but other elements do not.
     * Adding `hx-validate="true"` to `<input>`, `<textarea>`, or `<select>` enables validation before sending requests.
     *
     * @see https://htmx.org/attributes/hx-validate/
     * @see https://htmx.org/reference/#attributes
     */
    validate: 'hx-validate',

    /**
     * **NOTE: `hx-vars` has been deprecated in favor of [`hx-vals`](https://htmx.org/attributes/hx-vals/),
     * which is safer by default.**
     *
     * The `hx-vars` attribute allows you to dynamically add to the parameters that will be submitted
     * with an AJAX request.
     *
     * @see https://htmx.org/attributes/hx-vars/
     * @see https://htmx.org/reference/#attributes
     */
    vars: 'hx-vars',

    ...eventAttributes,
} as const;

/** @see https://htmx.org/reference/#attributes */
export type HtmxAttribute = (typeof attribute)[keyof typeof attribute];

/** @see https://htmx.org/reference/#attributes */
export type HtmxAttributeKey = keyof typeof attribute;
