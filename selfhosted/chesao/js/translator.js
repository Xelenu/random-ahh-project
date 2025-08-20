var forwardTimeout, backwardTimeout;
$(document).ready(function() {
	$('#english-text').focus();
	$('.translate-container .english').on("input",function(e) {
		clearTimeout(forwardTimeout);
		forwardTimeout = setTimeout(function() {
			var english = $('#english-text').val();
			var ghetto = translate(english);
			$('#ghetto-text').val(ghetto);
		},200);
	});

	$('.translate-container .ghetto').on("input",function(e) {
                clearTimeout(backwardTimeout);
                backwardTimeout = setTimeout(function() {
			var ghetto = $('#ghetto-text').val();
			var english = translate(ghetto,"backward");
			$('#english-text').val(english);
		},200);
	});

	//get word frequency for analytics
	$('.translate-container .english').keypress(function(e) {
		if(e.which == 32) {
			var text = $('#english-text').val();

		}
	});


	$('#random-sentence').click(function() {
		$('#english-text').val( randomSentences[Math.floor(randomSentences.length*Math.random())] + " " + randomSentences[Math.floor(randomSentences.length*Math.random())]);
		var english = $('#english-text').val();
		var ghetto = translate(english);
		$('#ghetto-text').val(ghetto);
	});


    //Sumbitting suggestions
    var suggestionRequestPending = false;
    $('#submit-suggestion').click(function() {
        if(suggestionRequestPending === true) return;

        // get all inputs on page, select one with data_id
        var suggestion = $('#suggestion-box').val();
        var urlName = window.location.pathname.substring(1);
        suggestionRequestPending = true;

        $('#suggestion-area').fadeTo(50, 0.3);

        $.post("../php/saveSuggestion.php", {
            urlName:urlName,
            suggestion:suggestion
        })
        .done(function(data) {
            suggestionRequestPending = false;
            $('#suggestion-area').fadeTo(50, 1);
            $('#suggestion-box').val("");
            alert("Thanks for the suggestion!");
            console.log(data);
        })
        .fail(function(data) {
            suggestionRequestPending = false;
            $('#suggestion-area').fadeTo(50, 1);

            alert("Sorry, something went wrong :| "+data);
        });
    });

});
