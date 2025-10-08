const matchFunctionString = (
    funcString: string,
): {
    fnType: 'normal' | 'arrow';
    fullMatch: string;
    paramStr: string;
    bodyStr: string;
} | null => {
    const normalFuncRegex =
        /^(?:async\s*)?function\*?\s*(?:[A-z0-9]+)?\s*\(((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*)\)\s*\{((?:[^}{]+|\{(?:[^}{]+|\{[^}{]*})*})*)}$/s;
    const normalFuncMatch = funcString.match(normalFuncRegex);

    if (normalFuncMatch && normalFuncMatch[2]) {
        return {
            fnType: 'normal',
            fullMatch: normalFuncMatch[0],
            paramStr: normalFuncMatch[1] ?? '',
            bodyStr: `{ ${normalFuncMatch[2].trim()} }`,
        };
    }

    const arrowFuncRegex =
        /^(?:async\s*)?(?:\(((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*)\)|([^\s=()]+))\s*=>\s*(.*)$/s;
    const arrowFuncMatch = funcString.match(arrowFuncRegex);

    if (arrowFuncMatch && arrowFuncMatch[3]) {
        const body = arrowFuncMatch[3].trim();

        return {
            fnType: 'arrow',
            fullMatch: arrowFuncMatch[0],
            paramStr: arrowFuncMatch[1] ?? '',
            bodyStr:
                body.startsWith('{') && (body.endsWith('}') || body.endsWith('};'))
                    ? body
                    : `{ return ${body} }`,
        };
    }

    return null;
};

const splitParams = (paramStr: string): string[] => {
    if (!paramStr) return [];

    const params: string[] = [];
    let parenCount = 0;
    let braceCount = 0;
    let bracketCount = 0;
    let lastSplit = 0;

    for (let i = 0; i < paramStr.length; i++) {
        const char = paramStr[i];
        if (char === '(') parenCount++;
        else if (char === ')') parenCount--;
        else if (char === '{') braceCount++;
        else if (char === '}') braceCount--;
        else if (char === '[') bracketCount++;
        else if (char === ']') bracketCount--;
        else if (char === ',' && parenCount === 0 && braceCount === 0 && bracketCount === 0) {
            params.push(paramStr.substring(lastSplit, i).trim());
            lastSplit = i + 1;
        }
    }

    params.push(paramStr.substring(lastSplit).trim());
    return params.filter(Boolean);
};

export const extractFunction = (
    func: (...args: any[]) => any,
): {
    params: string[];
    body: string;
} | null => {
    if (typeof func !== 'function' || typeof func?.toString !== 'function') {
        return null;
    }

    const funcString = func.toString();
    const funcMatch = matchFunctionString(funcString);

    if (!funcMatch) {
        return null;
    }

    return {
        params: splitParams(funcMatch.paramStr),
        body: funcMatch.bodyStr,
    };
};
