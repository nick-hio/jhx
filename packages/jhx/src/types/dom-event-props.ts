import type { DomObjects } from './dom-objects.ts';
import type { HtmxEventProps } from './htmx-event-props';

/**
 * Properties for handling standard DOM events.
 *
 * Note: The `stringify` config property must be set to `true` since in-line
 * DOM event handlers are stripped during rendering.
 */
interface CommonDomEventProps<TDom extends object = object> {
    /* DOM Mouse event (only available when the config `stringify` property is set to `true`). */
    onClick?: (args: { event: MouseEvent } & DomObjects & TDom) => void;
    /* DOM Mouse event (only available when the config `stringify` property is set to `true`). */
    onDoubleClick?: (args: { event: MouseEvent } & DomObjects & TDom) => void;
    /* DOM Mouse event (only available when the config `stringify` property is set to `true`). */
    onContextMenu?: (args: { event: MouseEvent } & DomObjects & TDom) => void;
    /* DOM Mouse event (only available when the config `stringify` property is set to `true`). */
    onMouseDown?: (args: { event: MouseEvent } & DomObjects & TDom) => void;
    /* DOM Mouse event (only available when the config `stringify` property is set to `true`). */
    onMouseUp?: (args: { event: MouseEvent } & DomObjects & TDom) => void;
    /* DOM Mouse event (only available when the config `stringify` property is set to `true`). */
    onMouseMove?: (args: { event: MouseEvent } & DomObjects & TDom) => void;
    /* DOM Mouse event (only available when the config `stringify` property is set to `true`). */
    onMouseEnter?: (args: { event: MouseEvent } & DomObjects & TDom) => void;
    /* DOM Mouse event (only available when the config `stringify` property is set to `true`). */
    onMouseLeave?: (args: { event: MouseEvent } & DomObjects & TDom) => void;
    /* DOM Mouse event (only available when the config `stringify` property is set to `true`). */
    onMouseOver?: (args: { event: MouseEvent } & DomObjects & TDom) => void;
    /* DOM Mouse event (only available when the config `stringify` property is set to `true`). */
    onMouseOut?: (args: { event: MouseEvent } & DomObjects & TDom) => void;
    /* DOM Mouse event (only available when the config `stringify` property is set to `true`). */
    onAuxClick?: (args: { event: MouseEvent } & DomObjects & TDom) => void;
    /* DOM Mouse event (only available when the config `stringify` property is set to `true`). */
    onWheel?: (args: { event: WheelEvent } & DomObjects & TDom) => void;

    /* DOM Keyboard event (only available when the config `stringify` property is set to `true`). */
    onKeyDown?: (args: { event: KeyboardEvent } & DomObjects & TDom) => void;
    /* DOM Keyboard event (only available when the config `stringify` property is set to `true`). */
    onKeyPress?: (args: { event: KeyboardEvent } & DomObjects & TDom) => void;
    /* DOM Keyboard event (only available when the config `stringify` property is set to `true`). */
    onKeyUp?: (args: { event: KeyboardEvent } & DomObjects & TDom) => void;

    /* DOM Focus event (only available when the config `stringify` property is set to `true`). */
    onFocus?: (args: { event: FocusEvent } & DomObjects & TDom) => void;
    /* DOM Focus event (only available when the config `stringify` property is set to `true`). */
    onBlur?: (args: { event: FocusEvent } & DomObjects & TDom) => void;
    /* DOM Focus event (only available when the config `stringify` property is set to `true`). */
    onFocusIn?: (args: { event: FocusEvent } & DomObjects & TDom) => void;
    /* DOM Focus event (only available when the config `stringify` property is set to `true`). */
    onFocusOut?: (args: { event: FocusEvent } & DomObjects & TDom) => void;

    /* DOM Form event (only available when the config `stringify` property is set to `true`). */
    onChange?: (args: { event: Event } & DomObjects & TDom) => void;
    /* DOM Form event (only available when the config `stringify` property is set to `true`). */
    onInput?: (args: { event: InputEvent } & DomObjects & TDom) => void;
    /* DOM Form event (only available when the config `stringify` property is set to `true`). */
    onBeforeInput?: (args: { event: InputEvent } & DomObjects & TDom) => void;
    /* DOM Form event (only available when the config `stringify` property is set to `true`). */
    onSubmit?: (args: { event: SubmitEvent } & DomObjects & TDom) => void;
    /* DOM Form event (only available when the config `stringify` property is set to `true`). */
    onReset?: (args: { event: Event } & DomObjects & TDom) => void;
    /* DOM Form event (only available when the config `stringify` property is set to `true`). */
    onInvalid?: (args: { event: Event } & DomObjects & TDom) => void;
    /* DOM Form event (only available when the config `stringify` property is set to `true`). */
    onSelect?: (args: { event: Event } & DomObjects & TDom) => void;

    /* DOM Drag event (only available when the config `stringify` property is set to `true`). */
    onDrag?: (args: { event: DragEvent } & DomObjects & TDom) => void;
    /* DOM Drag event (only available when the config `stringify` property is set to `true`). */
    onDragStart?: (args: { event: DragEvent } & DomObjects & TDom) => void;
    /* DOM Drag event (only available when the config `stringify` property is set to `true`). */
    onDragEnd?: (args: { event: DragEvent } & DomObjects & TDom) => void;
    /* DOM Drag event (only available when the config `stringify` property is set to `true`). */
    onDragOver?: (args: { event: DragEvent } & DomObjects & TDom) => void;
    /* DOM Drag event (only available when the config `stringify` property is set to `true`). */
    onDragEnter?: (args: { event: DragEvent } & DomObjects & TDom) => void;
    /* DOM Drag event (only available when the config `stringify` property is set to `true`). */
    onDragLeave?: (args: { event: DragEvent } & DomObjects & TDom) => void;
    /* DOM Drag event (only available when the config `stringify` property is set to `true`). */
    onDrop?: (args: { event: DragEvent } & DomObjects & TDom) => void;

    /* DOM Touch event (only available when the config `stringify` property is set to `true`). */
    onTouchStart?: (args: { event: TouchEvent } & DomObjects & TDom) => void;
    /* DOM Touch event (only available when the config `stringify` property is set to `true`). */
    onTouchMove?: (args: { event: TouchEvent } & DomObjects & TDom) => void;
    /* DOM Touch event (only available when the config `stringify` property is set to `true`). */
    onTouchEnd?: (args: { event: TouchEvent } & DomObjects & TDom) => void;
    /* DOM Touch event (only available when the config `stringify` property is set to `true`). */
    onTouchCancel?: (args: { event: TouchEvent } & DomObjects & TDom) => void;

    /* DOM Pointer event (only available when the config `stringify` property is set to `true`). */
    onPointerDown?: (args: { event: PointerEvent } & DomObjects & TDom) => void;
    /* DOM Pointer event (only available when the config `stringify` property is set to `true`). */
    onPointerMove?: (args: { event: PointerEvent } & DomObjects & TDom) => void;
    /* DOM Pointer event (only available when the config `stringify` property is set to `true`). */
    onPointerUp?: (args: { event: PointerEvent } & DomObjects & TDom) => void;
    /* DOM Pointer event (only available when the config `stringify` property is set to `true`). */
    onPointerCancel?: (args: { event: PointerEvent } & DomObjects & TDom) => void;
    /* DOM Pointer event (only available when the config `stringify` property is set to `true`). */
    onPointerEnter?: (args: { event: PointerEvent } & DomObjects & TDom) => void;
    /* DOM Pointer event (only available when the config `stringify` property is set to `true`). */
    onPointerLeave?: (args: { event: PointerEvent } & DomObjects & TDom) => void;
    /* DOM Pointer event (only available when the config `stringify` property is set to `true`). */
    onPointerOver?: (args: { event: PointerEvent } & DomObjects & TDom) => void;
    /* DOM Pointer event (only available when the config `stringify` property is set to `true`). */
    onPointerOut?: (args: { event: PointerEvent } & DomObjects & TDom) => void;
    /* DOM Pointer event (only available when the config `stringify` property is set to `true`). */
    onGotPointerCapture?: (args: { event: PointerEvent } & DomObjects & TDom) => void;
    /* DOM Pointer event (only available when the config `stringify` property is set to `true`). */
    onLostPointerCapture?: (args: { event: PointerEvent } & DomObjects & TDom) => void;

    /* DOM Clipboard event (only available when the config `stringify` property is set to `true`). */
    onCopy?: (args: { event: ClipboardEvent } & DomObjects & TDom) => void;
    /* DOM Clipboard event (only available when the config `stringify` property is set to `true`). */
    onCut?: (args: { event: ClipboardEvent } & DomObjects & TDom) => void;
    /* DOM Clipboard event (only available when the config `stringify` property is set to `true`). */
    onPaste?: (args: { event: ClipboardEvent } & DomObjects & TDom) => void;

    /* DOM Composition event (only available when the config `stringify` property is set to `true`). */
    onCompositionStart?: (args: { event: CompositionEvent } & DomObjects & TDom) => void;
    /* DOM Composition event (only available when the config `stringify` property is set to `true`). */
    onCompositionUpdate?: (args: { event: CompositionEvent } & DomObjects & TDom) => void;
    /* DOM Composition event (only available when the config `stringify` property is set to `true`). */
    onCompositionEnd?: (args: { event: CompositionEvent } & DomObjects & TDom) => void;

    /* DOM Animation event (only available when the config `stringify` property is set to `true`). */
    onAnimationStart?: (args: { event: AnimationEvent } & DomObjects & TDom) => void;
    /* DOM Animation event (only available when the config `stringify` property is set to `true`). */
    onAnimationIteration?: (args: { event: AnimationEvent } & DomObjects & TDom) => void;
    /* DOM Animation event (only available when the config `stringify` property is set to `true`). */
    onAnimationEnd?: (args: { event: AnimationEvent } & DomObjects & TDom) => void;
    /* DOM Animation event (only available when the config `stringify` property is set to `true`). */
    onAnimationCancel?: (args: { event: AnimationEvent } & DomObjects & TDom) => void;

    /* DOM Transition event (only available when the config `stringify` property is set to `true`). */
    onTransitionStart?: (args: { event: TransitionEvent } & DomObjects & TDom) => void;
    /* DOM Transition event (only available when the config `stringify` property is set to `true`). */
    onTransitionEnd?: (args: { event: TransitionEvent } & DomObjects & TDom) => void;
    /* DOM Transition event (only available when the config `stringify` property is set to `true`). */
    onTransitionRun?: (args: { event: TransitionEvent } & DomObjects & TDom) => void;
    /* DOM Transition event (only available when the config `stringify` property is set to `true`). */
    onTransitionCancel?: (args: { event: TransitionEvent } & DomObjects & TDom) => void;

    /* DOM UI event (only available when the config `stringify` property is set to `true`). */
    onScroll?: (args: { event: Event } & DomObjects & TDom) => void;
    /* DOM UI event (only available when the config `stringify` property is set to `true`). */
    onResize?: (args: { event: UIEvent } & DomObjects & TDom) => void;

    /* DOM Toggle event (only available when the config `stringify` property is set to `true`). */
    onToggle?: (args: { event: Event } & DomObjects & TDom) => void;
}

interface CustomDomEventProps<TDom extends object = object> {
    /* DOM event (only available when the config `stringify` property is set to `true`). */
    [key: Exclude<`on${string}`, keyof CommonDomEventProps | keyof HtmxEventProps>]: <TEvent = Event>(
        args: { event: TEvent } & DomObjects & TDom,
    ) => void;
}

export type DomEventProps<TDom extends object = object> = CommonDomEventProps<TDom>
    & CustomDomEventProps<TDom>;
