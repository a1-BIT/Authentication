const app = require('./app')
const { port } = require('./config/env')

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

process.on('unhandledRejection', (err) => {
    console.error('Unhandled rejection:', err);
    process.exit(1);
});