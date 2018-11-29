using System;

namespace MotionsberegnerApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine(new StepCalculator().StepsToMeter(25));
            
            Console.WriteLine(new StepCalculator().StepsToKilometer(25));
            

            Console.WriteLine(new BMICalculator().CalcBMI(70, 175) );
            Console.ReadKey();

        }
    }
}
