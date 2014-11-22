using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using IDEIMusic.Models;

namespace IDEIMusic.Services
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "IDEIMusicService" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select IDEIMusicService.svc or IDEIMusicService.svc.cs at the Solution Explorer and start debugging.
    public class IDEIMusicService : IIDEIMusicService
    {
        List<Album> getCatalog()
        {
            Album a = new Album();
            List<Album> list = new List<Album>();
            list.Add(a);
            return list;
        }
    }
}
