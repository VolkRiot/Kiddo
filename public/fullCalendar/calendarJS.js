$(document).ready(function() {
    var allCalendars = [];
    //Define Random Color for Each Calendar
    var colorArray = ['red','blue','orange','green','purple']
    $.get('/calendar/getevents', function(response){
        console.log(response);
        //Breakdown of each calendar
        $.each(response, function(i,calendar){
            console.log(calendar);
            var eventArray = [];
            //Breakdown each event
            $.each(calendar.items, function(i,event){
                //All Day Events vs Specific DateTime events filtering
                var startDate;
                var endDate;
                if(event.start.date == null || event.end.date == null){
                    startDate = event.start.dateTime;
                    endDate = event.end.dateTime;
                }
                else{
                    startDate = event.start.date
                    endDate = event.end.date
                }
                console.log(startDate);
                var eventObject = {
                    title: event.summary,
                    start: startDate
                }
                eventArray.push(eventObject);
            });
            var eventsObject = {
                events: eventArray,
                color: colorArray[i]
            }
            allCalendars.push(eventsObject);
        });
    }).done(function(){
        console.log(allCalendars);
        //Initialize and Create Calendar
        $('#calendar').fullCalendar({
            //Add Event Button
             customButtons: {
                AddEvent: {
                    text: 'add event',
                    click: function() {
                        //Modal for Add Event
                          vex.dialog.open({
                            message: "Comments",
                            buttons:[
                                $.extend({},vex.dialog.buttons.NO,{text: "Close Window"})
                            ]
                        });
                        //JQuery DOM Edit to Allow Creation of Survey
                        $('.vex-dialog-message').html("<div id='surveyContainer'></div>");
                        //SurveyJS Code
                        Survey.Survey.cssType = "bootstrap";
                        //Survey JSON
                        var surveyJSON = {pages:[{elements:[{type:"text",isRequired:true,name:"title",title:"Title"},{type:"text",inputType:"datetime-local",isRequired:true,name:"startDate",title:"Start Date & Time"},{type:"text",inputType:"datetime-local",isRequired:true,name:"endDate",title:"End Date & Time"}],name:"page1"}]};
                        //Function to Send Data to Server **Needs Work
                        function sendDataToServer(survey) {
                            $('.vex-dialog-message').html('');
                            var resultAsString = JSON.stringify(survey.data);
                            $.post('/addevent', resultAsString).done(function (response) {
                                console.log(response);
                            });
                        }
                        //Initialize Survey
                        var survey = new Survey.Model(surveyJSON);
                        $("#surveyContainer").Survey({
                            model: survey,
                            onComplete: sendDataToServer
                        });
                        
                    }
                }
            },
            header: {
				left: 'prev,next today AddEvent',
				center: 'title',
				right: 'month,basicWeek,basicDay list'
			},
            eventSources: allCalendars,
        });
    });
});