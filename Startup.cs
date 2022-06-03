using _2rpnet.rpa.webAPI.Contexts;
using _2rpnet.rpa.webAPI.Interfaces;
using _2rpnet.rpa.webAPI.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace _2rpnet.rpa.webAPI
{
    public class Startup
    {

        public Startup(IConfiguration _configuration)
        {
            Configuration = _configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services
             .AddControllers()
             .AddNewtonsoftJson(options => {
                 options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                 options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
             });

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                                builder =>
                                {
                                    builder.AllowAnyOrigin()
                                    .AllowAnyHeader()
                                    .AllowAnyMethod();
                                });
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Version = "v1", Title = "_2rpnet.rpa.webAPI" });

                // Set the comments path for the Swagger JSON and UI.
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            });

            services
                .AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = "JwtBearer";
                    options.DefaultChallengeScheme = "JwtBearer";
                })

                .AddJwtBearer("JwtBearer", options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("2rp-chave-autenticacao")),
                        ClockSkew = TimeSpan.FromDays(30),
                        ValidIssuer = "2rp.webAPI",
                        ValidAudience = "2rp.webAPI"
                    };
                });

            services.AddDbContext<DoisRPnetContext>(options => 
                             options.UseSqlServer(Configuration.GetConnectionString("Default"))
                         );
            services.AddTransient<DbContext, DoisRPnetContext>();
            services.AddTransient<IUserNameRepository, UserNameRepository>();
            services.AddTransient<ICommentRepository, CommentRepository>();
            services.AddTransient<ICorporationRepository, CorporationRepository>();
            services.AddTransient<IEmployeeRepository, EmployeeRepository>();
            services.AddTransient<ILibrarySkinRepository, LibrarySkinRepository>();
            services.AddTransient<ILibraryTrophyRepository, LibraryTrophyRepository>();
            services.AddTransient<ILikeRepository, LikeRepository>();
            services.AddTransient<IPlayerRepository, PlayerRepository>();
            services.AddTransient<IUserTypeRepository, UserTypeRepository>(); 
            services.AddTransient<ITrophyRepository, TrophyRepository>(); 
            services.AddTransient<IStatusWorkflowRepository, StatusWorkflowRepository>(); 
            services.AddTransient<ISkinRepository, SkinRepository>(); 
            services.AddTransient<IQuestRepository, QuestRepository>(); 
            services.AddTransient<IPostRepository, PostRepository>(); 
            services.AddTransient<IOfficeRepository, OfficeRepository>();
            services.AddTransient<IWorkflowRepository, WorkflowRepository>();
            services.AddTransient<ILibraryAssistantRepository, LibraryAssistantRepository>();
            services.AddTransient<IAssistantRepository, AssistantRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseSwagger();

            app.UseSwaggerUI(c => {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "2rp.webAPI");
                c.RoutePrefix = string.Empty;
            });

            app.UseRouting();

            app.UseCors("CorsPolicy");

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                        Path.Combine(Directory.GetCurrentDirectory(), "StaticFiles/Images")),
                RequestPath = "/img"
            });

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
