module.exports = {
    jwtSecret: 'juice is awesome',
    mongo : {
        development: {
            connectionString: 'mongodb://be-hurt:juicenebula@ds015750.mlab.com:15750/recipe'
        },
        production: {
            connectionString: 'mongodb://be-hurt:juicenebula@ds015750.mlab.com:15750/recipe'
        }
    }
};