using System.Text;
using EmergencyDepartment.Infrastructure;
using EmergencyDepartment.Infrastructure.Repositories;
using EmergencyDepartment.Models;
using EmergencyDepartment.SignalR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
ConfigurationManager configuration = builder.Configuration;
string connectionString = configuration.GetConnectionString("DefaultConnection")!;
string[] origins = configuration.GetSection("FrontEnd:Origins").Get<string[]>()!;

builder
	.Services.AddControllers()
	.AddNewtonsoftJson(o => o.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSignalR();

builder.Services.AddCors(o =>
	o.AddDefaultPolicy(p => p.WithOrigins(origins).AllowAnyHeader().AllowAnyMethod().AllowCredentials())
);

builder
	.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
	.AddJwtBearer(o =>
	{
		o.RequireHttpsMetadata = false;
		o.SaveToken = true;
		o.TokenValidationParameters = new TokenValidationParameters()
		{
			ValidateIssuer = true,
			ValidateAudience = true,
			ValidAudience = configuration["Jwt:Audience"],
			ValidIssuer = configuration["Jwt:Issuer"],
			IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]!))
		};
	});

builder.Services.AddAuthorization();

builder.Services.AddDbContext<EmergencyDepartmentContext>(o =>
	o.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)).EnableDetailedErrors()
);

builder.Services.AddScoped<IGenericRepository<ChatMessage>, ChatMessageRepository>();
builder.Services.AddScoped<IGenericRepository<Faq>, FaqRepository>();
builder.Services.AddScoped<IGenericRepository<Inquiry>, InquiryRepository>();
builder.Services.AddScoped<IGenericRepository<InquiryStatus>, InquiryStatusRepository>();
builder.Services.AddScoped<IGenericRepository<UserRole>, UserRoleRepository>();
builder.Services.AddScoped<IGenericRepository<User>, UserRepository>();

builder.Services.AddSwaggerGen(o =>
	o.SwaggerDoc(
		"v1",
		new OpenApiInfo
		{
			Title = "Emergency Department API",
			Version = "v1",
			Description = "An API to enable patients to interact with the Emergency Department in Norway.",
			Contact = new OpenApiContact
			{
				Name = "Jacob Dolorzo",
				Email = "jacob.dolorzo.96@gmail.com",
				Url = new Uri(configuration["Swagger:Contact"]!),
			},
		}
	)
);

WebApplication app = builder.Build();

app.UseDefaultFiles();

app.UseStaticFiles();

app.UseSwagger();

app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthentication();

app.UseAuthorization();

app.UseCors();

app.MapControllers();

app.MapHub<EmergencyDepartmentHub>("/signal-r-hub");

await app.RunAsync();
