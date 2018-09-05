        $(document).ready(function () {
            $("#toggle-fold-aside-button").trigger('click');
            var counter = 0;

            $(".add-btn").on("click", function () {

                counter = $('#myTable tr').length - 2;

                var newRow = $("<tr>");
                var cols = "";

                cols += '<div class="example w-100"> <div class="description" style="background-color: lightgray !important"> <div class="description-text"> </div><div style="margin-left: auto !important;"> <a href="" class="myanchor mr-1">Setting</a> <a href="" class="myanchor mr-1">Copy</a> <a href="" class="myanchor mr-1">Logic</a> <a href="" class="myanchor mr-1">Edit</a> </div><div class="toggle-source-preview"> <i class="icon icon-code-tags"></i> <i class="icon icon-eye-outline"></i> </div></div><div class="source-preview-wrapper"> <div class="preview"> <div class="preview-elements"> </div></div><div class="source custom-scrollbar"> <div class="highlight"> <pre style="background-color:#fff;-moz-tab-size:4;-o-tab-size:4;tab-size:4"> <code class="language-html" data-lang="html"> &lt;<span style="color:#000080;font-weight:bold">button</span> <span style="color:#f00">type</span>=<span style="color:#00f">&#34;button&#34;</span> <span style="color:#f00">class</span>=<span style="color:#00f">&#34;btn btn-danger&#34;</span>&gt;DANGER&lt;/<span style="color:#000080;font-weight:bold">button</span>&gt; &lt;<span style="color:#000080;font-weight:bold">button</span> <span style="color:#f00">type</span>=<span style="color:#00f">&#34;button&#34;</span> <span style="color:#f00">class</span>=<span style="color:#00f">&#34;btn btn-dark&#34;</span>&gt;DARK&lt;/<span style="color:#000080;font-weight:bold">button</span>&gt; &lt;<span style="color:#000080;font-weight:bold">button</span> <span style="color:#f00">type</span>=<span style="color:#00f">&#34;button&#34;</span> <span style="color:#f00">class</span>=<span style="color:#00f">&#34;btn btn-info&#34;</span>&gt;INFO&lt;/<span style="color:#000080;font-weight:bold">button</span>&gt; &lt;<span style="color:#000080;font-weight:bold">button</span> <span style="color:#f00">type</span>=<span style="color:#00f">&#34;button&#34;</span> <span style="color:#f00">class</span>=<span style="color:#00f">&#34;btn btn-light&#34;</span>&gt;LIGHT&lt;/<span style="color:#000080;font-weight:bold">button</span>&gt; &lt;<span style="color:#000080;font-weight:bold">button</span> <span style="color:#f00">type</span>=<span style="color:#00f">&#34;button&#34;</span> <span style="color:#f00">class</span>=<span style="color:#00f">&#34;btn btn-primary&#34;</span>&gt;PRIMARY&lt;/<span style="color:#000080;font-weight:bold">button</span>&gt; &lt;<span style="color:#000080;font-weight:bold">button</span> <span style="color:#f00">type</span>=<span style="color:#00f">&#34;button&#34;</span> <span style="color:#f00">class</span>=<span style="color:#00f">&#34;btn btn-secondary&#34;</span>&gt;SECONDARY&lt;/<span style="color:#000080;font-weight:bold">button</span>&gt; &lt;<span style="color:#000080;font-weight:bold">button</span> <span style="color:#f00">type</span>=<span style="color:#00f">&#34;button&#34;</span> <span style="color:#f00">class</span>=<span style="color:#00f">&#34;btn btn-success&#34;</span>&gt;SUCCESS&lt;/<span style="color:#000080;font-weight:bold">button</span>&gt; &lt;<span style="color:#000080;font-weight:bold">button</span> <span style="color:#f00">type</span>=<span style="color:#00f">&#34;button&#34;</span> <span style="color:#f00">class</span>=<span style="color:#00f">&#34;btn btn-warning&#34;</span>&gt;WARNING&lt;/<span style="color:#000080;font-weight:bold">button</span>&gt; &lt;<span style="color:#000080;font-weight:bold">button</span> <span style="color:#f00">type</span>=<span style="color:#00f">&#34;button&#34;</span> <span style="color:#f00">class</span>=<span style="color:#00f">&#34;btn btn-link&#34;</span>&gt;Link&lt;/<span style="color:#000080;font-weight:bold">button</span>&gt; </code> </pre> </div></div></div></div>';
                
                // cols += '<td><input type="text" class="form-control" name="mail' + counter + '"/></td>';
                // cols += '<td><input type="text" class="form-control" name="phone' + counter + '"/></td>';

                cols += '<td><input type="button" class="ibtnDel btn btn-md btn-danger "  value="Delete"></td>';
                newRow.append(cols);
                // if (counter == 4) $('#addrow').attr('disabled', true).prop('value', "You've reached the limit");
                $("table.order-list").append(newRow);
                counter++;

                $("#toggle-fold-aside-button").trigger('click');
                
                $('.toggle-source-preview').on('click', function ()
                {
                    $(this).parents('.example').toggleClass('show-source');
                });
            });

            $("table.order-list").on("change", 'input[name^="price"]', function (event) {
                calculateRow($(this).closest("tr"));
                calculateGrandTotal();
            });


            $("table.order-list").on("click", ".ibtnDel", function (event) {
                $(this).closest("tr").remove();
                calculateGrandTotal();

                counter -= 1
                $('.add-btn').attr('disabled', false).prop('value', "Add Question");
            });


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