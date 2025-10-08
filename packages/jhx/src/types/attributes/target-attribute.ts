export type JhxTargetAttribute =
    | {
          selector: string;
          op?: 'closest' | 'next' | 'previous' | 'find';
      }
    | {
          selector?: never;
          op: 'this' | 'next' | 'previous';
      }
    | string;
