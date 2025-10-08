export type JhxIndicatorAttribute =
    | {
          selector: string;
          /** Defaults to `false`. */
          closest?: boolean;
          /** Defaults to `false`. */
          inherit?: boolean;
      }
    | string;
