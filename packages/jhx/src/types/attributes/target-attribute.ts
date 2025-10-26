type TargetAttribute =
    | {
          inherit?: never;
          position?: 'closest' | 'next' | 'previous' | 'find';
          selector: string;
      }
    | {
          inherit?: never;
          position: 'this' | 'next' | 'previous';
          selector?: never;
      }
    | {
          inherit: boolean;
          position?: never;
          selector?: never;
      };

export type JhxTargetAttribute = Array<TargetAttribute | string> | TargetAttribute | string;
