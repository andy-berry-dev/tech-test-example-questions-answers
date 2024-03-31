import { createServer } from 'http';
import 'dotenv/config';

import { initExpressApp } from './express-app';

(async () => {
    const app = await initExpressApp();
    const httpServer = createServer(app);
    const port = parseInt(process.env.PORT || '4000', 10);

    httpServer.on('error', (e) => {
        console.error(`Server error - ${e.message}`);
    });
    httpServer.listen({ port }, () =>
        console.log(
            `\n🚀      Server is now running on http://localhost:${port}`,
        ),
    );
})();
