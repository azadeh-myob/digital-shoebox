using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

        public void AddNew()
        {
            Captures.Add(new CaptureViewModel());
        }

        public override async void LoadData()
        {
            base.LoadData();
            foreach (var item in await databaseService.GetItemsAsync())
            {
                Captures.Add(new CaptureViewModel(item));
            }
        }


    }
}
