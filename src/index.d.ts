declare namespace React {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: import("react").CSSProperties;
  }
}
