/*
 * ===================================================
 * ===================================================
 * ===================================================
 * ===================================================
 * ======             CONFIGURATION          =========
 * ===================================================
 * ===================================================
 * ===================================================
 * ===================================================
 */

const pg = require('pg');
const url = require('url');

var configs;

if( process.env.DATABASE_URL ){

    const params = url.parse(process.env.DATABASE_URL);
    const auth = params.auth.split(':');

    configs = {
        user: auth[0],
        password: auth[1],
        host: params.hostname,
        port: params.port,
        database: params.pathname.split('/')[1],
        ssl: true
    };

}else{
    configs = {
        user: 'kevin',
        host: '127.0.0.1',
        database: 'tweedr',
        port: 5432
    };
};


const pool = new pg.Pool(configs);

pool.on('error', function (err) {
    console.log('idle client error', err.message, err.stack);
});

/*
 * ===================================================
 * ===================================================
 * ===================================================
 * ===================================================
 * ======        REQUIRE MODEL FILES         =========
 * ===================================================
 * ===================================================
 * ===================================================
 * ===================================================
 */

const allUsersModelsFunction = require('./models/users');

const usersModelsObject = allUsersModelsFunction(pool);

const allTweetsModelsFunction = require('./models/tweets');

const tweetsModelsObject = allTweetsModelsFunction(pool);

const allFollowsModelsFunction = require('./models/follows');

const followsModelsObject = allFollowsModelsFunction(pool);

// payments

const allPaymentsModelsFunction = require('./models/payments');

const paymentsModelsObject = allPaymentsModelsFunction(pool);

/*
 * ===================================================
 * ===================================================
 * ===================================================
 * ===================================================
 * ======          MODULE EXPORTS            =========
 * ===================================================
 * ===================================================
 * ===================================================
 * ===================================================
 */


module.exports = {
  //make queries directly from here
    queryInterface: (text, params, callback) => {
        return pool.query(text, params, callback);
    },

  // get a reference to end the connection pool at server end
    pool:pool,

  /*
   * ADD APP MODELS HERE
   */

// users
    users: usersModelsObject,
// tweets
    tweets: tweetsModelsObject,
// follows
    follows: followsModelsObject,
// payments
    payments: paymentsModelsObject
};