$(document).ready(function () {
    $("#SELECT").click(function (event) {
        event.preventDefault();
        select();
    });

    function select(){
        document.getElementById('EnterQuery').value = "select * from";
    }

    $("#INSERT").click(function (event) {
        event.preventDefault();
        insert();
    });

    function insert(){
        document.getElementById('EnterQuery').value = "insert into";
    }

    $("#UPDATE").click(function (event) {
        event.preventDefault();
        update();
    });

    function  update() {
        document.getElementById('EnterQuery').value = "update    set    where";
    }

    $("#DELETE").click(function (event) {
        event.preventDefault();
        fdelete();
    });

    function  fdelete() {
        document.getElementById('EnterQuery').value = "delete from  where";
    }

    $("#ALTER").click(function (event) {
        event.preventDefault();
        alter();
    });

    function alter(){
        document.getElementById('EnterQuery').value = "alter";
    }


    $("#RENAME").click(function (event) {
        event.preventDefault();
        rename();
    });

    function rename(){
        document.getElementById('EnterQuery').value = "rename table";
    }


    $("#DROP").click(function (event) {
        event.preventDefault();
        drop();
    });

    function drop(){
        document.getElementById('EnterQuery').value = "drop table";
    }

    $("#CREATE").click(function (event) {
        event.preventDefault();
        create();
    });

    function create(){
        document.getElementById('EnterQuery').value = "create table";
    }

    $("#TRUNCATE").click(function (event) {
        event.preventDefault();
        truncate();
    });

    function truncate(){
        document.getElementById('EnterQuery').value = "truncate table";
    }

})