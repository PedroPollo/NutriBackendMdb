const app = require('./src/app');

app.listen(app.get('port'), () => {
    console.log("Server lintening on port ", app.get('port'));
})