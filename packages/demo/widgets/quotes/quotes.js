widget = {

    onData: function(el, data) {
        if (data.title) {
            $('h2', el).text(data.title);
        }

        var $content = $('.content', el);
        $content.empty();

        console.log("data:" + data);
        console.log("data.quotes" + data.quotes);
        console.log("data.quotes.length:" + data.quotes.length);
        var json = JSON.parse(data.quotes);
        console.log("json : " + json);
        console.log("json.length : " + json.length);
        console.log(" json.quotes : " + json.quotes);
        console.log(" json.quotes.length : " + json.quotes.length);
        console.log('quote.js - Object.keys(json) : ' + Object.keys(json));
        if (json.quotes != null) {
            console.log(" json.quotes[0].author : " + json.quotes[0].author);
            console.log(" json.quotes[0].quote : " + json.quotes[0].quote);
            $content.append(
                "<blockquote>" + json.quotes[0].quote + "<cite>" + json.quotes[0].author + "</cite></blockquote>"
            );
        } else {
            $content.append(
                "<blockquote>NO QUOTES FOUND<blockquote>"
            );
        }

        // if (data.quotes.length > 0) {
        //     // data.quotes.forEach(function (quote) {
        //     //   $content.append(
        //     //       "<blockquote>" + quote.quote + "<cite>" + quote.author + "</cite></blockquote>"
        //     //   );
        //     // });
        //
        // } else {
        //     $content.append(
        //         "<blockquote>NO QUOTES FOUND<blockquote>"
        //     );
        // }
    }
};
