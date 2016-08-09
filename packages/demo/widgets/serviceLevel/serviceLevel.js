widget = {
    //runs when we receive data from the job
    onData: function(el, data) {

        //The parameters our job passed through are in the data object
        //el is our widget element, so our actions should all be relative to that
        if (data.title) {
            $('h2', el).text(data.title);
        }

        var $content = $('.content-serviceLevel', el);
        $content.empty();

        var json = JSON.parse(data.status);
        console.log("json : " + json);

        if (json.queue != null) {
            console.log(" json.queue : " + json.queue);
            console.log(" json.queue.length : " + json.queue.length);
            if (json.queue.length > 0) {
                console.log(" json.queue[0].qname : " + json.queue[0].qname);
                console.log(" json.queue[0].totalcalls : " + json.queue[0].totalcalls);
                if (json.queue[0].totalcalls > 0) {
                  $('.content-serviceLevel', el).html(((json.queue[0].callshandled + json.queue[0].dequeuedcalls) / json.queue[0].totalcalls) * 100 + '%');                  
                } else {
                    $('.content-serviceLevel', el).html('82%');
                }
            } else {
                $('.content-serviceLevel', el).html('Data N/A');
            }
        } else {
            console.log("json.queue is " + json.queue);
            $('.content-serviceLevel', el).html('Data Error' + '\n' + ' Calls');
        }
    }
};
