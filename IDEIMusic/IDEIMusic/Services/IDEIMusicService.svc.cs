using System.Collections.Generic;
using System.Linq;
using IDEIMusic.Models;
using IDEIMusic.DAL;

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

        public void sellAlbums(int[] ids)
        {
            // insert the order of the albums to the database
        }
    }
}
