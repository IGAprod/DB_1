
$(document).ready(function(){

    alert("HELLO");
    ajaxGet();

    function ajaxGet() {
        $.ajax({
            type: "GET",
            url:  "http://localhost:8080/api/data",
            success: function (result) {
                if(result.status == "Done"){
                    var personList = "";
                    //var table = document.createElement('table');
                    //document.write('<div className="tracks-table"><table className="table">');
                    var temp = "<table  border='2' align='left' width='80%' class='table' >";
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
                    document.getElementById('view').innerHTML = temp;
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
})

