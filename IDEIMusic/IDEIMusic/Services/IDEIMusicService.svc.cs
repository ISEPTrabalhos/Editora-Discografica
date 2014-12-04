using System.Collections.Generic;
using System.Linq;
using IDEIMusic.Models;
using IDEIMusic.DAL;
using Microsoft.AspNet.Identity;

namespace IDEIMusic.Services
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "IDEIMusicService" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select IDEIMusicService.svc or IDEIMusicService.svc.cs at the Solution Explorer and start debugging.
    public class IDEIMusicService : IIDEIMusicService
    {
        private IDEIMusicContext db = new IDEIMusicContext();

        public List<Album> getCatalog()
        {
            var albums = from a in db.Albums
                         select a;
            return albums.ToList();
        }

        // insert the sale to the database
        public void sellAlbums(int[] ids, string userID)
        {
            Sale sale = new Sale { UserID = userID };
            db.Sale.Add(sale);
            //db.SaveChanges();

            var albums = from a in db.Albums
                         select a;

            albums = albums.Where(a => a.ID.Equals(1));

            foreach (Album a in albums)
            {
                SaleDetails saleDetails = new SaleDetails { Album = a.title, SaleID = sale.ID, Price = a.price, Quantity = 10 };
                db.SaleDetails.Add(saleDetails);
            }

            //db.SaveChanges();
        }

        public string getApiKey(string username)
        {
            var context = new ApplicationDbContext();
            var user = from u in context.Users
                       where u.UserName == username
                       select u;

            string apiKey = user.First().Id;
            return apiKey; 
        }
    }
}
