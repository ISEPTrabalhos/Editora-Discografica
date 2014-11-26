﻿using System.Collections.Generic;
using System.ServiceModel;
using IDEIMusic.Models;

namespace IDEIMusic.Services
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IIDEIMusicService" in both code and config file together.
    [ServiceContract]
    public interface IIDEIMusicService
    {
        [OperationContract]
        List<Album> getCatalog();
    }
}
