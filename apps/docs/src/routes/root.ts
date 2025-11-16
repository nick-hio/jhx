import type { FastifyPluginAsync } from 'fastify';
import type { AutoloadPluginOptions } from "@fastify/autoload";

const root: FastifyPluginAsync<AutoloadPluginOptions> = async (fastify, _opts) => {
    fastify.get('/', async function handler (_req, res) {
        res.type("text/html").send(`
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>jhx</title>
        
        <link rel="icon" type="image/x-icon" href="https://raw.githubusercontent.com/nick-hio/jhx/refs/heads/main/assets/jhx-logo-textless.svg">        
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==" crossorigin="anonymous" referrerpolicy="no-referrer" />        

        <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin="anonymous">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fustat:wght@200..800&display=swap" crossorigin="anonymous">
        
        <link rel="stylesheet" href="/public/css/styles.css">
        <script src="/public/js/basecoat.js" defer></script>
    </head>
    <body>
    </body>
</html>`);
    })
}

export default root;
