import type {} from 'solid-js'

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

import type {} from 'pota/jsx-runtime'

declare module 'pota/jsx-runtime' {
  namespace JSX {
    // HTML
    interface IntrinsicHTMLAttributes {
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

    // SVG
    interface IntrinsicSVGAttributes {
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

    // MathML
    interface IntrinsicMathMLAttributes {
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
