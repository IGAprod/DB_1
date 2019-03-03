// Global variables
var id_name;
// End

$(document).ready(function() {



    $("#go").click(function (event) {
        event.preventDefault();



        alert("helo");
        var question = "alter table " +  document.getElementById("dbtablelist").value + " change " + document.getElementById("select_table").value + " " +  $("#EnterQuery123").val() + " varchar(255) ";
        alert(question);
        alert("123123");
        query(question);

    });

    function columns() {


        temp  = "";
        $('#viewtable tr').each(function(i, tr) {
            var lines = $('td', tr).map(function(j, td){

                //    alert($(td).text() + i + j);
                if(i == 0 && j!=0){
                    temp += "<option value = '" +$(td).text() + "'>" + $(td).text() + "</option>";
                }else{
                    mark = 1;
                    return false;
                }
            })

            if(mark == 1) return false;
        });

        //alert(temp)
        document.getElementById('select_table').innerHTML = temp;

    }


    $("#delete_row_btn").click(function(event){
        event.preventDefault();
        deleteRow();
        tableupdate();
    });


    $("#delete_column_btn").click(function(event){
        event.preventDefault();
        deleteColumn();
        tableupdate();
    });


    $("#insertTab").click(function(event){
        event.preventDefault();
        insert();
        columns();
        addColumn();
    });


    $("#createTable").click(function(event){
        event.preventDefault();
        createNewTable();
        updateList();
    });


    $("#deleteTable").click(function(event){
        event.preventDefault();
        deleteTable();
        updateList();
    });


    function deleteTable(){

        var question = "DROP TABLE " + document.getElementById("dbtablelist").value;
        query(question);
    }


    $("#addColumnButton").click(function (event) {
        event.preventDefault();

        var question = "ALTER TABLE `" + document.getElementById("dbtablelist").value + "`  ADD ";

        var obj=document.querySelectorAll('#addColumn input');

        var id = "";
        var count = 0;

        for (var i=0; i<obj.length; i++) {


            if(i == 0){
                question += "`" + obj[i].value + "` ";
            }else{
                question += obj[i].value;

            }

        }

        alert(question);
        query(question);
        sleep(100);
        tableupdate();
        sleep(100);

    })


    $("#insertButton").click(function(event){
        event.preventDefault();

        var m = document.getElementById('viewtable').rows[0].cells.length;

        var question = "insert into " + document.getElementById("dbtablelist").value + " (";


        $('#viewtable tr').each(function(i, tr) {
            var lines = $('td', tr).map(function(j, td){

                //    alert($(td).text() + i + j);
                if(i == 0 && j == 1){

                    question +=$(td).text();
                }

                if(i == 0 && j!=0 && j!=1){
                    question += ", " + $(td).text();
                }else{
                    mark = 1;
                    return false;
                }
            })

            if(mark == 1) return false;
        });


        question  += ") values "

        var obj=document.querySelectorAll('#insertTable input');
        var id = "";
        var count = 0;

        for (var i=0; i<obj.length; i++) {


            if (i == 0) {

                question += "('" + obj[i].value + "'";
            }
            else{

                question += ",'" + obj[i].value + "'";
            }

        }

        question  += ")";


        query(question);

        sleep(100);

        tableupdate();

        sleep(100);

    });


        $("#dbtablelist").change(function(event){
            event.preventDefault();
            sleep(150);
            ajaxPost();
            sleep(80);
            ajaxView();
            sleep(80);
            deleteRowView();
            sleep(80);
            deleteColumnView();
            sleep(80);
            edit();
            sleep(150);
            //   save();
    });


    function tableupdate() {

        var question = "select * from " + document.getElementById("dbtablelist").value;
        alert(question);
        sleep(150);
        query(question);
        sleep(300);
        ajaxView();
        sleep(150);
        deleteRowView();
        sleep(80);
        deleteColumnView();
        sleep(80);
        edit();
        sleep(80);

    }

    function deleteColumn() {


        var src = "alter table " + document.getElementById("dbtablelist").value + " drop " + $("#delete_column").val();
        alert(src);
        query(src);
        sleep(150);

        deleteColumnView()
        sleep(150);
        $('#delete_row_btn').blur();
    }



    function deleteRow() {

        alert("Row deleted");
        alert($("#delete_row").val());

        var src = "delete from " + document.getElementById("dbtablelist").value + " where " + id_name + "=" + $("#delete_row").val();
        alert(src);
        query(src);
        sleep(150);
        deleteRowView()
        sleep(150);
        $('#delete_row_btn').blur();
    }

    function deleteColumnView() {


        $.ajax({
            type: "GET",
            url: "http://localhost:8080/api/column_name",
            success: function (result) {
                if(result.status == "Done") {

                    var temp1 = "";
                    $.each(result.data, function (i, person) {

                        if (i != 0 && i!=1) {

                            temp1 += "<option value = '" + person + "'>" + person + "</option>";
                        }

                    });

                    document.getElementById('delete_column').innerHTML = temp1;
                    //   document.write('</table></div>');
                    console.log("Success: ", result);
                }
                else{
                    $("#delete_row").html("<strong>Error</strong>");
                    console.log("Fail: ", result);
                }
            },

            error : function (e) {
              alert("error1123123");
            }
        });

    }

    function deleteRowView() {
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/api/id",
            success: function (result) {
                if(result.status == "Done") {

                    var temp = "";
                    $.each(result.data, function (i, person) {

                        if(i == 0){
                            id_name = person;
                        }

                        if (i != 0) {

                            temp += "<option value = '" + person + "'>" + person + "</option>";
                        }

                        //     $('#getResultDiv .list-group').append(temp)
                        //$('#getAllPersonId').remove();

                    });

                    document.getElementById('delete_row').innerHTML = temp;
                    //   document.write('</table></div>');
                    console.log("Success: ", result);
                }
                else{
                    $("#delete_row").html("<strong>Error</strong>");
                    console.log("Fail: ", result);
                }
            },

            error : function (e) {
                $("#delete_row").html("<strong>Error</strong>");
                console.log("ERROR",e);
            }
        });
    }

    function  createNewTable() {

        var getName = document.getElementById('newTableName').value;

        var question = "CREATE TABLE " + "`" + getName + "`" + " (";


        var obj=document.querySelectorAll('#createNewTable input');
        var id = "";
        var count = 0;

        for (var i=0; i<obj.length; i++) {


            if(obj[i].value == ""){
                alert("hello");
                break;
            }


            if(count == 0 && i == 0){

                question += obj[i].value + " ";
                id = obj[i].value;
            }


            if(count == 0 && i!=0)
                question += obj[i].value + " ";

            if(count == 1)
                question += obj[i].value;

            if(count == 2 && i ==2)
                question +="(" + obj[i].value + ")" + " AUTO_INCREMENT NOT NULL, "
            else{

                if(count == 2 )
                    question +="(" + obj[i].value + ")" + " NOT NULL, "
            }


            count++;
            if(count == 3) count = 0;


        };

        question +="PRIMARY KEY(" + id + "))";

        alert(question);

        alert("stranno");
        query(question);
        sleep(80);
        sleep(300);
    }


    function updateList() {
        $.ajax({
            type: "GET",
            url:  "http://localhost:8080/api/tablelist",
            success: function (result) {
                if(result.status == "Done"){
                    var personList = "";
                    //var table = document.createElement('table');
                    //document.write('<div className="tracks-table"><table className="table">');
                    var temp;
                    $.each(result.data,function (i,person) {

                        if(i != 0 ){

                            temp += "<option value = '" + person + "'>" + person + "</option>";
                        }

                        //     $('#getResultDiv .list-group').append(temp)
                        //$('#getAllPersonId').remove();

                    });

                    //alert(temp)
                    document.getElementById('dbtablelist').innerHTML = temp;
                    //   document.write('</table></div>');
                    console.log("Success: ", result);
                }else{
                    $("#view").html("<strong>Error</strong>");
                    console.log("Fail: ", result);
                }
            },
            error : function (e) {
                $("#view").html("<strong>Error</strong>");
                console.log("ERROR",e);
            }
        });
    }


    function query(question) {


        var formData = {
            query : question
        }

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:8080/api/data",
            data: JSON.stringify(formData),
            dataType: 'json',
            error: function (e) {
                alert("Error!")
                console.log("ERROR: ", e);
            }
        })
    }


    function save() {

        var n = document.getElementById('viewtable').rows.length;
        var m = document.getElementById('viewtable').rows[0].cells.length;

        var mas = new Array(n);

        for (var i = 0; i < mas.length; i++) {
            mas[i] = new Array(m);
        }

  //      alert(n,m);

        var src = "truncate table " +  document.getElementById("dbtablelist").value;

  //      alert(src);
        query(src);

        var question = "insert into " + document.getElementById("dbtablelist").value + "("

        var mark = 0;
    $('#viewtable tr').each(function(i, tr) {
            var lines = $('td', tr).map(function(j, td){


            //    alert($(td).text() + i + j);
                if(i == 0 && j !=0){

                    if(j == m - 1){

                        question += $(td).text();
                    }
                    else{
                        question += $(td).text() + ",";
                    }
                }


            if(i !=0 && j!=0)
                {

                    if(i == 1 && j == 1)
                    {
                        question += ") values";
                        question += "('" + $(td).text() + "'";
                    }
                    else {

                        if(i !=1 && j == 1){

                            question += ",('" + $(td).text() + "'";
                        }
                        else {

                            question += ",'" + $(td).text() + "'";
                        }
                    }
                }

                if(i !=0 && j == m - 1){
                    question += ")";
                }
            })


        });

      //      alert(question);
            sleep(300);
            query(question);

//            question +="')";
//            alert(question);

    }



    function edit() {

        $(function()	{
            $('td').click(function(e)	{
                //ловим элемент, по которому кликнули
                var t = e.target || e.srcElement;
                //получаем название тега
                var elm_name = t.tagName.toLowerCase();
                //если это инпут - ничего не делаем
                if(elm_name == 'input')	{return false;}
                var val = $(this).html();
                var code = '<input type="text" id="edit" value="'+val+'" />';
                $(this).empty().append(code);
                $('#edit').focus();
                $('#edit').blur(function()	{
                    var val = $(this).val();
                    $(this).parent().empty().html(val);
                    save();
                })
            });
        });


        $(window).keydown(function(event){
            //ловим событие нажатия

            if(event.keyCode == 13) {	//если это Enter
                $('#edit').blur();	//снимаем фокус с поля
            }
        });

    }


    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
                break;
            }
        }
    }


    function addColumn() {

        var insertHTML = "  <table id='addColumn'  border='2' align='left' width='80%' class='table'  >\n"
        insertHTML +=   "<tr>  <td width='80'><input type='text' name='addColumnName' value='' class='filterInput'></td> ";
        insertHTML +=   "<td width='80'><input type='text' name='addColumnType' value='' class='filterInput'></td>";
        insertHTML +=   "</tr></table>";

        document.getElementById('addColumnDiv').innerHTML = insertHTML;

    }

    function insert() {

        var mark = 0;
        var count = 0;

        var insertHTML = "<table id='insertTable'  border='2' align='left' width='80%' class='table'  > <tr>";
        var temp = "<tr>";

        $('#viewtable tr').each(function(i, tr) {
            var lines = $('td', tr).map(function(j, td){

                //    alert($(td).text() + i + j);
                if(i == 0 && j!=0){
                    insertHTML += "<td>" + $(td).text() + "</td>";
                    temp +=   "<td width='80'><input type='text' name=" + $(td).text() + "value='' class='filterInput'></td>";
                    count++;
                }else{
                    mark = 1;
                    return false;
                }
            })

            if(mark == 1) return false;
        });

        insertHTML +="</tr> <tr>";
        temp +="</tr>";
        insertHTML += temp;


        insertHTML+= "</table>";
     //   alert(insertHTML);
        document.getElementById('insertDiv').innerHTML = insertHTML;

    }

    function ajaxView() {
        $.ajax({
            type: "GET",
            url:  "http://localhost:8080/api/data",
            success: function (result) {
                if(result.status == "Done"){
                    var personList = "";
                    //var table = document.createElement('table');
                    //document.write('<div className="tracks-table"><table className="table">');
                    var temp = "<table id='viewtable' border='2' align='left' width='80%' class='table' >";
                    $.each(result.data,function (i,person) {
                        temp += "<tr>";
                        for(var  i = 0; i < person.length; i++){

                            temp += "<td>" + person[i] + "</td>";
                        }
                        temp +="</tr>";


                        //     $('#getResultDiv .list-group').append(temp)
                        //$('#getAllPersonId').remove();
                    });

                    //alert(temp)
                    temp += "</table>";
                    document.getElementById('pod_view').innerHTML = temp;
                    //   document.write('</table></div>');
           //         alert(document.getElementById('viewtable').rows.length)
           //         alert(document.getElementById('viewtable').rows[0].cells.length);
                    console.log("Success: ", result);
                }else{
                    $("#view").html("<strong>Error</strong>");
                    console.log("Fail: ", result);
                }
            },
            error : function (e) {
                $("#view").html("<strong>Error</strong>");
                console.log("ERROR",e);
            }
        });

    }



    function ajaxPost() {

        var selectedValue = document.getElementById("dbtablelist").value;

        var formData = {
            query : selectedValue
        }

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:8080/api/changedb",
            data: JSON.stringify(formData),
            dataType: 'json',
            error: function (e) {
                alert("Error!")
                console.log("ERROR: ", e);
            }
        })
    }
})