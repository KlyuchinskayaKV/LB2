const app = require('express')();
const path = require('path');
const task = require('./content/task');
const port = process.env.PORT || 8016;

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => res.status(500).sendFile(path.resolve(__dirname, 'content', '505.html')));
app.get('/login', (req, res) => res.set({ 'Content-Type': 'text/plain' }).send('Ключинская'));
app.get('/login/1', (req, res) => {
  res.writeHeader(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify('Ключинская'));
  res.end();
});
app.get('/login/2', (req, res) => res.set({ 'Content-Type': 'application/json; charset=UTF-8' }).send('"Ключинская"'));
app.get('/login/code1', (req, res) => res.sendFile(path.resolve(__dirname, 'content', 'login.html')));
app.get('/login/code2', (req, res) => res.set({ 'Content-Type': 'text/plain' }).sendFile(path.resolve(__dirname, 'content', 'login.html')));
app.get('/promise/:num', async (req, res) => res.send(await task(req.params.num)));
app.get('/promise', (req, res) => res.sendFile(path.resolve(__dirname, 'content', 'task.js')));
app.get('/fetch', (req, res) =>
  res.set({ 'Content-Type': 'text/html; charset=UTF-8' }).sendFile(path.resolve(__dirname, 'content', 'fetch.html'))
);

app.use((req, res, next) => res.status(404).sendFile(path.resolve(__dirname, 'content', '404.html')));

app.listen(port, () => console.log(`server running on\n\thttp://localhost:${port}`));
