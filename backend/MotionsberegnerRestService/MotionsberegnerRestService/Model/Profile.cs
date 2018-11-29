using System;

namespace MotionsberegnerRestService.Model
{
    public class Profile
    {
        public int ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime Birthday { get; set; }

        public Profile(int id, string firstname, string lastname, DateTime birthday)
        {
            ID = id;
            FirstName = firstname;
            LastName = lastname;
            Birthday = birthday;
        }
       
        public Profile()
        {
            //JSON transfer
        }
    }
}
