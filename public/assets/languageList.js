$(document).ready(function(){
    // When the button is clicked, show the user what language they voted on
    $('#languageForm input').on('change', function() {
        $("#res").text("You are going to vote for: " + $('input[name=language]:checked', '#languageForm').val());
    });

    // Method to execute when submit is clicked on
    $('form').on('submit', function(){
        // Return the name of the language voted for 
        var langName = $('input[name=language]:checked', '#languageForm').val();
        // Send as a mongoose schema
        var item = {Name :langName}
        // Use an ajax method to handle the posting to db
        $.ajax({
            type: 'PUT',
            url: '/languagePage',
            data: item,
            success: function(data){
                location.reload();
            }
        });
        return false;

    });

});

