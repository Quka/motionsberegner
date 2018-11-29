using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using MotionsberegnerRestService.Model;

namespace MotionsberegnerRestService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        public static int nextId = 0;

        // Connection/stien til hvor databasen med tabellerne findes
        //private const string conn = "Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=RestCustomerDB;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";
        private const string conn = "Server=tcp:motionsberegner.database.windows.net,1433;Initial Catalog=profileDB;Persist Security Info=False;User ID=shabz;Password=Password123;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

        //private static List<Profile> pList = new List<Profile>()
        //{
        //    new Profile(0, "Michael", "Kejser", 1961),
        //    new Profile(1, "Ebbe", "Flod", 1968),
        //    new Profile(2, "Peter", "Kanin", 1958),
        //    new Profile(3, "Anders", "And", 1931),
        //    new Profile(4, "Søren", "Kierkegaard", 1958),
        //    new Profile(5, "King", "Khan", 1975)
        //};

        // GET: api/Profile/5
        [HttpGet]
        public List<Profile> GetAllProfiles()
        {
            //return pList;

            //NEDENFOR ER KODE TIL AT HENTE PROFILER FRA EN TABEL I EN DATABASE FRA STIEN SKREVET IND LÆNGERE OPPE(conn).

            var result = new List<Profile>();

            string sql = "SELECT id, firstname, lastname, birthday FROM profil "; //SQL Command

            using (SqlConnection databaseConnection = new SqlConnection(conn))
            {
                databaseConnection.Open();

                using (SqlCommand selectCommand = new SqlCommand(sql, databaseConnection))
                {
                    using (SqlDataReader reader = selectCommand.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            while (reader.Read())
                            {
                                int id = reader.GetInt32(0);
                                string firstname = reader.GetString(1);
                                string lastname = reader.GetString(2);
                                DateTime birthday = reader.GetDateTime(3);

                                var profile = new Profile()
                                {
                                    ID = id,
                                    FirstName = firstname,
                                    LastName = lastname,
                                    Birthday = birthday
                                };

                                result.Add(profile);
                            }

                        }
                    }
                }
            }

            return result;

        }

        // GET: api/Profile/5
        [HttpGet("{id}", Name = "Get")]
        public Profile GetOneProfile(int ID)
        {
            Response.StatusCode = (int)HttpStatusCode.OK; //200  The message for the HttpResponse action

            string sql = "SELECT * FROM profil WHERE id=" + ID; //SQL Command

            Profile profil = null;

            using (SqlConnection databaseConnection = new SqlConnection(conn))
            {
                databaseConnection.Open();

                using (SqlCommand selectCommand = new SqlCommand(sql, databaseConnection))
                {
                    using (SqlDataReader reader = selectCommand.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            while (reader.Read())
                            {
                                int id = reader.GetInt32(0);
                                string firstname = reader.GetString(1);
                                string lastname = reader.GetString(2);
                                DateTime birthday = reader.GetDateTime(3);

                                profil = new Profile()
                                {
                                    ID = id,
                                    FirstName = firstname,
                                    LastName = lastname,
                                    Birthday = birthday
                                };
                            }
                        }
                    }
                }
            }
            return profil;
        }

        // POST: api/Profile
        [HttpPost]
        public int InsertProfile([FromBody] Profile profile)
        {
            int insId = 0;

            string sql = "INSERT INTO profil(firstname, lastname, birthday) OUTPUT INSERTED.id VALUES(@firstname, @lastname, @birthday);"; //SQL Command - OUTPUT INSERTED.id udskriver den valgte kolonne 'id', fra den indsatte række.

            using (SqlConnection databaseConnection = new SqlConnection(conn))
            {
                databaseConnection.Open();

                using (SqlCommand cmd = new SqlCommand(sql, databaseConnection))
                {
                    cmd.Parameters.AddWithValue("@firstname", profile.FirstName); //@firstName er placeholder og bliver erstattet af 'customer.FirstName'
                    cmd.Parameters.AddWithValue("@lastname", profile.LastName);
                    cmd.Parameters.AddWithValue("@birthday", profile.Birthday);

                    insId = (int)cmd.ExecuteScalar(); //Tager kolonnen som bliver returneret i SQL Command (OUTPUT INSERTED.id) og indsætter som 'insId'
                }
            }

            return insId;
        }

        // PUT: api/Profile/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public int DeleteProfile(int id)
        {
            int delId = 0;

            string sql = "DELETE FROM profil OUTPUT DELETED.id WHERE id = @id;"; //SQL Command 

            using (SqlConnection databaseConnection = new SqlConnection(conn))
            {
                databaseConnection.Open();

                using (SqlCommand cmd = new SqlCommand(sql, databaseConnection))
                {
                    cmd.Parameters.AddWithValue("@id", id);

                    delId = (int)cmd.ExecuteScalar(); //Tager kolonnen som bliver returneret i SQL Command (OUTPUT DELETED.id) og indsætter som 'insId'
                }
            }
            return delId;
        }
    }
}
