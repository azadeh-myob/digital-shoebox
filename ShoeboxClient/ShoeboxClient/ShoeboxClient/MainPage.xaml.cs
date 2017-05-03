using ShoeboxClient.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace ShoeboxClient
{
    public partial class MainPage : ContentPage
    {
        private CaptureListViewModel vm;
        public MainPage()
        {
            InitializeComponent();
            vm = new CaptureListViewModel();
            vm.LoadData();
            this.BindingContext = vm;
        }
    }
}
