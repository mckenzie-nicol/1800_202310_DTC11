
$(document).ready(function() {
    $("#add_report").click(function() {
    //when the button is clicked print to the console
        console.log("add report button clicked");
    // load the submission.html into the div with id="reportPlaceholder"
        console.log($('#reportPlaceholder').load('./text/submission.html'));

    
    });
});

// Path: text\submission.html
// This is the html that will be loaded into the div with id="reportPlaceholder"
// <div class="container">
//     <div class="row">
//         <div class="col-md-12">
//             <h1>Report a Problem</h1>
//             <form>
