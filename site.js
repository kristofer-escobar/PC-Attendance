// Site onReady.
$(document).ready(function () {

    // Update the selected case record label.
    $("#case-record-dropdown li a").click(function () {
        $(this).parents(".dropdown").find('#selected-case-record').text($(this).text());
        $(this).parents(".dropdown").find('#selected-case-record').val($(this).text());
    });
});