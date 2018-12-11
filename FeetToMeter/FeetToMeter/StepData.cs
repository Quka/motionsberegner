using System;

namespace MotionsberegnerApp
{
    public class StepData
    {
        public int Id { get; set; }
        public int FId { get; set; }
        public int Steps { get; set; }
        public DateTime LogDate { get; set; }

        public StepData(int id, int fId, int steps, DateTime logDate)
        {
            Id = id;
            FId = fId;
            Steps = steps;
            LogDate = logDate;
        }

        public StepData()
        {
            //json
        }
    }
}