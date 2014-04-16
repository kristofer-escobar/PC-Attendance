/******************************
Attendnace.js

Author: Kristofer Escobar
*******************************/

// Build Attendance onReady.
$(document).ready(function () {

    // Create attendance title and append to main content title div.
    $('#main-content-header').append('<h3>Individual Attendance</h3>')

    //        // Initialize timepickers
    //        $('#timepicker' + consumer + '_' + time).timepicker({
    //            minuteStep: 5,
    //            showInputs: false,
    //            disableFocus: true,
    //            disableMousewheel: true
    //        });

    // handle the #toggle click event
    $("#side-menu-toggle").on("click", function () {
        // apply/remove the active class to the row-offcanvas element
        $(".row-offcanvas").toggleClass("active");
    });

    //$('label.tree-toggler').click(function () {
    //    $(this).parent().children('ul.tree').toggle(300);
    //});
    $('.tree-toggle').click(function () {
        debugger;
        console.log('binding');
        $(this).parent().children('ul.tree').toggle(200);
    });
});

