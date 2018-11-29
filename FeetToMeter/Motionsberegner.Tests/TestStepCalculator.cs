using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using MotionsberegnerApp;

namespace Motionsberegner.Tests
{
    [TestClass]
    public class TestStepCalculator
    {
        [TestMethod]
        public void TestStepsToMeter()
        {
            //Arrange
            StepCalculator sc = new StepCalculator();

            //Act
            double meter = sc.StepsToMeter(25);

            //Assert
            Assert.AreEqual(meter, 19.75);
        }
        [TestMethod]
        public void TestStepsToMeterFalse()
        {
            //Arrange
            StepCalculator sc = new StepCalculator();

            //Act
            double meter = sc.StepsToMeter(25);

            //Assert
            Assert.AreNotEqual(meter, 20);
        }

        [TestMethod]
        public void TestStepsToKilometer()
        {
            //Arrange
            StepCalculator sc = new StepCalculator();

            //Act
            double km = sc.StepsToKilometer(25);

            //Assert
            Assert.AreEqual(km, 0.02);
        }

        [TestMethod]
        public void TestStepsToKilometerFalse()
        {
            //Arrange
            StepCalculator sc = new StepCalculator();

            //Act
            double km = sc.StepsToKilometer(25);

            //Assert
            Assert.AreNotEqual(km, 0.2);
        }
    }
}
