export type JhxParamsAttribute =
    | {
          include: string[];
          exclude?: never;
      }
    | {
          include?: never;
          exclude: string[];
      }
    | '*'
    | 'none'
    | (string & {});
