if(process.env.NODE_ENV === undefined || process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'local') {
    const dotenv = require('dotenv');
    const path = __dirname + '/../../environmentVars/.user.env.example';
    dotenv.config({path});
    console.log('[ENV PATH] ', path);
}