using System;
using System.Collections.Generic;

namespace MotionsberegnerRestService.Model
{
    public class Profile
    {
        public int ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime Birthday { get; set; }
        public int Weight { get; set; }
        public int Height { get; set; }
        public List<StepData> Steps { get; set; }

        public Profile(int id, string firstName, string lastName, DateTime birthday, int weight, int height)
        {
            ID = id;
            FirstName = firstName;
            LastName = lastName;
            Birthday = birthday;
            Weight = weight;
            Height = height;
            Steps = new List<StepData>();
        }
       
        public Profile()
        {
            //JSON transfer
        }
    }
}
