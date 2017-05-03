using ShoeboxClient.Models;
using ShoeboxClient.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace ShoeboxClient.ViewModels
{
    public class CaptureViewModel : ViewModelBase
    {

        private Capture capture;

        public CaptureViewModel(Capture _capture) : base()
        {
            capture = _capture;
        }

        public CaptureViewModel(Guid id) : base()
        {
            LoadData(id).Wait();
        }

        private async Task LoadData(Guid id)
        {
            capture = await App.Database.GetItemAsync(id);
            NotifyAllPropertiesChanged();
        }

        public CaptureViewModel()
        {
            InitialiseCapture();
        }

        private void InitialiseCapture()
        {
            capture = new Capture()
            {
                Id = Guid.NewGuid(),
                Captured = DateTime.UtcNow,
                UserId =  Settings.UserId,
                DocType = DocType.Unknown,
                UploadStatus = UploadStatus.NotStarted
            };
        }

        public Guid Id
        {
            get { return capture.Id; }
            set { if (capture.Id == value) return; capture.Id = value; NotifyPropertyChanged(); }
        }

        public DateTime Captured
        {
            get { return capture.Captured; }
            set { if (capture.Captured == value) return; capture.Captured = value; NotifyPropertyChanged(); }
        }

        public Guid UserId
        {
            get { return capture.UserId; }
            set { if (capture.UserId == value) return; capture.UserId = value; NotifyPropertyChanged(); }
        }

        public DocType DocType
        {
            get { return capture.DocType; }
            set { if (capture.DocType == value) return; capture.DocType = value; NotifyPropertyChanged(); }
        }

        public UploadStatus UploadStatus
        {
            get { return capture.UploadStatus; }
            set { if (capture.UploadStatus == value) return; capture.UploadStatus = value; NotifyPropertyChanged(); }
        }

        public byte[] Image
        {
            get { return capture.Image; }
            set { if (capture.Image == value) return; capture.Image = value; NotifyPropertyChanged(); }
        }

        public override async void SaveData()
        {
            ClearStatus();
            base.SaveData();
            var success = await App.Database.SaveItemAsync(capture);
            SetStatus(success == 0 ? "Saved" : "Error Saving");
        }

        public async Task Upload()
        {
            if (UploadStatus == UploadStatus.Completed)
            {
                return;
            }

            UploadStatus = UploadStatus.Uploading;
            SaveData();

            var client = new HttpClient();
            var result = await client.PostAsync(Settings.UploadUrl, new StringContent(JsonConvert.SerializeObject(capture), new UTF8Encoding(), "application/json"));
            UploadStatus = result.IsSuccessStatusCode ? UploadStatus.Completed : UploadStatus.Interrupted;

            SaveData();

        }

        public IEnumerable<string> DocumentTypes
        {
            get { return (IEnumerable<string>)Enum.GetValues(typeof(DocType)); }
        }
        public IEnumerable<string> UploadStatuses
        {
            get { return (IEnumerable<string>)Enum.GetValues(typeof(UploadStatus)); }
        }
    }
}
