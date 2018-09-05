const settings = {
    deafultQuestionFontSize: '17px',
    deafultOptionFontSize: '15px',
    defultQuestionBackground: 'lightgray',
    defultOptionBackground: '#fff',
    fontSizes: ['10px', '12px', '14px', '16px', '18px', '20px', '22px', '24px'],
    colors: {
        'light' : '#e8e8e8',
        'blue'  : '#2094d9',
        'red'  : '#cf293a',
        'green'  : '#7cb340',
        'yellow'  : '#f5b632',
        'dark'  : '#000',
    }
}

let questions = []
let pollQuestions = []
const pollContainerHtml = $('.creating_container_of_poll_wrappr').html()

$(document).ready(function () {

            $(document).on('click', '.toggle-source-preview', function (event){
                event.preventDefault()
                const parent = $(this).closest("tr")
                const parentDiv = $(this).closest('div.example')
                const editLayout = parent.find('div.custom-scrollbar')
                editLayout.empty().html(editQuestionLayoutHtml(pollQuestions.find(question => question.id == parent.attr('data-questionid'))))
                parentDiv.toggleClass('show-source');
            });

            $("table.order-list").on("change", 'input[name^="price"]', function (event) {
                event.preventDefault()
                calculateRow($(this).closest("tr"));
                calculateGrandTotal();
            });


            $("table.order-list").on("click", ".ibtnDel", function (event) {
                event.preventDefault()
                const currentTr = $(this).closest("tr") 
                pollQuestions.splice(questions.findIndex(question => question.id === parseInt(currentTr.attr('data-questionid'))), 1)
                if(!pollQuestions.length){
                    $('.poll_container_empty').removeClass('d-none')
                }
                currentTr.remove()
                calculateGrandTotal();

                $('.add-btn').attr('disabled', false).prop('value', "Add Question");
            });

            $(document).on('click', '.questionBackgroundColor', function(e){
                e.preventDefault()
                const $this = $(this)
                const $backgroundColor = settings.colors[$this.closest("li").attr('data-background')]
                const $parentDiv = $this.closest(".parent-theme-conatiner")
                const currentDivId = $parentDiv.attr('data-questionid')
                pollQuestions[pollQuestions.findIndex(question => question.id == currentDivId)].question.background = $backgroundColor
                $parentDiv.closest('div.row').find(`div.preview_layout_conatiner_${currentDivId} div.question_header_container_preview`).css(`background-color`, $backgroundColor)
            })

            $(document).on('click', '.bodyBackgroundColor', function(e){
                e.preventDefault()
                const $this = $(this)
                const $backgroundColor = settings.colors[$this.closest("li").attr('data-background')]
                const $parentDiv = $this.closest(".parent-theme-conatiner")
                const currentDivId = $parentDiv.attr('data-questionid')
                pollQuestions[pollQuestions.findIndex(question => question.id == currentDivId)].options.background = $backgroundColor
                $parentDiv.closest('div.row').find(`div.preview_layout_conatiner_${currentDivId} div.options_preview_container`).css(`background-color`, $backgroundColor)
            })

            $(document).on('click', '.questionFontsize', function(e){
                e.preventDefault()
                const $this = $(this)
                const $fontSize = $this.text()
                const $parentDiv = $this.closest(".parent-theme-conatiner")
                const currentDivId = $parentDiv.attr('data-questionid')
                pollQuestions[pollQuestions.findIndex(question => question.id == currentDivId)].question.fontSize = $fontSize
                $parentDiv.closest('div.row').find(`div.preview_layout_conatiner_${currentDivId} div.question_header_container_preview`).children('p.question_preview').css('font-size', $fontSize)
            })

            $(document).on('click', 'a.editQuestion', function(event){
                event.preventDefault();
                const $this = $(this)
                let questionRenderHtml = ''
                let optionsRenderHtml = ''
                const $currentQuestionIndex = $this.closest('.example').find("div.creating_container_of_poll_wrappr_question").attr('data-question_index')
                let $currentQuestionForEdit = pollQuestions.find(question => question.id == $currentQuestionIndex)
                if(!$this.hasClass('editingPollQuestion')){
                    $this.addClass('editingPollQuestion')
                    $this.closest('tr').find('.ibtnDel').addClass('d-none')
                    $this.closest('tr').find('.pageBreak').addClass('d-none')
                    $this.closest("tr").find('.preview-elements').css('display', 'none')
                    const editContentHtml = editQuestion($currentQuestionForEdit)
                    $this.closest("tr").find('.preview').append(editContentHtml)
                }else{
                    $this.removeClass('editingPollQuestion')
                    $this.closest('tr').find('.ibtnDel').removeClass('d-none')
                    $this.closest('tr').find('.pageBreak').removeClass('d-none')
                    $currentQuestionForEdit.options.list = []
                    const updatedQuestionData = $this.closest("tr").find('.editContentHtml').serializeArray()
                    updatedQuestionData.map((questionRow, index) => {
                        if(questionRow.name == 'question'){
                            $currentQuestionForEdit.question.title = questionRow.value
                            questionRenderHtml = getQuestionRenderHtml($currentQuestionForEdit)
                        }else{
                            $currentQuestionForEdit.options.list.push(questionRow.value)
                            optionsRenderHtml += getOptionConatiner($currentQuestionForEdit.type, index+1, questionRow.value)
                        }
                    })
                    $this.closest("tr").find('.preview-elements').empty().html(getPollRenderHtml(questionRenderHtml, optionsRenderHtml)).css('display', 'block')
                    $this.closest("tr").find('.editContentHtml').remove()
                }
            })

            $(document).on('click', '.pageBreak' , function(event){
                event.preventDefault();
                const $this = $(this)
                if($this.closest("tr").hasClass('pageBreaked')){
                    $this.closest("tr").removeClass('pageBreaked')
                    $this.val("PAGE BREAK")
                }else{
                    $this.closest("tr").addClass('pageBreaked')
                    $this.val("SECTION BREAK")
                }
            })

            $(document).on('click', '.add_options', function(event){
                event.preventDefault();
                var count = $(".options_container").children('div.options_wrapper').length + 1;
                if(count < 8){
                    const optionHtml = `
                        <div class="options_wrapper mb-5">
                            <label for="options${count}">Option ${count}:</label>
                            <input type="text" class="form-control option_poll" id="${count}" placeholder="Enter options ${count}" name="options${count}">
                        </div>
                    `
                    const optionPreviewContainer = getOptionConatiner($("input[name=optionType]:checked").val(), count)
                    $('.options_preview_container').append(optionPreviewContainer)
                    $('.options_container').append(optionHtml)
                }else{

                }
            })

            $(document).on('change', "input[name=optionType]", function(event){
                event.preventDefault();
                var optionsHtml = ''
                const $type = $(this).val()
                $('.option_poll').each(function(index){
                    optionsHtml += getOptionConatiner($type, index+1, $(this).val())
                })
                $('.options_preview_container').html(optionsHtml)
            })

            $(document).on('keyup', '.option_poll', function(event){
                event.preventDefault();
                if($(this).val()){
                    $(`.preview-option-label-${$(this).attr('id')}`).text($(this).val())
                }else{
                    $(`.preview-option-label-${$(this).attr('id')}`).text(`Option ${$(this).attr('id')}`)
                }
            })

            $(document).on('keyup', '#question_poll', function(event){
                event.preventDefault();
                if($(this).val()){
                    $('.question_preview').text($(this).val())
                }
            })
            
            $(document).on('click', '.preview_poll_layout_submit_button', function(event){
                event.preventDefault();
                let optionsRenderHtml = ''
                let questionRenderHtml = null
                const questionObj = {
                    question : {
                        title: `Which flavor of ice cream is your favourite?`,
                        background: settings.defultQuestionBackground,
                        fontSize: settings.deafultQuestionFontSize
                    },
                    options: {
                        background: settings.defultOptionBackground,
                        fontSize: settings.deafultOptionFontSize,
                        list: []
                    },
                    type: null,
                    id: pollQuestions.length + 1
                }
                if($('#question_poll').val()){
                    questionObj.question.title = $('#question_poll').val()
                    questionObj.question.background = $('.question_header_container_preview').css('background-color')
                    questionObj.question.fontSize = $('.question_preview').css('font-size')
                    questionRenderHtml = getQuestionRenderHtml(questionObj)
                }
                const questionType = $("input[name=optionType]:checked").val()
                questionObj.type = questionType
                $('.option_poll').each(function(index){
                    const option = $(this).val()
                    questionObj.options.list.push(option)
                    if(option){
                        optionsRenderHtml += getOptionConatiner(questionType, index+1, option)
                    }
                })
                if(questionRenderHtml && optionsRenderHtml && questionType){
                    pollQuestions.push(questionObj)
                    addQuestion(questionObj, getPollRenderHtml(questionRenderHtml, optionsRenderHtml))
                    $('.creating_container_of_poll_wrappr').html(pollContainerHtml)
                    if(pollQuestions.length){
                        $('.poll_container_empty').addClass('d-none')
                    }
                }
            })
        });

        function addQuestion (newQuestionObj, questionEleHtml) {      
            var newRow = $(`<tr data-questionid='${newQuestionObj.id}'>`);
            var cols = "";
            cols += `<div class="add_question example w-100"> <div class="description"> <div class="description-text"> </div><div style="margin-left: auto !important;"> <a href="" class="myanchor mr-1"><span class="fa fa-cog"></span> <span>Setting</span></a> <a href="" class="myanchor mr-1"><span class="fa fa-files-o"></span> <span>Copy</span></a> <a href="" class="myanchor mr-1">Logic</a> <a href="javascript:void(0);" class="editQuestion myanchor mr-1"><span class="fa fa-pencil-square-o"></span> <span>Edit</span></a> </div><div class="toggle-source-preview"> <i class="icon icon-code-tags"></i> <i class="icon icon-eye-outline"></i> </div></div><div class="source-preview-wrapper"> <div class="preview"> <div class="preview-elements col-md-12">${questionEleHtml}</div></div><div class="source custom-scrollbar"> <div class="highlight"> <pre style="background-color:#fff;-moz-tab-size:4;-o-tab-size:4;tab-size:4"> <code class="language-html" data-lang="html"> &lt;<span style="color:#000080;font-weight:bold">button</span> <span style="color:#f00">type</span>=<span style="color:#00f">&#34;button&#34;</span> <span style="color:#f00">class</span>=<span style="color:#00f">&#34;btn btn-danger&#34;</span>&gt;DANGER&lt;/<span style="color:#000080;font-weight:bold">button</span>&gt; &lt;<span style="color:#000080;font-weight:bold">button</span> <span style="color:#f00">type</span>=<span style="color:#00f">&#34;button&#34;</span> <span style="color:#f00">class</span>=<span style="color:#00f">&#34;btn btn-dark&#34;</span>&gt;DARK&lt;/<span style="color:#000080;font-weight:bold">button</span>&gt; &lt;<span style="color:#000080;font-weight:bold">button</span> <span style="color:#f00">type</span>=<span style="color:#00f">&#34;button&#34;</span> <span style="color:#f00">class</span>=<span style="color:#00f">&#34;btn btn-info&#34;</span>&gt;INFO&lt;/<span style="color:#000080;font-weight:bold">button</span>&gt; &lt;<span style="color:#000080;font-weight:bold">button</span> <span style="color:#f00">type</span>=<span style="color:#00f">&#34;button&#34;</span> <span style="color:#f00">class</span>=<span style="color:#00f">&#34;btn btn-light&#34;</span>&gt;LIGHT&lt;/<span style="color:#000080;font-weight:bold">button</span>&gt; &lt;<span style="color:#000080;font-weight:bold">button</span> <span style="color:#f00">type</span>=<span style="color:#00f">&#34;button&#34;</span> <span style="color:#f00">class</span>=<span style="color:#00f">&#34;btn btn-primary&#34;</span>&gt;PRIMARY&lt;/<span style="color:#000080;font-weight:bold">button</span>&gt; &lt;<span style="color:#000080;font-weight:bold">button</span> <span style="color:#f00">type</span>=<span style="color:#00f">&#34;button&#34;</span> <span style="color:#f00">class</span>=<span style="color:#00f">&#34;btn btn-secondary&#34;</span>&gt;SECONDARY&lt;/<span style="color:#000080;font-weight:bold">button</span>&gt; &lt;<span style="color:#000080;font-weight:bold">button</span> <span style="color:#f00">type</span>=<span style="color:#00f">&#34;button&#34;</span> <span style="color:#f00">class</span>=<span style="color:#00f">&#34;btn btn-success&#34;</span>&gt;SUCCESS&lt;/<span style="color:#000080;font-weight:bold">button</span>&gt; &lt;<span style="color:#000080;font-weight:bold">button</span> <span style="color:#f00">type</span>=<span style="color:#00f">&#34;button&#34;</span> <span style="color:#f00">class</span>=<span style="color:#00f">&#34;btn btn-warning&#34;</span>&gt;WARNING&lt;/<span style="color:#000080;font-weight:bold">button</span>&gt; &lt;<span style="color:#000080;font-weight:bold">button</span> <span style="color:#f00">type</span>=<span style="color:#00f">&#34;button&#34;</span> <span style="color:#f00">class</span>=<span style="color:#00f">&#34;btn btn-link&#34;</span>&gt;Link&lt;/<span style="color:#000080;font-weight:bold">button</span>&gt; </code> </pre> </div></div></div></div>`;
            cols += `<td><input type="button" class="ibtnDel btn btn-md btn-danger"  value="Delete"></td><input type="button" class="pageBreak btn btn-md btn-info" value="Page Break" style="float: right">`;
            newRow.append(cols);
            $("div.poll_question_container table.order-list").append(newRow);
        };

        function getPollRenderHtml(questionHtml, optionsHtml){
            return `
                <div class="col-md-12 creating_container_of_poll_wrappr_question" data-question_index="${pollQuestions.length}">
                    <div class="creating_container_of_poll_question">
                        ${questionHtml}
                        <div class="options_preview_container_poll p-5 form-group mb-0" style="background-color:white">
                            ${optionsHtml}
                        </div>
                    </div>
                </div>
            `
        }

        function getQuestionRenderHtml(questionObj){
            return `
                <div class="question_header_container_poll p-5" style="border-bottom-color: black;border-bottom: 1px solid;">
                    <p class="question_poll" style='font-size: ${questionObj.question.fontSize}'>${questionObj.question.title}</p>
                </div>
            `
        }

        function getOptionConatiner(questionType = 'checkbox', count, option = null){
            if(questionType === 'checkbox'){
                return `
                    <label for="cbx-${pollQuestions.length}-${count}" class="label-cbx my-1 preview-option-container-${count}">
                        <input id="cbx-${pollQuestions.length}-${count}" type="checkbox" class="invisible preview-option-custom-input-${count}">
                        <div class="checkbox">
                            <svg width="20px" height="20px" viewBox="0 0 20 20">
                                <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>
                                <polyline points="4 11 8 15 16 6"></polyline>
                            </svg>
                        </div>
                        <span class='preview-option-custom preview-option-label-${count}'> ${!option ? `Option ${count}` : `${option}`} </span>
                    </label>
                `
            }else if(questionType === 'radio') {
                return `
                    <label for="input-${pollQuestions.length}-${count}">
                        <input id="input-${pollQuestions.length}-${count}" name="radio" class='preview-option-custom-input-${count}' type="radio"> 
                        <span class='preview-option-custom-label preview-option-label-${count}'> ${!option ? `Option ${count}` : `${option}`} </span>
                    </label>
                `
            }else{
                return ``
            }
        }

        function calculateRow(row) {
            var price = +row.find('input[name^="price"]').val();
        }

        function calculateGrandTotal() {
            var grandTotal = 0;
            $("table.order-list").find('input[name^="price"]').each(function () {
                grandTotal += +$(this).val();
            });
            $("#grandtotal").text(grandTotal.toFixed(2));
        }

        function returnQuestionHtml(questionObj){
            if(questionObj.type === 'checkbox'){
                return `
                    <div class='form-group'>
                        <div class="questionEle form-group" style="padding: 10px; background-color: ${questionObj.question.background};">
                            <span style="font-size: ${questionObj.question.fontSize}">${questionObj.question.title}</span>
                        </div>
                        <div class="optionEle form-group" style="background-color: ${questionObj.options.background};">
                            <label for="cbx1" class="label-cbx my-1">
                                <input id="cbx1" type="checkbox" class="invisible">
                                <div class="checkbox">
                                    <svg width="20px" height="20px" viewBox="0 0 20 20">
                                        <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>
                                        <polyline points="4 11 8 15 16 6"></polyline>
                                    </svg>
                                </div>
                                <span>${questionObj.options.list[0]}</span>
                            </label>
                            <label for="cbx2" class="label-cbx my-1">
                                <input id="cbx2" type="checkbox" class="invisible">
                                <div class="checkbox">
                                    <svg width="20px" height="20px" viewBox="0 0 20 20">
                                        <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>
                                        <polyline points="4 11 8 15 16 6"></polyline>
                                    </svg>
                                </div>
                                <span>${questionObj.options.list[1]}</span>
                            </label>
                            <label for="cbx3" class="label-cbx my-1">
                                <input id="cbx3" type="checkbox" class="invisible">
                                <div class="checkbox">
                                    <svg width="20px" height="20px" viewBox="0 0 20 20">
                                        <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>
                                        <polyline points="4 11 8 15 16 6"></polyline>
                                    </svg>
                                </div>
                                <span>${questionObj.options.list[2]}</span>
                            </label>
                            <label for="cbx4" class="label-cbx my-1">
                                <input id="cbx4" type="checkbox" class="invisible">
                                <div class="checkbox">
                                    <svg width="20px" height="20px" viewBox="0 0 20 20">
                                        <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>
                                        <polyline points="4 11 8 15 16 6"></polyline>
                                    </svg>
                                </div>
                                <span>${questionObj.options.list[3]}</span>
                            </label>
                        </div>
                    </div>
                `
            } else if(questionObj.type === 'radio'){
                return `
                    <div class='form-group'>
                        <div class="questionEle form-group" style="padding: 10px; background-color: ${questionObj.question.background};">
                            <span style="font-size: ${questionObj.question.fontSize}">${questionObj.question.title}</span>
                        </div>
                        <div class="optionEle form-group" style="background-color: ${questionObj.options.background};">
                            <label for="input1">
                                <input id="input1" name="radio" type="radio"> 
                                ${questionObj.options.list[0]}
                            </label>
                            <label for="input2">
                                <input id="input2" name="radio" type="radio">
                                ${questionObj.options.list[1]}
                            </label>
                            <label for="input3">
                                <input id="input3" name="radio" type="radio">
                                ${questionObj.options.list[2]}
                            </label>
                            <label for="input4">
                                <input id="input4" name="radio" type="radio">
                                ${questionObj.options.list[3]}
                            </label>
                        </div>
                    </div>
                `
            } else if(questionObj.type === 'dropdown'){
                return `
                    <div class='form-group'>
                        <div class="questionEle form-group" style="padding: 10px; background-color: ${questionObj.question.background};">
                            <span style="font-size: ${questionObj.question.fontSize}">${questionObj.question.title}</span>
                        </div>
                        <div class="optionEle form-group" style="background-color: ${questionObj.options.background};">
                            <select class="form-control">
                                <option>${questionObj.options.list[0]}</option>
                                <option>${questionObj.options.list[1]}</option>
                                <option>${questionObj.options.list[2]}</option>
                                <option>${questionObj.options.list[3]}</option>
                            </select>
                        </div>
                    </div>
                `
            }else{
                return null
            }
        }

        function editQuestionLayoutHtml (question) {
            const $questionId = question.id
            return `
                <div class="custom-tab-style">
                    <ul class="nav nav-tabs">
                        <li class="active"><a data-toggle="tab" href="#Setting${$questionId}">Home</a></li>
                        <li><a data-toggle="tab" href="#AdvanceSetting${$questionId}">Advance Setting</a></li>
                        <li><a data-toggle="tab" href="#Theme${$questionId}">Theme</a></li>
                    </ul>
                    <div class="tab-content">
                        <div id="Setting${$questionId}" class="tab-pane fade in active">
                            <div class="col-md-12">
                                <div class="row">
                                    <div class="col-md-5 mt-5 parent-theme-conatiner" data-questionid="${$questionId}">
                                        <div class="col-md-12">
                                            <label for="questionBackgroundColor" class="pl-3 col-form-label">Header Color</label>
                                            <div class="d-flex justify-content-start ml-3">
                                                <ul class="themes">
                                                    <li data-background="dark" class="dark questionBackgroundColor"><a href="#" data-class="is dark">Dark</a></li>
                                                    <li data-background="light" class="light questionBackgroundColor"><a href="#" data-class="is light">Light</a></li>
                                                    <li data-background="blue" class="blue questionBackgroundColor"><a href="#" data-class="is blue">Blue</a></li>
                                                    <li data-background="red" class="red questionBackgroundColor"><a href="#" data-class="is red">Red</a></li>
                                                    <li data-background="green" class="green questionBackgroundColor"><a href="#" data-class="is green">Green</a></li>
                                                    <li data-background="yellow" class="yellow questionBackgroundColor"><a href="#" data-class="is yellow">Yellow</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <label for="bodyBackgroundColor" class="pl-3 col-form-label">Body Color</label>
                                            <div class="d-flex justify-content-start ml-3">
                                                <ul class="themes">
                                                    <li data-background="dark" class="dark bodyBackgroundColor"><a href="#" data-class="is dark">Dark</a></li>
                                                    <li data-background="light" class="light bodyBackgroundColor"><a href="#" data-class="is light">Light</a></li>
                                                    <li data-background="blue" class="blue bodyBackgroundColor"><a href="#" data-class="is blue">Blue</a></li>
                                                    <li data-background="red" class="red bodyBackgroundColor"><a href="#" data-class="is red">Red</a></li>
                                                    <li data-background="green" class="green bodyBackgroundColor"><a href="#" data-class="is green">Green</a></li>
                                                    <li data-background="yellow" class="yellow bodyBackgroundColor"><a href="#" data-class="is yellow">Yellow</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <label for="questionFontsize" class="pl-3 col-form-label">Ouestion Font Size</label>
                                            <div class="d-flex justify-content-start ml-3">
                                                <ul class="themes">
                                                    <li class="light questionFontsize"><a href="#" data-class="is light">10px</a></li>
                                                    <li class="light questionFontsize"><a href="#" data-class="is light">12px</a></li>
                                                    <li class="light questionFontsize"><a href="#" data-class="is light">14px</a></li>
                                                    <li class="light questionFontsize"><a href="#" data-class="is light">16px</a></li>
                                                    <li class="light questionFontsize"><a href="#" data-class="is light">18px</a></li>
                                                    <li class="light questionFontsize"><a href="#" data-class="is light">20px</a></li>
                                                    <li class="light questionFontsize"><a href="#" data-class="is light">22px</a></li>
                                                    <li class="light questionFontsize"><a href="#" data-class="is light">24px</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-7 mt-5 preview_layout_conatiner_${$questionId}">
                                            ${previewPollQuestionLayout(question)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="AdvanceSetting${$questionId}" class="tab-pane fade"></div>
                        <div id="Theme${$questionId}" class="tab-pane fade"></div>
                    </div>
                </div>
            `
        }

        function editQuestion(editQuestionObj){
            return `
                <form class="form-group editContentHtml col-md-12">
                    <div class="form-group mb-0">
                        <label for="question">Question</label>
                        <input value="${editQuestionObj.question.title}" type="text" class="form-control" id="question" placeholder="Enter question" name="question">
                    </div>
                    <div class="form-group mb-0">
                        <label for="option1">option 1:</label>
                        <input value="${editQuestionObj.options.list[0]}" type="text" class="form-control" id="option1" placeholder="Enter option1" name="options">
                    </div>
                    <div class="form-group mb-0">
                        <label for="option2">option 2:</label>
                        <input value="${editQuestionObj.options.list[1]}" type="text" class="form-control" id="option2" placeholder="Enter option2" name="options">
                    </div>
                    <div class="form-group mb-0">
                        <label for="option3">option 3:</label>
                        <input value="${editQuestionObj.options.list[2]}" type="text" class="form-control" id="option3" placeholder="Enter option3" name="options">
                    </div>
                    <div class="form-group mb-0">
                        <label for="option4">option 4:</label>
                        <input value="${editQuestionObj.options.list[3]}" type="text" class="form-control" id="option4" placeholder="Enter option4" name="options">
                    </div>
                </form>
            `
        }

        function previewPollQuestionLayout($questionObj){
            return `
                <div class="creating_container_of_poll_preview" data-questionid="${$questionObj.id}">
                    <div class="question_header_container_preview p-5" style="background-color: ${$questionObj.question.background}">
                        <p class="question_preview">Question</p>
                    </div>
                    <div class="options_preview_container p-5 form-group" style="background-color: ${$questionObj.options.background}">
                        ${ getPreviewOptionContainer($questionObj) }
                    </div>
                </div>
            `
        }

        function getPreviewOptionContainer(questionObj){
            let optionsRenderHtml = '';
            questionObj.options.list.map((option, index) => {
                optionsRenderHtml += getOptionConatiner(questionObj.type, index+1, option)
            })
            return optionsRenderHtml
        }