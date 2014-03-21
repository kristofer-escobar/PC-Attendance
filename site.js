// Site onReady.
$(document).ready(function () {

    // Update the selected case record label.
    $("#case-record-options li a").click(function () {
        $(this).parents("#left-sidebar-menu").find('#case-record-button').html($(this).text() + ' <span class="caret"></span>');
        $(this).parents("#left-sidebar-menu").find('#case-record-button').val($(this).text());
    });
});