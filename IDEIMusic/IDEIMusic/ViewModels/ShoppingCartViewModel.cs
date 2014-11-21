using System.Collections.Generic;
using IDEIMusic.Models;

namespace IDEIMusic.ViewModels
{
    public class ShoppingCartViewModel
    {
        public List<Cart> CartItems { get; set; }
        public decimal CartTotal { get; set; }
    }
}