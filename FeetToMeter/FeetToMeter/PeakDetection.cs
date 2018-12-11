using System;
using System.Collections.Generic;
using System.Linq;

namespace MotionsberegnerApp
{
    public static class PeakDetection
    {
        // En klasse der tager en list af doubles og en double for at kunne lave peak detection på en liste

        public static List<double> FindPeaks(List<double> values, double rangeOfPeaks)
        {
            List<double> peaks = new List<double>();

            int checksOnEachSide = (int)Math.Floor(rangeOfPeaks / 2);
            for (int i = checksOnEachSide; i < values.Count - checksOnEachSide; i++)
            {
                double current = values[i];
                IEnumerable<double> window = values;
                if (i > checksOnEachSide)
                    window = window.Skip(i - checksOnEachSide);
                window = window.Take((int)rangeOfPeaks);
                if (current == window.Max())
                    if (current >= 1.9)
                    {
                        peaks.Add(current);
                    }
            }
            return peaks;
        }
    }
}