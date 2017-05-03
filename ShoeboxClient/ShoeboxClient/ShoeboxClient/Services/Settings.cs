using Plugin.Settings;
using Plugin.Settings.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShoeboxClient.Services
{
    public static class Settings
    {

        private static ISettings AppSettings
        {
            get
            {
                return CrossSettings.Current;
            }
        }

        #region Setting Constants

        private const string UPLOAD_URL_KEY = "UploadUrlKey";
        private const string UPLOAD_URL_DEFAULT = "https://digitalshoebox.azurewebsites.net/api/imageUploader?code=Hwil/54Lq7E5pe56DoheHuq6pd5IEtdLF3yXycoh9q7Wdk0WNMbh/w==";

        private const string USER_ID_KEY = "UserIDKey";
        private static Guid USER_ID_DEFAULT = Guid.Empty;


        #endregion


        public static string UploadUrl
        {
            get
            {
                return AppSettings.GetValueOrDefault(UPLOAD_URL_KEY, UPLOAD_URL_DEFAULT);
            }
            set
            {
                AppSettings.AddOrUpdateValue(UPLOAD_URL_KEY, value);
            }
        }

        public static Guid UserId

        {
            get
            {
                return AppSettings.GetValueOrDefault(USER_ID_KEY, USER_ID_DEFAULT);
            }
            set
            {
                AppSettings.AddOrUpdateValue(USER_ID_KEY, value);
            }
        }
    }
}
