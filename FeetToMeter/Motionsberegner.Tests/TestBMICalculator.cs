using Microsoft.VisualStudio.TestTools.UnitTesting;
using MotionsberegnerApp;

namespace Motionsberegner.Tests
{
    [TestClass]
    public class TestBMICalculator
    {
        [TestMethod]
        public void TestCalcBMI()
        {
            //Arrange
            BMICalculator bc = new BMICalculator();

            //Act
            double bmi = bc.CalcBMI(70, 175);

            //Assert
            Assert.AreEqual(bmi, 23);
        }

        [TestMethod]
        public void TestCalcBMIFalse()
        {
            //Arrange
            BMICalculator bc = new BMICalculator();

            //Act
            double bmi = bc.CalcBMI(70, 175);

            //Assert
            Assert.AreNotEqual(bmi, 24);
        }
    }
}
