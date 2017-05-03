﻿using ShoeboxClient.Models;
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

        const string UPLOADURL = "https://digitalshoebox.azurewebsites.net/api/storeImage?code=cx/5SHXMvFlRnX0X/pgGE37Il/1waX16STK1e3iaJ2eOpceQcJCkQQ=="
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
            capture = await databaseService.GetItemAsync(id);
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
                Id = new Guid(),
                Captured = DateTime.UtcNow,
                UserId = this.UserId,
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
            var success = await databaseService.SaveItemAsync(capture);
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
            var result = await client.PostAsync(UPLOADURL, new StringContent(JsonConvert.SerializeObject(capture), new UTF8Encoding(), "application/json"));
            UploadStatus = result.IsSuccessStatusCode ? UploadStatus.Completed : UploadStatus.Interrupted;

            SaveData();

        }
    }
}
