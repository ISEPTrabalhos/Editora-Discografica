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
        public ActionResult Index(string fromString, string toString)
        {
            var sales = from s in db.Sale
                        join d in db.SaleDetails on s.ID equals d.SaleID
                        select new SaleView { sale = s, saleDetails = d };

            if (!String.IsNullOrEmpty(fromString) && !String.IsNullOrEmpty(toString))
            {
                DateTime fromDate = Convert.ToDateTime(fromString);
                DateTime toDate = Convert.ToDateTime(toString);
                sales = sales.Where(s => s.sale.Date > fromDate);
                sales = sales.Where(s => s.sale.Date < toDate);
            }
            else if (!String.IsNullOrEmpty(fromString))
            {
                DateTime fromDate = Convert.ToDateTime(fromString);
                sales = sales.Where(s => s.sale.Date >= fromDate);
            }
            else if (!String.IsNullOrEmpty(toString))
            {
                DateTime toDate = Convert.ToDateTime(toString);
                sales = sales.Where(s => s.sale.Date <= toDate);
            }
            
            return View(sales.ToList());

        }
    }
}