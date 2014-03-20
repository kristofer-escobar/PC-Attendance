/******************************
Attendnace.js

Author: Kristofer Escobar
*******************************/

// Test Consumer Objects.
var consumers = [
    {
        'Name': 'Mike Test',
        'Times':['12:00 PM','1:00 PM']
    },
    {
        'Name':'Bob Test',
        'Times':['11:00 PM','2:00 PM','5:00 PM','7:00 PM']
    },
    {
        'Name': 'Peter Test',
        'Times':['9:00 PM','4:00 PM','5:00 PM','7:00 PM', '8:00 PM', '9:00 PM']
    },
    {
        'Name': 'Greg Test',
        'Times': ['9:00 PM', '4:00 PM', '5:00 PM', '7:00 PM', '8:00 PM', '9:00 PM']
    },
    {
        'Name': 'John Test',
        'Times': ['9:00 PM', '4:00 PM', '5:00 PM', '7:00 PM', '8:00 PM', '9:00 PM']
    },
    {
        'Name': 'Bill Test',
        'Times': ['9:00 PM', '4:00 PM', '5:00 PM', '7:00 PM', '8:00 PM', '9:00 PM']
    },
    {
        'Name': 'Neal Test',
        'Times': ['9:00 PM', '4:00 PM', '5:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM', '12:00 PM', '1:00 AM']
    }
];

// Build Attendance onReady.
$(document).ready(function () {

    // Create attendance title and append to main content title div.
    $('#main-content-header').append('<h3>Individual Attendance</h3>')

    // Create attendance div and append to main content div.
    $('#main-content').append('<div id="attendance-main-content" class="panel-group"></div>')

    for (var consumer in consumers) {

        // Get current consumer.
        var currentConsumer = consumers[consumer];

        // Build Panel Heading.
        $('#attendance-main-content').append('<div class="panel"><div class="panel-heading">' +

            // Build Selection Checkbox.
            '<label class="cbSelect"><input class="selected-consumer" id="consumer' + consumer + '" type="checkbox"></label>' +

            //  Build Present checkbox button.
            '<div class="btnPresent" data-toggle="buttons"><label class="btn btn-default"><input type="checkbox">Present</label></div>' +

            // Build Panel Header.
            '<a class="panel-header attendance-panel-header collapsed" data-toggle="collapse" data-target="#collapse' + consumer + '"></a>' +

            // Build Panel Body.
            '</div><div id="collapse' + consumer + '" class="panel-collapse collapse in"><div class="panel-body"></div></div></div>');

        // Set the consumer names.
        $("#attendance-main-content a").eq(consumer).text(currentConsumer.Name);

        // Create dropdowns for each time.
        for (var time in currentConsumer.Times) {
            var label = time % 2 ? 'Time Out: ' : 'Time In: ';

            $("#attendance-main-content .panel-body").eq(consumer).append('<div class="input-group"><span class="input-group-addon time-label">' +
                label + '</span><span class="bootstrap-timepicker">' + '<input id="timepicker' + consumer + '_' + time + '" type="text" class="timepicker form-control"></span></div>');

            if (((+time != 0) && ((+time + 1) % 8) == 0) || (+time == currentConsumer.Times.length - 1)){
                $('#attendance-main-content .panel-body:eq(' + consumer + ') > .input-group').wrapAll('<div class="row"></div>');

                while (($children = $(':not(.col-md-3) > .input-group:lt(2)')).length) {
                    $children.wrapAll($('<div class="time-group col-sm-6 col-md-3"></div>'));
                }
            }

            // Initialize timepickers
            $('#timepicker' + consumer + '_' + time).timepicker({
                minuteStep: 5,
                showInputs: false,
                disableFocus: true,
                disableMousewheel: true
            });

            $('#timepicker' + consumer + '_' + time).timepicker('setTime', currentConsumer.Times[time]);
        }

        // Toggle panel-info class to change the color.
        $('#consumer' + consumer).change(function () {
            console.log('#consumer' + consumer);
            $(this).parent().parent().parent().toggleClass("panel-info");
        });
    }

    // handle the #toggle click event
    $("#side-menu-toggle").on("click", function () {
        // apply/remove the active class to the row-offcanvas element
        $(".row-offcanvas").toggleClass("active");
    });

});

