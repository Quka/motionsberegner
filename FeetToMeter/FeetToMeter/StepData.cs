using System;

namespace MotionsberegnerApp
{
    public class StepData
    {
        public int FId { get; set; }
        public int Steps { get; set; }
        public DateTime LogDate { get; set; }

        public StepData(int fId, int steps, DateTime logDate)
        {
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