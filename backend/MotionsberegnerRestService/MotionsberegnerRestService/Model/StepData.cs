using System;

namespace MotionsberegnerRestService.Model
{
    public class StepData
    {
        public int Id { get; set; }
        public int Skridt { get; set; }
        public double Meter { get; set; }
        public double Km { get; set; }
        public DateTime Date { get; set; }

        public StepData(int id, int skridt, double meter, double km, DateTime date)
        {
            Id = id;
            Skridt = skridt;
            Meter = meter;
            Km = km;
            Date = date;
        }

        public StepData()
        {
            //json
        }
    }
}