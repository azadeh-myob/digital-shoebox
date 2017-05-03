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
        const string DB_PATH = "ShoeBox.db";
        internal DatabaseService databaseService;

        public ViewModelBase()
        {
            databaseService = new DatabaseService(DB_PATH);
        }

        public event PropertyChangedEventHandler PropertyChanged;

        public void NotifyPropertyChanged([CallerMemberName]string propertyName = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }

        public void NotifyAllPropertiesChanged()
        {
            PropertyChanged?.Invoke(this, null);
        }

        private Guid userID = new System.Guid("AC5F84E2-C879-4399-A90B-B2BF2D5B4BDC");
        public Guid UserId { get { return UserID; } }

        private string statusString;

        public string StatusString
        {
            get { return statusString; }
            set { if (statusString == value) return; statusString = value; NotifyPropertyChanged(nameof(StatusString)); }
        }

        public Guid UserID { get => userID; set => userID = value; }

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
