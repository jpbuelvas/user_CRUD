import {App} from './app';


const port = process.env.PORT || 2980;


export function startApp() {
    const app = App();
    app.listen(port, () => {
        console.log('App started on port ' + port);
    });
}



