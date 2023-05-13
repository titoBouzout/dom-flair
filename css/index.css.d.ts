// for a regular HTMLElement

interface HTMLElement {
  /**
   * Similar to `class` for DOM Flair values.
   * @link https://github.com/titoBouzout/dom-flair#values-supported
   * @example
   * ```html
   * <div flair="col grow center">
   * ```
   */
  flair?: string
}

// for solid-js

import 'solid-js'

declare module 'solid-js' {
  namespace JSX {
    interface HTMLAttributes<T> {
      /**
       * Similar to `class` for DOM Flair values.
       * @link https://github.com/titoBouzout/dom-flair#values-supported
       * @example
       * ```html
       * <div flair="col grow center">
       * ```
       */
      flair?: string
    }
  }
}

/*
import 'solid-js'

declare module 'solid-js' {
  namespace JSX {
    interface HTMLAttributes<T> {
      flair?: boolean | number | string
    }
  }
}

declaring a new component

import type { ComponentProps } from "solid-js"

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "component-name": ComponentProps<"div"> & { foo: number }
    }
  }
}

*/
