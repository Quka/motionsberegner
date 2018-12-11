using System;
using System.Collections.Generic;
using System.IO;

namespace MotionsberegnerApp
{
    public static class CSVReader
    {

        public static List<DateTime> CSVStreamDateLog(string Datapath)
        {

            // En klasse som bruger en fil path til at hente en CSV fil og splitte den op i 4 forskellige lister.
            using (var reader = new StreamReader(Datapath))
            {
                List<DateTime> dateList= new List<DateTime>();
                int i = 0;

                while (!reader.EndOfStream)
                {
                    i++;
                    var line = reader.ReadLine();
                    if (i == 1)
                    {
                        continue;
                    }
                    var values = line.Split(',');
                    
                    dateList.Add(DateTime.Parse(values[3]));
                }
                return dateList;
            }
            
        }

        
        public static List<double> CSVStreamValues(string Datapath)
        {

            // En klasse som bruger en fil path til at hente en CSV fil og splitte den op i 4 forskellige lister.
            using (var reader = new StreamReader(Datapath))
            {
                List<string> listA = new List<string>();
                List<string> listB = new List<string>();
                List<string> listC = new List<string>();
                List<double> listNumber = new List<double>();
                int i = 0;

                while (!reader.EndOfStream)
                {
                    i++;
                    var line = reader.ReadLine();
                    if (i == 1)
                    {
                        continue;
                    }
                    var values = line.Split(',');

                    listA.Add(values[0]);
                    listB.Add(values[1]);
                    listC.Add(values[2]);
                    DateTime dateLog = DateTime.Parse(values[3]);


                    double numval = double.Parse(values[0]) + double.Parse(values[1]) + double.Parse(values[2]);

                    listNumber.Add(numval);
                }
                return listNumber;
            }
        }

    }
}