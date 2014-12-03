using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using IDEIMusic.DAL;

namespace IDEIMusic.Controllers
{
    public class HomeController : Controller
    {
        private IDEIMusicContext db = new IDEIMusicContext();

        public ActionResult Index(string sortOrder, string searchString)
        {
            ViewBag.TitleSortParm = String.IsNullOrEmpty(sortOrder) ? "title_desc" : "";
            ViewBag.PriceSortParm = sortOrder == "Price" ? "price_desc" : "Price";

            var albums = from a in db.Albums
                         select a;

            if (!String.IsNullOrEmpty(searchString))
            {
                albums = albums.Where(a => a.title.Contains(searchString));
            }
            switch (sortOrder)
            {
                case "title_desc":
                    albums = albums.OrderByDescending(a => a.title);
                    break;
                case "Price":
                    albums = albums.OrderBy(a => a.price);
                    break;
                case "price_desc":
                    albums = albums.OrderByDescending(a => a.price);
                    break;
                default:
                    albums = albums.OrderBy(a => a.title);
                    break;
            }
            return View(albums.ToList());
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}