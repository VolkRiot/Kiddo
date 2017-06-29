var google = require('googleapis');
listEvents();
function listEvents() {
  var calendar = google.calendar('v3');
  calendar.events.list({
    auth: 'Yw-VD9apjxS7JyJdrytLBAzv68xDvygcgqCK1TvAx5p7StvHvZnYgoXRk__vq_3O23ssOq5vkLwuM5ehBw_CiVVMmQ',
    calendarId: 'sfrunner1188@gmail.com',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime'
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var events = response.items;
    if (events.length == 0) {
      console.log('No upcoming events found.');
    } else {
      console.log('Upcoming 10 events:');
      for (var i = 0; i < events.length; i++) {
        var event = events[i];
        var start = event.start.dateTime || event.start.date;
        console.log('%s - %s', start, event.summary);
      }
    }
  });
}

