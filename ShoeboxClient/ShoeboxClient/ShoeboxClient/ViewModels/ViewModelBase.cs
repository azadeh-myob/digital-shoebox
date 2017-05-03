using ShoeboxClient.Services;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using System;

namespace ShoeboxClient.ViewModels
{
    public class ViewModelBase : INotifyPropertyChanged
    {

        public event PropertyChangedEventHandler PropertyChanged;

        public void NotifyPropertyChanged([CallerMemberName]string propertyName = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }

        public void NotifyAllPropertiesChanged()
        {
            PropertyChanged?.Invoke(this, null);
        }

        private string statusString;

        public string StatusString
        {
            get { return statusString; }
            set { if (statusString == value) return; statusString = value; NotifyPropertyChanged(nameof(StatusString)); }
        }

        public void ClearStatus()
        {
            SetStatus(string.Empty);
        }

        public void SetStatus(string status)
        {
            StatusString = status;
        }

        public virtual void LoadData() { }
        public virtual void SaveData() { }
    }
}
