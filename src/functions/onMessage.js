const { app } = require('@azure/functions');
const botHandler = require('../');

app.http('onMessage', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    const data = await request.text();
    const update = JSON.parse(data);
    return await botHandler(update);
  }
});
