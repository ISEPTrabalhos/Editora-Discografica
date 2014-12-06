using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace IDEIMusic.Models
{
    public class Album
    {
        public int ID {get;set;}
        [DisplayName("Album title")]
        [Required(ErrorMessage = "Title is required")]
        public string title { get; set; }
        public string artistName {get;set;}
        public string img {get;set;}
        [Required(ErrorMessage = "Price is required")]
        [Range(0.01, 100.00, ErrorMessage = "Price must be between 0.01 and 100.00")]
        public decimal price {get;set;}
        public string tags { get; set; }
    }
}