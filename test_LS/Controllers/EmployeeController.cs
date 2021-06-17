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

                //filter - טוב לעידכוןן לפי לקוח ספציפי
                //var filter = Builders<BsonDocument>.Filter.Eq("_id", "10006546");
                //var doc = collection.Find(filter).FirstOrDefault();


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
        public void Post([FromBody]Employee e)
        {
            try
            {
                
                MongoClient dbClient = new MongoClient("mongodb+srv://tal:tal54321@cluster-tal.hdscb.mongodb.net/db_ls?retryWrites=true&w=majority");
                var database = dbClient.GetDatabase("db_ls");
                var collection = database.GetCollection<BsonDocument>("Employees");

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

            }
            catch (Exception)
            {


            }

        }


        // PUT: api/Employee/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Employee/5
        public void Delete(int id)
        {
        }
    }
}
