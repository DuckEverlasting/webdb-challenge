const express = require('express');

const server = express();

const projectsRouter = require('./routers/projectsRouter.js');

const actionsRouter = require('./routers/actionsRouter.js');

const port = process.env.PORT || 4000;

server.use(express.json());

server.use('/api/projects', projectsRouter);

server.use('/api/actions', actionsRouter);

server.listen(port, () => console.log(`\nSUP IT'S YO BOY AT ${port}\n`))