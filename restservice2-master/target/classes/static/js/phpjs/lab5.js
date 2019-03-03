

function resetData() {
    $("#EnterQuery").val("");
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

function update() {

    var query_view = "SELECT `TABLE_NAME`,`VIEW_DEFINITION` FROM `INFORMATION_SCHEMA`.`VIEWS`";

    var formData = {
        query : query_view
    }

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8080/api/viewpred",
        data: JSON.stringify(formData),
        dataType: 'json',
        error: function (e) {
            alert("Error!update")
            console.log("ERROR: ", e);
        }
    })
}

function updateTable() {

    update();
    sleep(250);
    ajaxView();
    sleep(200)
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
                var temp = "<table id='pred' border='2' align='left' width='80%' class='table' >";
                $.each(result.data,function (i,person) {
                    temp += "<tr>";
                    for(var  j = 0; j < person.length; j++){



                        temp += "<td>" + person[j] + "</td>";

                        if(j == 0 && i == 0){

                            temp += "<td>Удаление</td>";
                        }


                        if(j == 0 && i !=0){

                            temp += "<td><a href='#' onClick='select_view=\"" + person[j] + "\"; remove_view();'>Удалить</a></td>";
                            //   alert("<td><a href='#' onClick='select_view= '" + person[j] + "'; remove_view();'>Удалить</a></td>");
                        }

                        //    temp += "<td><a href='#' onClick='" + "; remove_view();'>Удалить</a></td>";
                        //    temp += "<td><a href='#' onClick='select_view=" + person[i] + "; remove_view();'>Удалить</a></td>";
                    }

                    temp +="</tr>";


                    //     $('#getResultDiv .list-group').append(temp)
                    //$('#getAllPersonId').remove();
                });

                //alert(temp)
                temp += "</table>";
                document.getElementById('view').innerHTML = temp;
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


function query(question) {


    var formData = {
        query : question
    }

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8080/api/createView",
        data: JSON.stringify(formData),
        dataType: 'json',
        error: function (e) {
            alert("Error!query")
            console.log("ERROR: ", e);
        }
    })
}


function addPred(){

    var question =  $("#EnterQuery").val();
    alert(question);
    sleep(200);
    query(question);
    sleep(200);


}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var select_view ="";

function remove_view() {

    alert(select_view);
    var deleteView = 'DROP VIEW ' + select_view;
    sleep(200);
    query(deleteView);
    sleep(200);
    updateTable();
    sleep(200);
    resetData();
    sleep(200);

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function() {

    sleep(800);

    $("#customerForm").submit(function(event) {
        event.preventDefault();
        sleep(100);
        addPred();
        sleep(200);
        updateTable();
        sleep(200);
        resetData();
        sleep(200);

    });

    updateTable();
    sleep(100);


})
