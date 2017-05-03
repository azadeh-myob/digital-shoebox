using ShoeboxClient.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Xamarin.Forms;

namespace ShoeboxClient
{
    public partial class App : Application
    {
        static DatabaseService database;

        public App()
        {
            InitializeComponent();

            MainPage = new ShoeboxClient.MainPage();
        }

        public static DatabaseService Database
        {
            get
            {
                if (database == null)
                {
                    database = new DatabaseService(DependencyService.Get<IFileHelper>().GetLocalFilePath("Shoebox.db3"));
                }
                return database;
            }
        }


        protected override void OnStart()
        {
            // Handle when your app starts
        }

        protected override void OnSleep()
        {
            // Handle when your app sleeps
        }

        protected override void OnResume()
        {
            // Handle when your app resumes
        }
    }
}
