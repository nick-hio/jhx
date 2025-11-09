import type { FastifyInstance, FastifyServerOptions, HookHandlerDoneFunction } from "fastify";
import { jhx } from "jhx";

export const routes = (fastify: FastifyInstance, _opts: FastifyServerOptions, done: HookHandlerDoneFunction) => {
    fastify.get('/escaped', async (_req, res) => {
      const html = `<!DOCTYPE html>
<html lang="en">
    <body>
        <button ${jhx({
            // onOtherEvent: () => alert("Clicked!"),
            onClick: ({ document }) => {
                console.log(document);
            },
        }, { stringify: true })}>
            Load
        </button>
    </body>
</html>`;

        return res.type('text/html').send(html);
    });

  fastify.get('/unescaped', async (_req, res) => {
    const html = `<!DOCTYPE html>
<html lang="en">
    <body>
        <button ${jhx({
            onOtherEvent: () => alert("Clicked!"),
            onClick: ({ document }) => {
                console.log(document);
            },
        }, { stringify: true, escape: false })}>
            Load
        </button>
    </body>
</html>`;

    return res.type('text/html').send(html);
  });

    done()
};
