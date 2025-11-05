const methods = ['get', 'post', 'put', 'patch', 'delete', 'route'] as const;

export const getRouteFromProps = (props: object): { method: string; route: string | null } => {
    for (const key of methods) {
        if (key in props) {
            const value = (props as Record<string, unknown>)[key as string];

            if (key === 'route') {
                return {
                    method: 'GET',
                    route: typeof value === 'string' ? value.trim() || null : null,
                };
            }

            return {
                method: key.toUpperCase(),
                route: typeof value === 'string' ? value.trim() || null : null,
            };
        }
    }

    return { method: 'GET', route: null };
};
