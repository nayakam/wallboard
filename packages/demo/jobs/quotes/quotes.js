module.exports = {
    onRun: function(config, dependencies, jobCallback) {

        var logger = dependencies.logger;
        logger.info('quote.js - config : ' + config);
        logger.info('quote.js - Object.keys(config) : ' + Object.keys(config));
        Object.keys(config).forEach(function(key) {
            logger.info('quote.js - config key:' + key + ', Value:' + config[key]);
        });


        logger.info('quote.js -  key :' + "quotes" + ', config.hasOwnProperty : ' + config.hasOwnProperty("quotes"));

        var options = {
            url: config.messageAPIUrl,
            //  path: '/stats',
            method: 'GET'
        };

        dependencies.request(options, function(err, response, body) {
            logger.info('quote.js - response : ' + response);
            logger.info('quote.js - err : ' + err);
            logger.info('quote.js - body : ' + body);
            if (response != null) {
                logger.info('quote.js - Object.keys(response) : ' + Object.keys(response));

                logger.info('quote.js - response.toJSON : ' + response.toJSON);
                logger.info('quote.js - response.statusCode : ' + response.statusCode);
                logger.info('quote.js - response.headers : ' + response.headers);
                logger.info('quote.js - response.url : ' + response.url);
                logger.info('quote.js - response.method : ' + response.method);
                logger.info('quote.js - response.statusCode : ' + response.statusCode);
                logger.info('quote.js - response.statusMessage : ' + response.statusMessage);
                logger.info('quote.js - response.request : ' + response.request);
                logger.info('quote.js - response.req : ' + response.req);
                logger.info('quote.js - response.body : ' + response.body);
                // Object.keys(response).forEach(function(key) {
                //     logger.info('quote.js - response key:' + key + ', Value:' + response[key]);
                // });
            }

            // only supported in Firefox
            //        for each(var value in config) {
            //            logger.info('quote.js -  value :' + value);
            //        }
            var _ = dependencies.underscore;
            var quotes = _.first(_.shuffle(config.quotes), config.limit || 10);
            logger.info('quote.js - config.quotes : ' + quotes);
            logger.info('quote.js -  Object.keys(quotes) : ' +  Object.keys(quotes));
            if (quotes != null) {
                Object.keys(quotes).forEach(function(key) {
                    logger.info('quote.js - quotes key:' + key + ', Value:' + quotes[key]);
                });
            }
            jobCallback(null, {
                quotes: body,
                title: config.widgetTitle
            });
        });
    }
};
