const express = require('express');

const server = express();

const projectsRouter = require('./routers/projectsRouter.js');

const actionsRouter = require('./routers/actionsRouter.js');

const contextsRouter = require('./routers/contextsRouter.js');

const port = process.env.PORT || 4000;

server.use(express.json());

server.use('/api/projects', projectsRouter);

server.use('/api/actions', actionsRouter);

server.use('/api/contexts', contextsRouter);

server.listen(port, () => console.log(`\nSUP IT'S YA BOY AT ${port}\n`))