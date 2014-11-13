using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(IDEIMusic.Startup))]
namespace IDEIMusic
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
