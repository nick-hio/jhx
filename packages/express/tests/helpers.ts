import { expect } from 'bun:test';
import type { Server } from 'http';
import express from 'express';
import type { Express } from 'express';
import { createJhx } from '../src';
import type { CreateJhxConfig } from '../src';

export const buildServer = async (
    serverList: Array<Server>,
    port: number,
    jhxConfig: CreateJhxConfig = {},
): Promise<{ app: Express; jhx: ReturnType<typeof createJhx>['jhx']; }> => {
    const app = express();
    const { jhx } = createJhx(app, {
        logger: console,
        ...jhxConfig,
    });

    const server = app.listen(port, (e) => {
        if (e) {
            console.error('EXPRESS ERROR');
            console.error(JSON.stringify(e, null, 2));
            throw e;
        }
    });
    serverList.push(server);

    return { app, jhx };
};

export const closeServers = async (
    servers: Server[],
) => {
    await Promise.all(
        servers.map((s) => {
            s.close((err) => {
                if (err) {
                    console.error('SERVER CLOSE ERROR');
                    console.error(JSON.stringify(err, null, 2));
                }
            });
        }),
    );
};

export const expectResponse = async (
    res: Response,
    expectedBody: string | object,
    contentType: string,
    status = 200
) => {
    if (typeof expectedBody === 'object') {
        expect(await res.json() as object).toEqual(expectedBody);
    } else {
        expect(await res.text()).toBe(expectedBody);
    }
    expect(res.headers.get('Content-Type')).toContain(contentType);
    expect(res.status).toBe(status);
}

export class PortGenerator {
    private currentPort: number;

    constructor(startPort: number) {
        this.currentPort = startPort;
    }

    public getPort(): number {
        return this.currentPort++;
    }
}
