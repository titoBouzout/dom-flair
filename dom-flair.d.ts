import type {} from 'solid-js'
import type {} from 'pota'

declare module 'solid-js' {
  namespace JSX {
    // HTML
    interface IntrinsicAttributes {
      /**
       * Similar to `class` for DOM Flair values.
       *
       * ```html
       * <div flair="col grow center" />
       * ```
       *
       * @link https://github.com/titoBouzout/dom-flair#values-supported
       */
      flair?: string
    }
  }
}

declare module 'pota' {
  namespace JSX {
    // HTML
    interface ElementAttributes<Element> {
      /**
       * Similar to `class` for DOM Flair values.
       *
       * ```html
       * <div flair="col grow center" />
       * ```
       *
       * @link https://github.com/titoBouzout/dom-flair#values-supported
       */
      flair?: string
    }
  }
}
