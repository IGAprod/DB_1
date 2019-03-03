


function ajaxGet() {
    $.ajax({
        type: "GET",
        url:  "http://localhost:8080/api/tablelist",
        async : false,
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
                document.getElementById('select_table').innerHTML = temp;
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
        url: "http://localhost:8080/api/createView",
        data: JSON.stringify(formData),
        dataType: 'json',
        error: function (e) {
            alert("Error!query")
            console.log("ERROR: ", e);
        }
    })
}



////////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function() {

    ajaxGet();
    $("#go").click(function (event) {
        event.preventDefault();

        alert("helo");
        var question = "create trigger" +   " " + $("#EnterQuery").val() + " ";
        question += document.getElementById("select_time").value + " " + document.getElementById("select_event").value + " on ";
        question += document.getElementById("select_table").value  + " " + document.getElementById("select_each").value + " " + document.getElementById('area_body').value.replace(/\r?\n/g, "");
        alert(question);
        alert("123123");
        query(question);

    });


})