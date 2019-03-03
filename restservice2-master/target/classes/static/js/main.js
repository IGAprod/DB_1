
$(document).ready(function(){
    $("#getAllPersonId").click(function(event){
        event.preventDefault();
        ajaxGet();
        //    alert( "Handler for .click() called." );

    });


    function ajaxGet() {
        $.ajax({
            type: "GET",
            url:  "http://localhost:8080/api/data",
            success: function (result) {
                if(result.status == "Done"){
                    $('#getResultDiv ul').empty();
                    var personList = "";
                    //var table = document.createElement('table');
                    //document.write('<div className="tracks-table"><table className="table">');
                    var temp = "<table border='2' align='left' width='80%'>";
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
                    document.getElementById('getResultDiv1').innerHTML = temp;
                 //   document.write('</table></div>');
                    console.log("Success: ", result);
                }else{
                    $("#getResultDiv").html("<strong>Error</strong>");
                    console.log("Fail: ", result);
                }
            },
            error : function (e) {
                $("#getResultDiv").html("<strong>Error</strong>");
                console.log("ERROR",e);
            }
        });
    }
})

