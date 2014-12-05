using System.Collections.Generic;
using System.Linq;
using IDEIMusic.Models;
using IDEIMusic.DAL;
using Microsoft.AspNet.Identity;
using System;
using System.Net;
using System.Net.Mail;
using System.Net.Mime;
using System.Threading;
using System.ComponentModel;

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
            var context = new ApplicationDbContext();

            var mail = (from m in context.Users
                        where m.Id == userID
                        select m.UserName).First();

            SmtpClient client = new SmtpClient("smtp.gmail.com", 587);
            client.EnableSsl = true;
            MailAddress from = new MailAddress("bizzkitarqsi@gmail.com",
               "Bizzkit " + (char)0xD8 + " Enterprise",
            System.Text.Encoding.UTF8);
            MailAddress to = new MailAddress(mail);
            MailMessage message = new MailMessage(from, to);
            message.Subject = "Sale";
            NetworkCredential myCreds = new NetworkCredential("bizzkitarqsi@gmail.com", "bizzkitarqsi123", "");
            client.Credentials = myCreds;

            Sale sale = new Sale { UserID = userID, Date = System.DateTime.Now };
            db.Sale.Add(sale);
            db.SaveChanges();
            decimal total = 0m;
            message.Body = "Your sale number is: " + sale.ID;
            for (int i = 0; i < ids.Length; i++) {
                int id = ids[i];

                var albums = from a in db.Albums
                             where a.ID == id
                             select a;
                var album = albums.First();

                message.Body += "\nAlbum: " + album.title + " and each cost: " + album.price;
                total += album.price * 10.00m;

                SaleDetails saleDetails = new SaleDetails { Album = album.title, SaleID = sale.ID, Price = album.price, Quantity = 5 };
                db.SaleDetails.Add(saleDetails);

            }

            message.Body += "\nSale total: " + total;
            client.Send(message);
            sale.Total = total;
            db.SaveChanges();
        }

        //  return the API_KEY for the user
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
