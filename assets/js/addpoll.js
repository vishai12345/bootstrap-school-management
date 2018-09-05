$(document).ready(function() {
    var counter = 0
    var div = ''
    var quizBox
    var option
    var width
    $('#addpoll').on('click', function() {
        counter += 1
        div = ''
        div +=
            '<div class="container"><div class="row"> <div class="mx-auto mt-3" style="width: 95%;border: 1px solid lightgrey;"> <div class="container"> <div class="row"> <div class="col-6"> <h4> <strong>Edit Question</strong> </h4> <div class="row my-3"> <div class="col-3"> <label for="answer"> <strong>Question : </strong> </label> </div><div class="col-9"> <input id="question-input' +
            counter
        div +=
            '" class="form-control" type="text" value="Would you like to setup polls on your website?" name="" id=""> </div></div><div class="row my-3" id="answer-div' +
            counter
        div +=
            '" style="display: none"> <div class="col-3"> <label for="answer"> <strong>Answer : </strong> </label> </div><div class="col-9"> <textarea style="resize: none;border: 1px solid black" placeholder="Type Here..." class="form-control" name="answer" id="anstextarea' +
            counter
        div +=
            '" cols="49" rows="3"></textarea> </div></div><div class="mt-2"> Answer Type: <label class="ml-2"> <input class="choice' +
            counter
        div += ' single" type="radio" name="type' + counter
        div +=
            '" value="single"> Single Choice</label> <label class="ml-2"> <input class="choice' +
            counter
        div += ' multiple" type="radio" name="type' + counter
        div +=
            '" value="multiple"> Multiple Choice</label> <label class="ml-2"> <input class="choice' +
            counter
        div += ' text" type="radio" name="type' + counter
        div +=
            '" value="text-box"> Text Box</label> </div></div><div class="col-md-6 col-sm-12"> <div class="mx-auto my-3" id="question-size' +
            counter
        div +=
            '" style="border: 5px solid rgb(148, 148, 148); width: 250px"> <strong> <p class="pl-2 text-justified" id="question-fixed' +
            counter
        div += '"></p></strong> <hr class="myhr"> <div id="sidedivans' + counter
        div += '"> <p id="sidedivp' + counter
        div +=
            '" class="pl-2"> </p><textarea class="form-control mx-auto my-2" style="resize: none;width: 90%;border: 1px solid black;" id="sidetextarea' +
            counter
        div +=
            '" rows="3"></textarea> </div><div align="center"> <button type="button" class="btn btn-secondary mx-auto mb-2">Vote</button> </div></div></div></div></div></div></div></div>'

        $('#pollquestions').append(div)

        for (var i = 0; i < counter; i++) {
			// QUESTION
			var questionInput = document.getElementById('question-input' + counter)
			var questionText = document.getElementById('question-fixed' + counter)
			questionText.textContent = questionInput.value
			questionInput.onkeypress = function() {
				questionText.textContent = questionInput.value
			}
	
			// CHOICES
			$('#answer-div' + counter).hide()
			$('#sidetextarea' + counter).hide()
			$('.choice' + counter).click(function() {
				var arrayOfLines = $('#anstextarea' + counter).val().trim().split('\n')
	
				if ($('input[name=type' + counter + ']:checked').val() == 'single') {
					$('#sidetextarea' + counter).hide()
					$('#answer-div' + counter).show()
					$('#sidedivp' + counter).show()
					radio()
				}
	
				if ($('input[name=type' + counter + ']:checked').val() == 'multiple') {
					$('#sidetextarea' + counter).hide()
					$('#answer-div' + counter).show()
					$('#sidedivp' + counter).show()
					check()
				}
	
				if ($('input[name=type' + counter + ']:checked').val() == 'text-box') {
					$('#answer-div' + counter).hide()
					$('#sidedivp' + counter).empty().hide()
					$('#sidetextarea' + counter).show()
				}
	
				$('#anstextarea' + counter).keypress(function(event) {
					if (event.which == 13) {
						arrayOfLines = $('#anstextarea' + counter).val().trim().split('\n')
						if ($('input[name=type' + counter + ']:checked').val() == 'single') {
							radio()
						}
	
						if (
							$('input[name=type' + counter + ']:checked').val() == 'multiple'
						) {
							check()
						}
					}
				})
	
				function radio() {
					$('#sidedivp' + counter).empty()
					for (var i = 0; i < arrayOfLines.length; i++) {
						arrayOfLines[i] = arrayOfLines[i].replace(/[^-a-zA-Z0-9]+/g, '')
						if (/\S/.test(arrayOfLines[i])) {
							$('#sidedivp' + counter).append(
								'<input type="radio" class="mt-2" name="answer" value=' +
								arrayOfLines[i] +
								'> ' +
								arrayOfLines[i] +
								'<br>'
							)
						}
					}
				}
	
				function check() {
					$('#sidedivp' + counter).empty()
					for (var i = 0; i < arrayOfLines.length; i++) {
						arrayOfLines[i] = arrayOfLines[i].replace(/[^-a-zA-Z0-9]+/g, '')
						if (/\S/.test(arrayOfLines[i])) {
							$('#sidedivp' + counter).append(
								'<input type="checkbox" class="mt-2" name="answer" value=' +
								arrayOfLines[i] +
								'> ' +
								arrayOfLines[i] +
								'<br>'
							)
						}
					}
				}
			})
		}
        
    })
})