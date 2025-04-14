using Microsoft.AspNetCore.Mvc;

namespace PartyPay_CSharp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController : ControllerBase
    {
        // GET: api/test
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new { message = "Hola PartyPay desde C# (ASP.NET Core)" });
        }
    }
}
