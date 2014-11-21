using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IDEIMusic.Models
{
    public class Album
    {
        public int ID {get;set;}
        public string title { get; set; }
        public string artistName {get;set;}
        public string img {get;set;}
        public decimal price {get;set;}
    }
}