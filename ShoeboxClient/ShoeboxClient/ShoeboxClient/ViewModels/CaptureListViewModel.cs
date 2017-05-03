using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace ShoeboxClient.ViewModels
{
    public class CaptureListViewModel : ViewModelBase
    {
        private ObservableCollection<CaptureViewModel> captures;
        public ObservableCollection<CaptureViewModel> Captures
        {
            get
            {
                captures = captures ?? new ObservableCollection<CaptureViewModel>();
                return captures;
            }
        }

        private CaptureViewModel selectedItem;

        public CaptureViewModel SelectedItem
        {
            get { return selectedItem; }
            set { selectedItem = value; NotifyPropertyChanged(); }
        }

        public ICommand AddCommand { get; private set; }

        public CaptureListViewModel()
        {
            AddCommand = new DelegateCommand(AddNew);
        }

        private void AddNew()
        {
            var newCap = new CaptureViewModel();
            Captures.Add(newCap);
            SelectedItem = newCap;
        }

        public override async void LoadData()
        {
            base.LoadData();
            foreach (var item in await App.Database.GetItemsAsync())
            {
                Captures.Add(new CaptureViewModel(item));
            }
        }


    }
}
