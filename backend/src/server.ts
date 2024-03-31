import { createServer } from 'http';
import 'dotenv/config';

import { initExpressApp } from './express-app';

(async () => {
    const app = await initExpressApp();
    const httpServer = createServer(app);
    const port = 4000;

    httpServer.on('error', (e) => {
        console.error(`Server error - ${e.message}`);
    });
    httpServer.listen({ port }, () =>
        console.log(
            `\n🚀      Server is now running on http://localhost:${port}`,
        ),
    );
})();
