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
    public class UserController : ApiController
    {
        // GET: api/User
        [HttpGet]
        [Route("api/User")]
        public bool Get(string password, string email)
        {
            try
            {
                bool connection = false;

                MongoClient dbClient = new MongoClient("mongodb+srv://tal:tal54321@cluster-tal.hdscb.mongodb.net/db_ls?retryWrites=true&w=majority");
                var database = dbClient.GetDatabase("db_ls");
                var collection = database.GetCollection<BsonDocument>("User");

                var documents = collection.Find(new BsonDocument()).ToList();
                var filter = Builders<BsonDocument>.Filter.Eq("Email", email) & Builders<BsonDocument>.Filter.Eq("Password", password);
                var doc = collection.Find(filter).FirstOrDefault();

                if (doc != null)
                {
                    connection = true;
                }


                return connection;
            }
            catch (Exception)
            {
                return false;
            }
        }


        // POST: api/User
        [HttpPost]
        [Route("api/User")]
        public void Post([FromBody]User u)
        {
            try
            {
                MongoClient dbClient = new MongoClient("mongodb+srv://tal:tal54321@cluster-tal.hdscb.mongodb.net/db_ls?retryWrites=true&w=majority");
                var database = dbClient.GetDatabase("db_ls");
                var collection = database.GetCollection<BsonDocument>("User");

                var document = new BsonDocument {
                { "Email", u.Email },
                { "FirstName", u.FirstName } ,
                { "LastName", u.LastName },
                { "Password", u.Password },
               };

                collection.InsertOne(document);
            }
            catch (Exception ex)
            {

            }





        }


    }
}
