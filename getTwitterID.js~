var retry = 3;
gettwitterid(last_note_ts, max_position);

function gettwitterid(lastNoteTS, maxPosition) {
    if (retry === 0)
        return;

    var currURL = query + lastNoteTS + '&' + maxPosition + '&' + lpara;
    tools.get(currURL, null, (err, data) => {
        if (err) throw err;
        var json = JSON.parse(data);
        if (json.new_latent_count < 1)
            return;
        var twitterIDArray = new Array();
        var $ = cheerio.load(json.items_html, { decodeEntities: false });
        var cards = $('.js-original-tweet');
        cards.each(function (i) {
            var id = $(this).data('tweet-id');
            twitterIDArray.push({ twitter_id: id, download: false });
        });
        console.log(twitterIDArray)
        var currLastNoteTS = lastNoteTS + 4;
        var currMaxPosition = 'max_position=' + json.min_position;
        console.log(currLastNoteTS);
        console.log(currMaxPosition);
        retry--;
        gettwitterid(currLastNoteTS, currMaxPosition);
    });
}
