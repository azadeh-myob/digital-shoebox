using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shoebox.Test
{
    class Program
    {
        static void Main(string[] args)
        {
            var vm = new ShoeboxClient.ViewModels.CaptureViewModel();
            vm.Image = File.ReadAllBytes(@"C:\Users\acoat\Pictures\acoates_small.jpg");

            vm.Upload().Wait();
        }
    }
}
