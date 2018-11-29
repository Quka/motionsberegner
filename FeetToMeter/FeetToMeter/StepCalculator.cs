using System;

namespace MotionsberegnerApp
{
    public class StepCalculator
    {
        double meter, km; //double variabler
        public double StepsToMeter(int steps)
        {
            
            //Console.BackgroundColor = ConsoleColor.Black; //Baggrunds farve
            //Console.ForegroundColor = ConsoleColor.White; // Forgrunds farve
            //Console.Write("\nEnter steps: ");
            // steps = Convert.ToInt32(Console.ReadLine()); //Input bliver = steps.
            //Console.ResetColor(); // Tilbage til normal farve
            meter = steps * 0.79; //Steps bliver ganget med 0.79. 
            meter = Math.Round(meter, 2); // Vil kun have de 2 decimal med.     
            //Console.BackgroundColor = ConsoleColor.DarkCyan;
            //Console.ForegroundColor = ConsoleColor.White;
            //Console.WriteLine("\nSteps in meter: " + meter); // Printer meter ud. 
            km = meter / 1000; // regner meter om til km.
            km = Math.Round(km, 3); //For at vise 3 decimaler. 
            //Console.WriteLine("\nMeter in Kilometer: " + km);
            //Console.ResetColor();

            return meter;
        }

        public double StepsToKilometer(int steps)
        {
            meter = steps * 0.79;
            meter = Math.Round(meter, 2);
            km = meter / 1000;
            km = Math.Round(km, 2);

            return km;
        }
    }
}
