using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IDEIMusic.Models
{
    public class SaleDetails
    {
        public int ID { get; set; }
        public int SaleID { get; set; }
        public int AlbumID { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}