using System;

namespace MotionsberegnerApp
{
   public class BMICalculator
    {
        public int CalcBMI(int kg, int height)
        {
            double bmi;
            bmi = kg / Math.Pow(height / 100.0, 2);

            bmi = Math.Round(bmi, 0);

            return Int32.Parse(bmi.ToString());
        }

    }
}
