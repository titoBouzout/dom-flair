declare global {
  interface HTMLElement {
    /**
     * Similar to `class` for DOM Flair values.
     * @link https://github.com/titoBouzout/dom-flair#values-supported
     * @example
     * ```html
     * <div flair="col grow center"/>
     * ```
     */
    flair?: string
  }
}
export {}
