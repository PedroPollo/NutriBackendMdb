const app = require('./src/app');

const PORT = 3002; // o el puerto que desees usar
const HOST = '148.204.142.3'; // tu IP pública

app.listen(PORT, HOST, () => {
    console.log("Server lintening on port ", app.get('port'));
})