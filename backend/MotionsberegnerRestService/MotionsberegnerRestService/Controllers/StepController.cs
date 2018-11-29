using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MotionsberegnerRestService.Model;

namespace MotionsberegnerRestService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StepController : ControllerBase
    {

        private const string conn = "Server=tcp:motionsberegner.database.windows.net,1433;Initial Catalog=profileDB;Persist Security Info=False;User ID=shabz;Password=Password123;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

        // GET: api/Step
        [HttpGet]
        public List<StepData> GetAllData()
        {
            var result = new List<StepData>();

            string sql = "SELECT id, skridt, meter, kilometer, date FROM StepData "; //SQL Command

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
                                int skridt = reader.GetInt32(0);
                                double meter = reader.GetDouble(0);
                                double kilometer = reader.GetDouble(0);
                                DateTime date = reader.GetDateTime(3);
                              
                                var stepData = new StepData()
                                {
                                    Id = id,
                                    Skridt = skridt,
                                    Meter = meter,
                                    Km = kilometer,
                                    Date = date,
                                   

                                };

                                result.Add(stepData);
                            }

                        }
                    }
                }
            }

            return result;
        }

        // GET: api/Step/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        //// POST: api/Step
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        //// PUT: api/Step/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
