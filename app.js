'use strict';

const Path = require('path');
const Hapi = require('hapi');
const Hoek = require('hoek');

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

// Home Route
server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {

        return h.view('landing-page', {
            name: "Brad"
        });
    }
});





const start = async () => {


    await server.register(require('vision'));

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: 'views'
    });
};



const init = async () => {

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
start();