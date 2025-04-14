using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Agrega servicios, incluyendo controladores.
builder.Services.AddControllers();

var app = builder.Build();

// Mapea los controladores
app.MapControllers();

// Configura el servidor para escuchar en todas las interfaces en el puerto 5000.
app.Urls.Clear();
app.Urls.Add("http://0.0.0.0:5000");

app.Run();
