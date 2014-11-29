using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IDEIMusic.Models
{
    public class Sale
    {
        public int ID {get;set;}
        public string UserID { get; set; }
        public DateTime Date {get;set;}
        public decimal Total {get;set;}
    }
}