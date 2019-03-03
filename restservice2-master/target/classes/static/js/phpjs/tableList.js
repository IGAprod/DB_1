
$(document).ready(function(){

    ajaxGet();


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

})

