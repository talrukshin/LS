using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using test_LS.Models;

namespace test_LS.Controllers
{
    public class EmployeeController : ApiController
    {
        // GET: api/Employee
        [HttpGet]
        [Route("api/Employee")]
        public IEnumerable<Employee> Get()
        {
            try
            {
                MongoClient dbClient = new MongoClient("mongodb+srv://tal:tal54321@cluster-tal.hdscb.mongodb.net/db_ls?retryWrites=true&w=majority");

                //get all collection
                var database = dbClient.GetDatabase("db_ls");
                var collection = database.GetCollection<Employee>("Employees");//BsonDocument
                var documents = collection.Find(new BsonDocument()).ToList();

                List<Employee> listEmployees = new List<Employee>();

                foreach (var item in documents)
                {
                    Employee e = new Employee();
                    e.Img = item.Img;
                    e.FirstName = item.FirstName;
                    e.LastName = item.LastName;
                    e.Phone = item.Phone;
                    e.Address = item.Address;
                    e.Roll = item.Roll;
                    e.StartDate = item.StartDate;

                    listEmployees.Add(e);
                }                          

                return listEmployees;
            }
            catch (Exception)
            {

                return null;
            }
        }



        [HttpPost]
        [Route("api/Employee")]
        // POST: api/Employee
        public bool Post([FromBody]Employee e)
        {
            try
            {
                MongoClient dbClient = new MongoClient("mongodb+srv://tal:tal54321@cluster-tal.hdscb.mongodb.net/db_ls?retryWrites=true&w=majority");
                var database = dbClient.GetDatabase("db_ls");
                var collection = database.GetCollection<BsonDocument>("Employees");

                var filter = Builders<BsonDocument>.Filter.Eq("Phone", e.Phone);
                var doc = collection.Find(filter).FirstOrDefault();
                if (doc== null)
                {
                    var document = new BsonDocument {
                        { "Img", e.Img },
                        { "FirstName", e.FirstName } ,
                        { "LastName", e.LastName },
                        { "Phone", e.Phone },
                        { "Address", e.Address },
                        { "Roll", e.Roll },
                        { "StartDate", DateTime.Today },
                    };
                    collection.InsertOne(document);

                    return true;

                }

                return false;

            }
            catch (Exception)
            {
                return false;
            }
        }

        [HttpPost]
        [Route("api/Employee/{phone}")]
        // POST: api/Employee
        public string Postdelete(string phone)
        {
            try
            {
                MongoClient dbClient = new MongoClient("mongodb+srv://tal:tal54321@cluster-tal.hdscb.mongodb.net/db_ls?retryWrites=true&w=majority");
                var database = dbClient.GetDatabase("db_ls");
                var collection = database.GetCollection<BsonDocument>("Employees");
                
                var deleteFilter = Builders<BsonDocument>.Filter.Eq("Phone", phone);
                collection.DeleteOne(deleteFilter);
                return phone;
            }
            catch (Exception)
            {
                return "Server error";
            }

        }


        [HttpPost]
        [Route("api/Employee/{phone}/{FirstName}/{LastName}/{Address}")]
        // POST: api/Employee
        public void PostUpdate(string phone, string FirstName, string LastName, string Address)
        {
            try
            {
                MongoClient dbClient = new MongoClient("mongodb+srv://tal:tal54321@cluster-tal.hdscb.mongodb.net/db_ls?retryWrites=true&w=majority");
                var database = dbClient.GetDatabase("db_ls");
                var collection = database.GetCollection<BsonDocument>("Employees");

                var filter = Builders<BsonDocument>.Filter.Eq("Phone", phone);

                var update = Builders<BsonDocument>.Update.Set("FirstName", FirstName).Set("LastName", LastName).Set("Address", Address);

                collection.UpdateOne(filter, update);

               
            }
            catch (Exception)
            {
              
            }

        }




    }
}
