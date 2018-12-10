using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace MotionsberegnerApp
{
    class Program
    {
        static void Main(string[] args)
        {
            List<double> stepDataList = CSVReader.CSVStreamValues(@"C:\source\Important tasks\3.sem Project\motionsberegner\tracker\data2.csv");

            List<double> peakList = PeakDetection.FindPeaks(stepDataList,5);


            foreach (var number in peakList)
            {
                Console.WriteLine(number);
            }


            Console.WriteLine(peakList.Count);


            Console.ReadLine();



            Console.WriteLine(new StepCalculator().StepsToMeter(25));

            Console.WriteLine(new StepCalculator().StepsToKilometer(25));


            Console.WriteLine(new BMICalculator().CalcBMI(70, 175));
            Console.ReadKey();



        }
    }
}
