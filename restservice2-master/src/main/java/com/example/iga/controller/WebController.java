package com.example.iga.controller;

import java.io.IOException;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import com.example.iga.Entity.Person;
import com.example.iga.Entity.Response;
import com.example.iga.Repository.PersonRepo;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;


import java.util.Iterator;
import java.util.List;

@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class WebController {

    @Autowired
    private PersonRepo personRepo;

 //   private int counter = 4;


    public String req = null;
    public List<String[]> list = new ArrayList<String[]>();
    private String db = "123";
    private String table = "student";


    private String []  getColumnName(){

        Connection connection = getConnection();
        Statement statement = null;
        ResultSet rs = null;
        try{
            statement = connection.createStatement();
            req = "select * from " + table;
            rs = statement.executeQuery(req);
            ResultSetMetaData rsmd = rs.getMetaData();

            int colCount = rs.getMetaData().getColumnCount();
            String[] colum_name = new String[colCount];
            StringBuilder string_temper = new StringBuilder();

            for(int i = 1; i <=colCount; i++){

                string_temper.append(rsmd.getColumnName(i));
                String str = string_temper.toString();
                System.out.println(str);
                colum_name[i-1] = str;
                string_temper = new StringBuilder();
            }

            statement.close();
            connection.close();

            return colum_name;
        }
        catch (Exception e){
            System.out.println("Zdes");
            System.out.println(e.getMessage());
            return null;
        }
    }

    private Connection getConnection()
        {
            Connection connection = null;
         //   String URL = "jdbc:postgresql://localhost:5432/123";
            String URL = "jdbc:mysql://localhost:3307/" + db;
         //   String User = "postgres";
            String User = "root";
            String Password = "root";
            try {
             //   Class.forName("org.postgresql.Driver");
                Class.forName("com.mysql.jdbc.Driver");
                connection = DriverManager.getConnection(URL, User, Password);
                return connection;
            }
        catch (Exception e)
            {
                System.out.println(e.getMessage());
                System.out.println("Zdes21414141");
            }
            return connection;
    }




    private Response DataPred()
    {
        Connection connection = getConnection();
        Statement statement = null;
        Boolean rs = null;
        try{
            statement = connection.createStatement();
            rs = statement.execute(req);

            Response response = new Response("DONE","DONE");
            return response;
        }
        catch (Exception e){
            System.out.println("Zdes");
            System.out.println(e.getMessage());
            Response response = new Response("NOT", e.getMessage());
            return response;

        }
    }


    private Response Data()
    {
        list.clear();
        Connection connection = getConnection();
        Statement statement = null;
        ResultSet rs = null;
        try{
            statement = connection.createStatement();
            rs = statement.executeQuery(req);
            ResultSetMetaData rsmd = rs.getMetaData();

            int colCount = rs.getMetaData().getColumnCount();
            String[] temp_array = new String[colCount];
            StringBuilder string_temp = new StringBuilder();

            for(int i = 1; i <=colCount; i++){

                string_temp.append(rsmd.getColumnName(i));
                String str = string_temp.toString();
                System.out.println(str);
                temp_array[i-1] = str;
                string_temp = new StringBuilder();

            }
            list.add(temp_array);
            for(int i = 0 ; i < list.size(); i++){

                String [] temp = list.get(i);
                for(int j = 0; j < temp.length; j++){
                    System.out.println(temp[j]);
                }
            }

            while (rs.next())
            {
                StringBuilder stringBuilder = new StringBuilder();
                int numColumns = rs.getMetaData().getColumnCount();
                String[] key_array = new String[numColumns];

                for ( int i = 1 ; i <= numColumns ; i++ ) {

                    Object obj = rs.getObject(i);
                    stringBuilder.append( (obj != null) ? obj.toString() : "null");
                    String str = stringBuilder.toString();
                    key_array[i-1] = str;
                    stringBuilder = new StringBuilder();
                }

                list.add(key_array);
            }

     //       for(int i = 0 ; i < list.size(); i++){

    //            String [] temp = list.get(i);
     //           for(int j =0 ; j < temp.length; j++)
     //           {
     //               System.out.println(temp[j]);

      //          }
       //     }

            statement.close();
            connection.close();
            Response response = new Response("DONE","DONE");
            return response;
        }
        catch (Exception e){
            System.out.println("Zdes");
            System.out.println(e.getMessage());
            Response response = new Response("NOT", e.getMessage());
            return response;

        }
    }

    @GetMapping(value = "/column_name")
    public Response nameOfColumn(){

        String [] colum_name = getColumnName();

        req = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS  WHERE TABLE_NAME = '" + table + "'";
        Response temp_response = Data();


        if(temp_response.getStatus() == "NOT")
        {
            return temp_response;
        }
        Response response = new Response("Done",list);
        return response;


    }


    @GetMapping(value = "/id")
    public Response id(){

        String [] colum_name = getColumnName();

        req = "select " + colum_name[0] + " from " + table;
        Response temp_response = Data();

        if(temp_response.getStatus() == "NOT")
        {
            return temp_response;
        }
        Response response = new Response("Done",list);
        return response;

    }


    @GetMapping(value = "/tablelist")
    public Response tableList(){

        req = "SELECT TABLE_NAME FROM `INFORMATION_SCHEMA`.`TABLES` WHERE `TABLE_SCHEMA` = 123";
        Response temp_response = Data();
        if(temp_response.getStatus() == "NOT")
        {
            return temp_response;
        }
        Response response = new Response("Done",list);
        return response;
    }

    @GetMapping(value = "/data")
    public Response List() {

   //     Response temp_response = Data();
  //      if(temp_response.getStatus() == "NOT")
 //       {
  //          return temp_response;
  //      }
      //  req = "select* from student";
        if(req == null){
            req = "select* from student";
            //req = "show databases";
         //   req = "SELECT TABLE_NAME FROM `INFORMATION_SCHEMA`.`TABLES` WHERE `TABLE_SCHEMA`= 123";
         //   req = "SELECT TABLE_NAME FROM `INFORMATION_SCHEMA`.`TABLES` WHERE `TABLE_SCHEMA` = 123 ";
            Response temp_response = Data();
            if(temp_response.getStatus() == "NOT")
            {
                System.out.println(req);
                return temp_response;
            }
        }

        System.out.println("zdes");

        Response response = new Response("Done",list);
        return response;
    //    return list;
    }

    @PostMapping("/createView")
    public Response createView(@RequestBody String value1) throws IOException{

        String value = value1.substring(10,value1.length()-2);
        req = value;

        Response temp_response = DataPred();
        if(temp_response.getStatus() == "NOT")
        {
            return temp_response;
        }
        Response response = new Response("Done", value);
        return response;
    }


    @PostMapping("/viewpred")
    public Response viewPred(@RequestBody String value1) throws IOException{

        String value = value1.substring(10,value1.length()-2);
        req = value;

        Response temp_response = Data();
        if(temp_response.getStatus() == "NOT")
        {
            return temp_response;
        }
        Response response = new Response("Done", value);
        return response;
    }


    @PostMapping("/changedb")
    public Response ChangeBd(@RequestBody String value1) throws IOException{

        String value = value1.substring(10,value1.length()-2);
        table = value;
        req = "Select * from " + table;


        Response temp_response = Data();
        if(temp_response.getStatus() == "NOT")
        {
            System.out.println("213412423423");
            return temp_response;
        }
        Response response = new Response("Done", value);
        return response;
    }


    @PostMapping("/data")
        public Response Request(@RequestBody String request1) throws IOException {
            Connection connection = getConnection();
            Statement statement = null;
            ResultSet rs = null;
            final char dm = (char) 34;

            String request = request1.substring(10,request1.length()-2);
            System.out.println("hello");
            System.out.println(request);
            //String request = request2.substring(request2.length()-2,request2.length()-1);
            // request.substring(request.length()-2,request.length()-1);
          //  System.out.println(request);

     //   request = request.replaceAll("\\{" + dm + "text"+dm+":"+dm,"");
     //   System.out.println(request);
     //   request = request.replaceAll(";" + dm + "}" , ";");
     //   System.out.println(request);


        if (request.indexOf("select") == -1) {
            try {
                statement = connection.createStatement();
                statement.execute(request);
                statement.close();
                connection.close();
            } catch (Exception e) {
                System.out.println("hello222");
                System.out.println(e.getMessage());
                Response response = new Response("NOT", e.getMessage());
                return response;
            }
        }
        else {
            req = request;
            Response temp_response = Data();
            if(temp_response.getStatus() == "NOT")
            {
                return temp_response;
            }
          //  request = list.get(list.size() - 1).toString();
        }
        Response response = new Response("Done", request);
        return response;
    //    return request;
    }


    @GetMapping(value = "/all")
    public Response getResource(){
        Response response = new Response("Done",personRepo.getAll());
        return response;
    }

    @PutMapping("/query1")
    public Response query1(@RequestBody JSONObject query1) {

        String query = "";
        try {

            JSONArray array = new JSONArray(query1);
            System.out.println("Hello");
            if(array != null){
                for(int i = 0; i < array.length(); i++){
                    JSONObject jsonObject = array.getJSONObject(i);
                    if(jsonObject!=null){
                        query = jsonObject.getString("query");
                    }
                }
            }

            Response response = new Response("Done", personRepo.query(query));

         //   System.out.println("Hello_1");
         //   JSONArray jsonArray = new JSONArray(query1);
         //   System.out.println("Hello_2");
         //   JSONObject jsonObject = jsonArray.getJSONObject(0);
         //   System.out.println("Hello_3");
         //   String query2 = query1.getString("query");
         //   System.out.println(query2);

       //     Response response = new Response("Done", personRepo.query(query2));
       //     return response;

           // System.out.println("hello_1");
            //String temp_query = innerObject.getString("query");
            //System.out.println("hello_2");
            //Response response = new Response("Done", personRepo.query(temp_query));
            //return response;

        } catch (JSONException e) {
            System.out.println("Error, hz kakoi");
            // Do something to recover ... or kill the app.
        }

        Response response2 = new Response();
        return  response2;
      //  Response response = new Response("Done", personRepo.query(query));
      //  return response;
    }

    @GetMapping("/countries")
    public List<Person> getAllCountries() {
        return personRepo.getAll();
    }

    @GetMapping("/countries/{countryId}")
    public Person getCountryById(@PathVariable("countryId") int id) {
        return personRepo.getById(id);
    }

    @PostMapping("/countries")
    @ResponseStatus(HttpStatus.CREATED)
    public Person createCountry(@RequestBody Person country) {
        return personRepo.create(country);
    }

    @PutMapping("/countries/{countryId}")
    public Person updateCountry(@PathVariable("countryId") int id, @RequestBody Person country) {
        return personRepo.update(id, country);
    }

    @DeleteMapping("/countries/{countryId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCountry(@PathVariable("countryId") int id) {
        personRepo.delete(id);
    }
}




