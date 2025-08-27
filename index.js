const app = require('./src/app');

app.listen(app.get('port'), '0.0.0.0', () => {
    console.log("Server lintening on port ", app.get('port'));
})
