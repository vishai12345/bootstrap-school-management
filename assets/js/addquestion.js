const settings = {
    deafultQuestionFontSize: '17px',
    deafultOptionFontSize: '15px',
    defultQuestionBackground: '#fff',
    defultOptionBackground: '#fff',
    fontSizes: ['10px', '12px', '14px', '16px', '18px', '20px', '22px', '24px'],
    colors: ['#cf293a', '#e8e8e8','black', '#7cb340', '#f5b632', '#2094d9']
}

let questions = []       
       
       $(document).ready(function () {
            $("#toggle-fold-aside-button").trigger('click');
            var counter = 0;

            $(".add-btn").on("click", function () {
                const QuestionType = $(this).attr('data-questionType')
                if(!QuestionType){
                   return;
                }

                const newQuestionObj = {
                    question : {
                        title: `Which flavor of ice cream is your favourite?`,
                        background: settings.defultQuestionBackground,
                        fontSize: settings.deafultQuestionFontSize
                    },
                    options: {
                        background: settings.defultOptionBackground,
                        fontSize: settings.deafultOptionFontSize,
                        list: ['option 1', 'option 2', 'option 3', 'option 4']
                    },
                    type: QuestionType.toLowerCase(),
                    id: questions.length + 1
                }
                                
                questions.push(newQuestionObj)
                const questionEleHtml = returnQuestionHtml(newQuestionObj)

                counter = $('#myTable tr').length - 2;

                var newRow = $(`<tr data-questionid='${newQuestionObj.id}'>`);
                var cols = "";

                cols += `<div class="add_quest example w-100"> <div class="description" style="background-color: lightgray !important"> <div class="description-text"> </div><div style="margin-left: auto !important;"> <a href="" class="myanchor mr-1"><span class="fa fa-cog"></span> <span>Setting</span></a> <a href="" class="myanchor mr-1"><span class="fa fa-files-o"></span> <span>Copy</span></a> <a href="" class="myanchor mr-1">Logic</a> <a href="javascript:void(0);" class="editQuestion myanchor mr-1"><span class="fa fa-pencil-square-o"></span> <span>Edit</span></a> </div><div class="toggle-source-preview"> <i class="icon icon-code-tags"></i> <i class="icon icon-eye-outline"></i> </div></div><div class="source-preview-wrapper"> <div class="preview"> <div class="preview-elements col-md-12">${questionEleHtml}</div></div><div class="source custom-scrollbar"> <div class="highlight"> <pre style="background-color:#fff;-moz-tab-size:4;-o-tab-size:4;tab-size:4"> <code class="language-html" data-lang="html"> &lt;<span style="color:#000080;font-weight:bold">button</span> <span style="color:#f00">type</span>=<span style="color:#00f">&#34;button&#34;</span> <span style="color:#f00">class</span>=<span style="color:#00f">&#34;btn btn-danger&#34;</span>&gt;DANGER&lt;/<span style="color:#000080;font-weight:bold">button</span>&gt; &lt;<span style="color:#000080;font-weight:bold">button</span> <span style="color:#f00">type</span>=<span style="color:#00f">&#34;button&#34;</span> <span style="color:#f00">class</span>=<span style="color:#00f">&#34;btn btn-dark&#34;</span>&gt;DARK&lt;/<span style="color:#000080;font-weight:bold">button</span>&gt; &lt;<span style="color:#000080;font-weight:bold">button</span> <span style="color:#f00">type</span>=<span style="color:#00f">&#34;button&#34;</span> <span style="color:#f00">class</span>=<span style="color:#00f">&#34;btn btn-info&#34;</span>&gt;INFO&lt;/<span style="color:#000080;font-weight:bold">button</span>&gt; &lt;<span style="color:#000080;font-weight:bold">button</span> <span style="color:#f00">type</span>=<span style="color:#00f">&#34;button&#34;</span> <span style="color:#f00">class</span>=<span style="color:#00f">&#34;btn btn-light&#34;</span>&gt;LIGHT&lt;/<span style="color:#000080;font-weight:bold">button</span>&gt; &lt;<span style="color:#000080;font-weight:bold">button</span> <span style="color:#f00">type</span>=<span style="color:#00f">&#34;button&#34;</span> <span style="color:#f00">class</span>=<span style="color:#00f">&#34;btn btn-primary&#34;</span>&gt;PRIMARY&lt;/<span style="color:#000080;font-weight:bold">button</span>&gt; &lt;<span style="color:#000080;font-weight:bold">button</span> <span style="color:#f00">type</span>=<span style="color:#00f">&#34;button&#34;</span> <span style="color:#f00">class</span>=<span style="color:#00f">&#34;btn btn-secondary&#34;</span>&gt;SECONDARY&lt;/<span style="color:#000080;font-weight:bold">button</span>&gt; &lt;<span style="color:#000080;font-weight:bold">button</span> <span style="color:#f00">type</span>=<span style="color:#00f">&#34;button&#34;</span> <span style="color:#f00">class</span>=<span style="color:#00f">&#34;btn btn-success&#34;</span>&gt;SUCCESS&lt;/<span style="color:#000080;font-weight:bold">button</span>&gt; &lt;<span style="color:#000080;font-weight:bold">button</span> <span style="color:#f00">type</span>=<span style="color:#00f">&#34;button&#34;</span> <span style="color:#f00">class</span>=<span style="color:#00f">&#34;btn btn-warning&#34;</span>&gt;WARNING&lt;/<span style="color:#000080;font-weight:bold">button</span>&gt; &lt;<span style="color:#000080;font-weight:bold">button</span> <span style="color:#f00">type</span>=<span style="color:#00f">&#34;button&#34;</span> <span style="color:#f00">class</span>=<span style="color:#00f">&#34;btn btn-link&#34;</span>&gt;Link&lt;/<span style="color:#000080;font-weight:bold">button</span>&gt; </code> </pre> </div></div></div></div>`;

                cols += `<td><input type="button" class="ibtnDel btn btn-md btn-danger"  value="Delete"></td><input type="button" class="pageBreak btn btn-md btn-info" value="Page Break" style="float: right">`;
                newRow.append(cols);
                // if (counter == 4) $('#addrow').attr('disabled', true).prop('value', "You've reached the limit");
                $("table.order-list").append(newRow);
                counter++;

                $("#toggle-fold-aside-button").trigger('click');
            });

            $(document).on('click', '.toggle-source-preview', function (event){
                event.preventDefault()
                const parent = $(this).closest("tr")
                const parentDiv = $(this).closest('div.example')
                const editLayout = parent.find('div.custom-scrollbar')
                editLayout.empty().html(editQuestionLayoutHtml(parent.attr('data-questionid')))
                parentDiv.toggleClass('show-source');
            });

            $("table.order-list").on("change", 'input[name^="price"]', function (event) {
                calculateRow($(this).closest("tr"));
                calculateGrandTotal();
            });


            $("table.order-list").on("click", ".ibtnDel", function (event) {
                event.preventDefault()
                const currentTr = $(this).closest("tr") 
                questions.splice(questions.findIndex(question => question.id === parseInt(currentTr.attr('data-questionid'))), 1)
                currentTr.remove()
                calculateGrandTotal();

                counter -= 1
                $('.add-btn').attr('disabled', false).prop('value', "Add Question");
            });

            $(document).on('click', '.questionBackgroundColor', function(e){
                e.preventDefault()
                const $this = $(this)
                const $backgroundColor = $this.css("background-color")
                const $parentTr = $this.closest("tr")
                const currentTrId = $parentTr.attr('data-questionid')
                let currentQuestionIndex = questions.findIndex(question => question.id == currentTrId)
                questions[currentQuestionIndex].question.background = $backgroundColor
                $parentTr.find('div.questionEle').css('background-color', $backgroundColor)
            })

            $(document).on('click', '.bodyBackgroundColor', function(e){
                e.preventDefault()
                const $this = $(this)
                const $backgroundColor = $this.css("background-color")
                const $parentTr = $this.closest("tr")
                const currentTrId = $parentTr.attr('data-questionid')
                let currentQuestionIndex = questions.findIndex(question => question.id == currentTrId)
                questions[currentQuestionIndex].options.background = $backgroundColor
                $parentTr.find('div.optionEle').css('background-color', $backgroundColor)
            })

            $(document).on('click', '.questionFontsize', function(e){
                e.preventDefault()
                const $this = $(this)
                const $fontSize = $this.text()
                const $parentTr = $this.closest("tr")
                const currentTrId = $parentTr.attr('data-questionid')
                let currentQuestionIndex = questions.findIndex(question => question.id == currentTrId)
                questions[currentQuestionIndex].question.fontSize = $fontSize
                $parentTr.find('div.questionEle').children('span').css('font-size', $fontSize)
            })

            $(document).on('click', 'a.editQuestion', function(event){
                event.preventDefault();
                const $this = $(this)
                const $currentTrId = $this.closest("tr").attr('data-questionid')
                let $currentQuestionForEdit = questions.find(question => question.id == $currentTrId)
                console.log(questions)
                if(!$this.hasClass('editingQuestion')){
                    $this.addClass('editingQuestion')
                    $this.closest("tr").find('.preview-elements').css('display', 'none')
                    const editContentHtml = editQuestion($currentQuestionForEdit)
                    $this.closest("tr").find('.preview').append(editContentHtml)
                }else{
                    $this.removeClass('editingQuestion')
                    $currentQuestionForEdit.options.list = []
                    const updatedQuestionData = $this.closest("tr").find('.editContentHtml').serializeArray()
                    updatedQuestionData.map(questionRow => {
                        if(questionRow.name == 'question'){
                            $currentQuestionForEdit.question.title = questionRow.value
                        }else{
                            $currentQuestionForEdit.options.list.push(questionRow.value)
                        }
                    })
                    $this.closest("tr").find('.preview-elements').empty().html(returnQuestionHtml($currentQuestionForEdit)).css('display', 'block')
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
        });



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

        function editQuestionLayoutHtml ($questionId) {
            return `
                <div class="custom-tab-style">
                    <ul class="nav nav-tabs">
                        <li class="active"><a data-toggle="tab" href="#Setting${$questionId}">Home</a></li>
                        <li><a data-toggle="tab" href="#AdvanceSetting${$questionId}">Advance Setting</a></li>
                        <li><a data-toggle="tab" href="#Theme${$questionId}">Theme</a></li>
                    </ul>
                    <div class="tab-content">
                        <div id="Setting${$questionId}" class="tab-pane fade in active">
                            <div class="row mt-3">
                                <div class="col-md-6 form-group">
                                    <label for="questionBackgroundColor" class="col-md-4 col-form-label">Header Color</label>
                                    <div class="d-flex justify-content-start ml-3">
                                        <div class="questionBackgroundColor" style="width: 30px; height: 30px; background-color: rgb(207, 41, 58); margin-right: 10px;"></div>
                                        <div class="questionBackgroundColor" style="width: 30px; height: 30px; background-color: rgb(232, 232, 232); margin-right: 10px;"></div>
                                        <div class="questionBackgroundColor" style="width: 30px; height: 30px; background-color: black; margin-right: 10px;"></div>
                                        <div class="questionBackgroundColor" style="width: 30px; height: 30px; background-color: rgb(124, 179, 64); margin-right: 10px;"></div>
                                        <div class="questionBackgroundColor" style="width: 30px; height: 30px; background-color: rgb(245, 182, 50); margin-right: 10px;"></div>
                                        <div class="questionBackgroundColor" style="width: 30px; height: 30px; background-color: rgb(32, 148, 217); margin-right: 10px;"></div>
                                    </div>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label for="bodyBackgroundColor" class="col-md-4 col-form-label">Body Color</label>
                                    <div class="d-flex justify-content-start ml-3">
                                        <div class="bodyBackgroundColor" style="width: 30px; height: 30px; background-color: rgb(207, 41, 58); margin-right: 10px;"></div>
                                        <div class="bodyBackgroundColor" style="width: 30px; height: 30px; background-color: rgb(232, 232, 232); margin-right: 10px;"></div>
                                        <div class="bodyBackgroundColor" style="width: 30px; height: 30px; background-color: black; margin-right: 10px;"></div>
                                        <div class="bodyBackgroundColor" style="width: 30px; height: 30px; background-color: rgb(124, 179, 64); margin-right: 10px;"></div>
                                        <div class="bodyBackgroundColor" style="width: 30px; height: 30px; background-color: rgb(245, 182, 50); margin-right: 10px;"></div>
                                        <div class="bodyBackgroundColor" style="width: 30px; height: 30px; background-color: rgb(32, 148, 217); margin-right: 10px;"></div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label for="questionFontsize" class="col-md-4 col-form-label">Ouestion Font Size</label>
                                    <div class="d-flex justify-content-start ml-3">
                                        <div class="questionFontsize" style="background-color: lightgray; margin-right: 5px; padding: 5px;">10px</div>
                                        <div class="questionFontsize" style="background-color: lightgray; margin-right: 5px; padding: 5px;">12px</div>
                                        <div class="questionFontsize" style="background-color: lightgray; margin-right: 5px; padding: 5px;">14px</div>
                                        <div class="questionFontsize" style="background-color: lightgray; margin-right: 5px; padding: 5px;">16px</div>
                                        <div class="questionFontsize" style="background-color: lightgray; margin-right: 5px; padding: 5px;">18px</div>
                                        <div class="questionFontsize" style="background-color: lightgray; margin-right: 5px; padding: 5px;">20px</div>
                                        <div class="questionFontsize" style="background-color: lightgray; margin-right: 5px; padding: 5px;">22px</div>
                                        <div class="questionFontsize" style="background-color: lightgray; margin-right: 5px; padding: 5px;">24px</div>
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
                    <div class="form-group">
                        <label for="question">Question</label>
                        <input value="${editQuestionObj.question.title}" type="text" class="form-control" id="question" placeholder="Enter question" name="question">
                    </div>
                    <div class="form-group">
                        <label for="option1">option 1:</label>
                        <input value="${editQuestionObj.options.list[0]}" type="text" class="form-control" id="option1" placeholder="Enter option1" name="options">
                    </div>
                    <div class="form-group">
                        <label for="option2">option 2:</label>
                        <input value="${editQuestionObj.options.list[1]}" type="text" class="form-control" id="option2" placeholder="Enter option2" name="options">
                    </div>
                    <div class="form-group">
                        <label for="option3">option 3:</label>
                        <input value="${editQuestionObj.options.list[2]}" type="text" class="form-control" id="option3" placeholder="Enter option3" name="options">
                    </div>
                    <div class="form-group">
                        <label for="option4">option 4:</label>
                        <input value="${editQuestionObj.options.list[3]}" type="text" class="form-control" id="option4" placeholder="Enter option4" name="options">
                    </div>
                </form>
            `
        }