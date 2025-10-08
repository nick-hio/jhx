import { createHash } from 'crypto';

import { JhxServerException } from '../lib/jhx-server-error';

export const hashFunction = (func: (...args: any[]) => any) => {
    if (typeof func?.toString !== 'function') {
        throw new JhxServerException("jhx: invalid route error", {
            type: 'hash:invalid',
            info: "Cannot hash function without a 'toString' method",
        });
    }

    return createHash('sha1').update(func.toString()).digest('hex').slice(0, 10);
};
