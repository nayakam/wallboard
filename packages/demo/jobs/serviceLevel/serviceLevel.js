/**
 * Job: serviceLevel
 *
 * Expected configuration:
 *
 * ## PLEASE ADD AN EXAMPLE CONFIGURATION FOR YOUR JOB HERE
 * {
 *   myconfigKey : [
 *     { serverUrl : 'localhost' }
 *   ]
 * }
 */

module.exports = {

    /**
     * Executed on job initialisation (only once)
     * @param config
     * @param dependencies
     */
    onInit: function(config, dependencies) {

        /*
        This is a good place for initialisation logic, like registering routes in express:

        dependencies.logger.info('adding routes...');
        dependencies.app.route("/jobs/mycustomroute")
            .get(function (req, res) {
              res.end('So something useful here');
            });
        */
    },

    /**
     * Executed every interval
     * @param config
     * @param dependencies
     * @param jobCallback
     */
    onRun: function(config, dependencies, jobCallback) {

        /*
         1. USE OF JOB DEPENDENCIES

         You can use a few handy dependencies in your job:

         - dependencies.easyRequest : a wrapper on top of the "request" module
         - dependencies.request : the popular http request module itself
         - dependencies.logger : atlasboard logger interface

         Check them all out: https://bitbucket.org/atlassian/atlasboard/raw/master/lib/job-dependencies/?at=master

         */

        var logger = dependencies.logger;

        /*

         2. CONFIGURATION CHECK

         You probably want to check that the right configuration has been passed to the job.
         It is a good idea to cover this with unit tests as well (see test/serviceLevel file)

         Checking for the right configuration could be something like this:

         if (!config.myrequiredConfig) {
         return jobCallback('missing configuration properties!');
         }


         3. SENDING DATA BACK TO THE WIDGET

         You can send data back to the widget anytime (ex: if you are hooked into a real-time data stream and
         don't want to depend on the jobCallback triggered by the scheduler to push data to widgets)

         jobWorker.pushUpdate({data: { title: config.widgetTitle, html: 'loading...' }}); // on Atlasboard > 1.0


         4. USE OF JOB_CALLBACK

         Using nodejs callback standard conventions, you should return an error or null (if success)
         as the first parameter, and the widget's data as the second parameter.

         This is an example of how to make an HTTP call to google using the easyRequest dependency,
         and send the result to the registered widgets.
         Have a look at test/serviceLevel for an example of how to unit tests this easily by mocking easyRequest calls

         */

        status = {
            "queue": [{
                "abandonedcalls": -1,
                "callswaiting": -1,
                "dequeuedcalls": -1,
                "id": 2,
                "oldestwait": "0:00:00",
                "qname": "Main_CSQ",
                "totalcalls": -1
            }]
        };

        var options = {
            url: config.restAPIUrl,
            //  path: '/stats',
            method: 'GET'
        };

        dependencies.request(options, function(err, response, body) {
            logger.info('response.statusCode : ' + response.statusCode);
            logger.info('response.statusMessage : ' + response.statusMessage);
            //  logger.warn('response.body : ' + response.body  );

            //  logger.info('body : ' + body.replace(/(\r\n|\n|\r)/gm,""));
            //  logger.info('body : ' + body.replace(/\n/g,""));
            //  logger.info('body : ' + body.replace(/\n/g,"").replace(/\s/g,""));
            if (response.statusCode === 200) {
                logger.info('body : ' + body);
                jobCallback(null, {
                    status: body,
                    title: config.widgetTitle
                });
            } else {
                logger.warn('body : ' + body);
                logger.info('Dummy JSON Object status : ' + JSON.stringify(status));
                jobCallback(null, {
                    status: JSON.stringify(status),
                    title: config.widgetTitle
                });
            }
        });
    }
};
