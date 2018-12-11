using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace MotionsberegnerApp
{
    class Program
    {
        static void Main(string[] args)
        {
            List<DateTime> dateList = CSVReader.CSVStreamDateLog(@"C:\source\Important tasks\3.sem Project\motionsberegner\tracker\data2.csv");
            List<double> stepDataList = CSVReader.CSVStreamValues(@"C:\source\Important tasks\3.sem Project\motionsberegner\tracker\data2.csv");

            List<double> peakList = PeakDetection.FindPeaks(stepDataList,5);
            int stepCount = peakList.Count;
            DateTime LatestDate = dateList.Last();

            StepData data = new StepData(2, 1, stepCount, LatestDate);

            StepConsumer.AddStepDataAsync(data);

            Console.ReadKey();
            
        }
    }
}
