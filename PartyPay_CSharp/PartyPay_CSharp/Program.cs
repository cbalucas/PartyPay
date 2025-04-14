using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Agregar configuración de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirTodo", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Agrega servicios, incluyendo controladores.
builder.Services.AddControllers();

var app = builder.Build();

// Usar el middleware de CORS con la política configurada.
app.UseCors("PermitirTodo");

// Mapea los controladores.
app.MapControllers();

// Configura el servidor para escuchar en todas las interfaces en el puerto 5000.
app.Urls.Clear();
app.Urls.Add("http://0.0.0.0:5000");

app.Run();
