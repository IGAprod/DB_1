

$(document).ready(function () {
    $("#customerForm").submit(function(event) {
   //     alert("Poka ok");
        event.preventDefault();
        ajaxPost();
    });

    function ajaxPost() {

        var formData = {
            query : $("#EnterQuery").val()
        }

        $.ajax({
           type: "POST",
            contentType: "application/json",
            url: "http://localhost:8080/api/data",
            data: JSON.stringify(formData),
            dataType: 'json',
            success: function(result){
               if(result.status == "Done"){
                   $("#postResultDiv").html("<p style='background-color:#7FA7B0; color:white;  padding:20px 20px 20px 20px'>" +
                                              "Query completed successfully <br>" + "</p>");
               }
               else{
                   $("#postResultDiv").html("<p style='background-color:#7FA7B0; color:white; padding:20px 20px 20px 20px'>" +
                       result.data + "<br>" + "</p>");

               }
               console.log(result);
            },
            error: function (e) {
               alert("Error!")
                console.log("ERROR: ", e);
            }
        });

        resetData();
    }

    function resetData() {
        $("#EnterQuery").val("");
    }
})