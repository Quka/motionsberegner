using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace MotionsberegnerApp
{
    public static class StepConsumer
    {
        

        public static async Task<StepData> AddStepDataAsync(StepData stepData)
        {
            using (HttpClient client = new HttpClient())
            {
                var jsonString = JsonConvert.SerializeObject(stepData);
                Console.WriteLine("JSON: " + jsonString);
                StringContent content = new StringContent(jsonString, Encoding.UTF8, "application/json");
                HttpResponseMessage response = await client.PostAsync("https://motionsberegnerrestservice20181203104407.azurewebsites.net/api/step", content);

                string str = await response.Content.ReadAsStringAsync();
                StepData addedStepData = JsonConvert.DeserializeObject<StepData>(str);
                return addedStepData;
            }
        }
    }
}