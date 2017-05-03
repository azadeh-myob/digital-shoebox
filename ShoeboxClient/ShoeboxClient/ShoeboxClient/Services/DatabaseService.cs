using ShoeboxClient.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;
using SQLite;

namespace ShoeboxClient.Services
{
    public class DatabaseService
    {
        readonly SQLiteAsyncConnection database;

        public DatabaseService(string dbPath)
        {
            database = new SQLiteAsyncConnection(dbPath);
            database.CreateTableAsync<Capture>().Wait();

            //ToDo Any other tables should be created here
        }

        public Task<List<Capture>> GetItemsAsync()
        {
            return database.Table<Capture>().ToListAsync();
        }

        public Task<List<Capture>> GetItemsForUploadingAsync()
        {
            return database.Table<Capture>().Where(
                i => i.UploadStatus == UploadStatus.Interrupted || 
                i.UploadStatus == UploadStatus.NotStarted
                ).ToListAsync();
        }

        public Task<List<Capture>> GetCompletedItemsAsync()
        {
            return database.Table<Capture>().Where(
                i => i.UploadStatus == UploadStatus.Completed
                ).ToListAsync();
        }

        public Task<Capture> GetItemAsync(Guid id)
        {
            return database.Table<Capture>().Where(i=>i.Id == id).FirstOrDefaultAsync();
        }

        public Task<int> SaveItemAsync(Capture item)
        {
            var existing = GetItemAsync(item.Id);
            existing.Wait();

            if(existing.Result == null)
            {
                return database.InsertAsync(item);
            } else
            {
                return database.UpdateAsync(item);
            }

        }

        public  Task<int> DeleteItemAsync(Capture item)
        {
            return database.DeleteAsync(item);
        }
    }
}
