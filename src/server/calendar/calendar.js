console.log(process.env);

var listCalendars = function(){
    var calendar = google.calendar('v3');
    calendar.calendarList.list({
        auth:'ya29.Glx3BD5aEkdqNnV5JjTBLArLgnnEGdIzRlyY1U8210Be1OCGqtJyhIvUQpc-Zdgsq-mUESSi6flOOryULswtGnibSXuXAAJJhcVcv2aI_ALsBxhCJKE2XSiFQSpQRA',
        pageToken: 1,
        minAccessRole: 'writer'
    }, function(err,response){
        if (err){
            console.log(err);
        }
        var list = response.items
        console.log(list);
    });
}

module.exports = listCalendars;