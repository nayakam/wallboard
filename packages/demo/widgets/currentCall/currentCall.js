widget = {
    //runs when we receive data from the job
    onData: function(el, data) {

        //The parameters our job passed through are in the data object
        //el is our widget element, so our actions should all be relative to that
        if (data.title) {
            $('h2', el).text(data.title);
        }

        var $content = $('.content-noOfCall', el);
        $content.empty();

        console.log("data:" + data);
        console.log("data.status:" + data.status);
        console.log("data.status.length :" + data.status.length);
        if (data.status.queue != null) {
            console.log("data.status.queue : " + data.status.queue);
        }
        var json = JSON.parse(data.status);
        console.log("json : " + json);

        if (json.queue != null) {
            console.log(" json.queue : " + json.queue);
            console.log(" json.queue.length : " + json.queue.length);
            if (json.queue.length > 0) {
                console.log(" json.queue[0].qname : " + json.queue[0].qname);
                console.log(" json.queue[0].callswaiting : " + json.queue[0].callswaiting);
                console.log(" json.queue[0].totalcalls : " + json.queue[0].totalcalls);
                console.log(" json.queue[0].callswaiting : " + json.queue[0].oldestwait);

                $('.content-noOfCall', el).html(json.queue[0].callswaiting + '\n' + ' Waiting');
                $('.content-duration', el).html(json.queue[0].oldestwait);
            } else {
                $('.content-noOfCall', el).html('Data N/A');
            }

        } else {
            console.log("json.queue is " + json.queue);
            $('.content-noOfCall', el).html('Data Error' + '\n' + ' Calls');
            $('.content-duration', el).html('Data Error');
        }
    }
};
