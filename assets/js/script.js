$(document).ready(function(){
    // WIDTH
    var width = document.getElementById("width");
    var quizBox = document.getElementById("question-size");
    var option = width.value;
    quizBox.style.width = option;
    width.onclick = function(){
        option = width.value;
        quizBox.style.width = option;
    }

    // QUESTION
    var questionInput = document.getElementById("question-input");
    var questionText = document.getElementById("question-fixed");
    questionText.textContent = questionInput.value;
    questionInput.onkeypress = function(){
        questionText.textContent = questionInput.value;
    }

    // CHOICES
    $("#answer-div").hide();
    $("#sidetextarea").hide();
    $(".choice").click(function () {
        var arrayOfLines = $('#anstextarea').val().trim().split('\n');
    
        if ($('input[name=type]:checked').val() == "single") {
            $("#sidetextarea").hide();
            $("#answer-div").show();
            $("#sidedivp").show();
            radio();
        }
    
        if ($('input[name=type]:checked').val() == "multiple") {
            $("#sidetextarea").hide();
            $("#answer-div").show();
            $("#sidedivp").show();
            check();
        }

        if ($('input[name=type]:checked').val() == "text-box") {
            $("#answer-div").hide();
            $("#sidedivp").empty().hide();
            $("#sidetextarea").show();
        }
    
        $("#anstextarea").keypress(function (event) {
            if (event.which == 13) {
                arrayOfLines = $('#anstextarea').val().trim().split('\n');
                if ($('input[name=type]:checked').val() == "single") {
                    radio();
                }
    
                if ($('input[name=type]:checked').val() == "multiple") {
                    check();
                }
            }
        })
        function radio() {
            $("#sidedivp").empty();
            for (var i = 0; i < arrayOfLines.length; i++) {
                arrayOfLines[i] = arrayOfLines[i].replace(/[^-a-zA-Z0-9]+/g, "");                    
                if (/\S/.test(arrayOfLines[i])){
                    $("#sidedivp").append("<input type=\"radio\" class=\"mt-2\" name=\"answer\" value=" + arrayOfLines[i] + "> " + arrayOfLines[i] + "<br>");
                }
            }
        }
        function check() {
            $("#sidedivp").empty();
            for (var i = 0; i < arrayOfLines.length; i++) {
                arrayOfLines[i] = arrayOfLines[i].replace(/[^-a-zA-Z0-9]+/g, "");
                if (/\S/.test(arrayOfLines[i]))
                    $("#sidedivp").append("<input type=\"checkbox\" class=\"mt-2\" name=\"answer\" value=" + arrayOfLines[i] + "> " + arrayOfLines[i] + "<br>");
            }
        }
    })
    $(".popper").popover({
        html: true,
        placement: 'left',
        trigger: 'hover',
        content: function(){
            return $(this).next('#popover_content_wrapper').html();
        },
        delay: { show: 100, hide: 100}
    })
});
