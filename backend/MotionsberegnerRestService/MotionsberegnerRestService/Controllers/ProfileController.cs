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

        // GET: api/Profile
        [HttpGet]
        public List<Profile> GetAllProfiles()
        {
            //return pList;

            //NEDENFOR ER KODE TIL AT HENTE PROFILER FRA EN TABEL I EN DATABASE FRA STIEN SKREVET IND LÆNGERE OPPE(conn).

            List<Profile> result = new List<Profile>();

            string sql = "SELECT profil.id AS id, firstname, lastname, birthday, weight, height, stepData.id AS stepid, steps, logDate FROM profil " +
                         "FULL OUTER JOIN stepData ON profil.id = stepData.profileId"; //SQL Command
            

            using (SqlConnection databaseConnection = new SqlConnection(conn))
            {
                databaseConnection.Open();

                using (SqlCommand selectCommand = new SqlCommand(sql, databaseConnection))
                {
                    using (SqlDataReader reader = selectCommand.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            Profile profile = null;

                            while (reader.Read())
                            {

                                if (profile == null || profile.ID != reader.GetInt32(0))
                                {
                                    profile = new Profile(
                                        reader.GetInt32(0),
                                        reader.GetString(1),
                                        reader.GetString(2),
                                        reader.GetDateTime(3),
                                        reader.GetInt32(4),
                                        reader.GetInt32(5)
                                    );
                                }

                                if (!reader.IsDBNull(6) && !reader.IsDBNull(7) && !reader.IsDBNull(8))
                                {
                                    profile.Steps.Add(
                                        new StepData(reader.GetInt32(6), profile.ID, reader.GetInt32(7), reader.GetDateTime(8))
                                    );
                                }
                                if (!result.Exists(p => p.ID == profile.ID))
                                {
                                    result.Add(profile);
                                }
                                
                            }

                        }
                    }
                }
            }

            return result;
        }

        // GET: api/Profile/5
        [HttpGet("{id}", Name = "GetProfile")]
        public Profile GetOneProfile(int ID)
        {
            Response.StatusCode = (int)HttpStatusCode.OK; //200  The message for the HttpResponse action

            string sql = "SELECT profil.id AS id, firstname, lastname, birthday, weight, height, stepData.id AS stepid, steps, logDate FROM profil " +
                         "FULL OUTER JOIN stepData ON profil.id = stepData.profileId WHERE profil.id = " + ID; //SQL Command

            Profile profile = null;

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
                                if (profile == null)
                                {
                                    profile = new Profile(
                                        reader.GetInt32(0),
                                        reader.GetString(1),
                                        reader.GetString(2),
                                        reader.GetDateTime(3),
                                        reader.GetInt32(4),
                                        reader.GetInt32(5)
                                    );
                                }
                                
                                if (!reader.IsDBNull(6) && !reader.IsDBNull(7) && !reader.IsDBNull(8))
                                {
                                    profile.Steps.Add(
                                        new StepData(reader.GetInt32(4), profile.ID, reader.GetInt32(5), reader.GetDateTime(6))
                                    );
                                }
                                
                            }
                        }
                    }
                }
            }
            return profile;
        }

		// GET: api/Profile/username/name
		[HttpGet("username/{name}", Name = "GetProfileByName")]
		public Profile GetOneProfileByName(string name)
		{
			Response.StatusCode = (int)HttpStatusCode.OK; //200  The message for the HttpResponse action

			string sql = "SELECT profil.id AS id, firstname, lastname, birthday, weight, height, stepData.id AS stepid, steps, logDate FROM profil " +
						 "FULL OUTER JOIN stepData ON profil.id = stepData.profileId WHERE profil.firstname = '" + name + "'"; //SQL Command

			Profile profile = null;

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
								if (profile == null)
								{
									profile = new Profile(
										reader.GetInt32(0),
										reader.GetString(1),
										reader.GetString(2),
										reader.GetDateTime(3),
                                        reader.GetInt32(4),
                                        reader.GetInt32(5)
									);
								}

								if (!reader.IsDBNull(6) && !reader.IsDBNull(7) && !reader.IsDBNull(8))
								{
									profile.Steps.Add(
										new StepData(reader.GetInt32(4), profile.ID, reader.GetInt32(5), reader.GetDateTime(6))
									);
								}

							}
						}
					}
				}
			}
			return profile;
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
                    cmd.Parameters.AddWithValue("@weight", profile.Weight);
                    cmd.Parameters.AddWithValue("@height", profile.Height);
                   
                    insId = (int)cmd.ExecuteScalar(); //Tager kolonnen som bliver returneret i SQL Command (OUTPUT INSERTED.id) og indsætter som 'insId'
                }
            }

            return insId;
        }

        // PUT: api/Profile/5
        [HttpPut("{id}")]
        public int Put(int id, [FromBody] Profile p)
        {
	        int resId = 0;
	        string sql = "UPDATE Profil SET firstname = @firstName, lastname = @lastName, birthday = @birthday OUTPUT INSERTED.id WHERE id = @id";

	        using (SqlConnection sqlConnection = new SqlConnection(conn))
	        {
		        sqlConnection.Open();
		        using (SqlCommand updCommand = new SqlCommand(sql, sqlConnection))
		        {
			        updCommand.Parameters.AddWithValue("@id", id);
			        updCommand.Parameters.AddWithValue("@firstName", p.FirstName);
			        updCommand.Parameters.AddWithValue("@lastName", p.LastName);
			        updCommand.Parameters.AddWithValue("@birthday", p.Birthday);
                    updCommand.Parameters.AddWithValue("@weight", p.Weight);
		            updCommand.Parameters.AddWithValue("@height", p.Height);

			        // Update in DB and return updated id
			        resId = (int)updCommand.ExecuteScalar();
		        }
	        }

	        return resId;
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
