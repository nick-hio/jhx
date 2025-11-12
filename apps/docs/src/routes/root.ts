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
        <title>Fastify on Vercel</title>
        
        <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin="anonymous">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fustat:wght@200..800&display=swap" crossorigin="anonymous">
        
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==" crossorigin="anonymous" referrerpolicy="no-referrer" />        
        
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            body {
                font-family: "Fustat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                color: #fff;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #212121;
                background: radial-gradient(circle,rgba(33, 33, 33, 1) 0%, rgba(18, 18, 18, 1) 30em);
            }
            .container {
                text-align: center;
                max-width: 600px;
                padding: 2rem;
            }
            .logo {
                height: 100px;
                border-radius: 12px;
                margin: 0 auto 2rem;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                font-size: 1.5rem;
            }
            h1 {
                font-size: 3rem;
                font-weight: 700;
                margin-bottom: 1rem;
                color: white;
            }
            .text-group {
                margin-bottom: 2rem;
            }
            .text-group p {
                font-size: 1.125rem;
                color: #999;
                line-height: 1.6;
            }
            .text-group p.text-special {
                font-size: 1.125rem;
                font-weight: bold;
                color: #fff;
                line-height: 1.6;
            }
            .link {
              display: inline-block;
              border-radius: 10px;
              border: 1px solid rgba(255, 255, 255, 0.12);
              background: rgba(255, 255, 255, 0.04);
              transition: background 0.2s ease, border-color 0.2s ease, transform 0.05s ease;
            }
            .link a {
              display: inline-flex;
              padding: 0.625rem 0.875rem;
              color: #fff;
              font-weight: 500;
              text-decoration: none;
              letter-spacing: 0.01em;
              gap: 0.25rem;
            }
            .link i {
              line-height: 1.35rem;
            }
            .link:hover {
              background: rgba(255, 255, 255, 0.07);
              border-color: rgba(255, 255, 255, 0.18);
            }
            .link:active {
              transform: translateY(0.5px);
            }
            .link a:focus-visible {
              outline: 2px solid #7dd3fc;
              outline-offset: 3px;
              border-radius: 8px;
            }
            code {
              font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
              font-size: 0.95rem;
              font-weight: bold;
              line-height: 1.35;
              color: #e6edf3;
              display: inline-block;
              padding: 0.125rem 0.375rem;
              margin: 0 0.15rem;
              border-radius: 8px;
              border: 1px solid rgba(255, 255, 255, 0.12);
              background: rgba(255, 255, 255, 0.04);
              overflow-wrap: anywhere;
            }
            code:focus-visible {
              outline: 2px solid #7dd3fc;
              outline-offset: 2px;
              border-radius: 6px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <img src="https://raw.githubusercontent.com/nick-hio/jhx/refs/heads/main/assets/jhx-logo-light.svg" alt="jhx logo" class="logo" />
            
            <div class="text-group">
                <p>HTMX helper with type-safe attribute mapping.</p>
                <!-- TODO: Create a styled '<code>' class -->
                <p>Converts props into <code>hx-*</code> attributes for templating.</p>
            </div>
            
            <div class="text-group">
                <p class="text-special">🚧 Under Construction! 🚧</p>
                <p>The documentation site will be launching soon. Stay tuned!</p>
            </div>
            
            <div class="link">
                <a href="https://vercel.com/docs/frameworks/backend/fastify" target="_blank" rel="noreferrer">
                    <i class="fa-brands fa-github"></i> GitHub
                </a>
            </div>
        </div>
    </body>
</html>`);
    })
}

export default root;
