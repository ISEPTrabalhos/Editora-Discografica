using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using IDEIMusic.DAL;
using IDEIMusic.Models;
using IDEIMusic.ViewModels;

namespace IDEIMusic.Controllers
{
    [Authorize(Roles="Administrator")]
    public class SaleController : Controller
    {
        private IDEIMusicContext db = new IDEIMusicContext();

        // GET: Sale
        public ActionResult Index()
        {
            var sales = from s in db.Sale
                        join d in db.SaleDetails on s.ID equals d.SaleID
                        select new SaleView { sale = s, saleDetails = d };

            return View(sales);
        }
    }
}