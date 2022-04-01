using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using _2RPNET_API.Domains;

#nullable disable

namespace _2RPNET_API.Context
{
    public partial class RPAContext : DbContext
    {
        public RPAContext()
        {
        }

        public RPAContext(DbContextOptions<RPAContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Assistant> Assistants { get; set; }
        public virtual DbSet<AssistantProcedure> AssistantProcedures { get; set; }
        public virtual DbSet<Corporation> Corporations { get; set; }
        public virtual DbSet<EmailVerification> EmailVerifications { get; set; }
        public virtual DbSet<Employee> Employees { get; set; }
        public virtual DbSet<LibrarySkin> LibrarySkins { get; set; }
        public virtual DbSet<Office> Offices { get; set; }
        public virtual DbSet<Player> Players { get; set; }
        public virtual DbSet<Quest> Quests { get; set; }
        public virtual DbSet<Run> Runs { get; set; }
        public virtual DbSet<Skin> Skins { get; set; }
        public virtual DbSet<StatusQuest> StatusQuests { get; set; }
        public virtual DbSet<UserName> UserNames { get; set; }
        public virtual DbSet<UserType> UserTypes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=RTC22\\SQLEXPRESS; Initial Catalog=DOISRP; integrated security=true;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Latin1_General_CI_AS");

            modelBuilder.Entity<Assistant>(entity =>
            {
                entity.HasKey(e => e.IdAssistant)
                    .HasName("PK__Assistan__72DCFF80809EC713");

                entity.ToTable("Assistant");

                entity.Property(e => e.AlterationDate).HasColumnType("datetime");

                entity.Property(e => e.AssistantDescription)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.AssistantName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CreationDate).HasColumnType("datetime");

                entity.HasOne(d => d.IdEmployeeNavigation)
                    .WithMany(p => p.Assistants)
                    .HasForeignKey(d => d.IdEmployee)
                    .HasConstraintName("FK__Assistant__IdEmp__59FA5E80");
            });

            modelBuilder.Entity<AssistantProcedure>(entity =>
            {
                entity.HasKey(e => e.IdAssistantProcedure)
                    .HasName("PK__Assistan__11A21508C5331878");

                entity.ToTable("AssistantProcedure");

                entity.Property(e => e.ProcedureDescription)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.ProcedureName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdAssistantNavigation)
                    .WithMany(p => p.AssistantProcedures)
                    .HasForeignKey(d => d.IdAssistant)
                    .HasConstraintName("FK__Assistant__IdAss__5CD6CB2B");
            });

            modelBuilder.Entity<Corporation>(entity =>
            {
                entity.HasKey(e => e.IdCorporation)
                    .HasName("PK__Corporat__2BAEF03D80253381");

                entity.ToTable("Corporation");

                entity.HasIndex(e => e.Phone, "UQ__Corporat__5C7E359E8EC5D710")
                    .IsUnique();

                entity.HasIndex(e => e.Email, "UQ__Corporat__A9D1053427708A24")
                    .IsUnique();

                entity.HasIndex(e => e.Cnpj, "UQ__Corporat__AA57D6B4500D6669")
                    .IsUnique();

                entity.Property(e => e.AddressName)
                    .IsRequired()
                    .HasMaxLength(256)
                    .IsUnicode(false);

                entity.Property(e => e.Cnpj)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasColumnName("CNPJ");

                entity.Property(e => e.CorporateName).IsUnicode(false);

                entity.Property(e => e.CorporatePhoto).HasColumnType("text");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(256)
                    .IsUnicode(false);

                entity.Property(e => e.NameFantasy)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Passwd)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Phone)
                    .IsRequired()
                    .HasMaxLength(11)
                    .IsUnicode(false)
                    .IsFixedLength(true);
            });

            modelBuilder.Entity<EmailVerification>(entity =>
            {
                entity.HasKey(e => e.IdEmailVerification)
                    .HasName("PK__EmailVer__E64B1416FC9D3CC5");

                entity.ToTable("EmailVerification");

                entity.HasIndex(e => e.Username, "UQ__EmailVer__536C85E4954A6300")
                    .IsUnique();

                entity.Property(e => e.Cryptography)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Gateway)
                    .IsRequired()
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.Host)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.UserPassword)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdAssistantNavigation)
                    .WithMany(p => p.EmailVerifications)
                    .HasForeignKey(d => d.IdAssistant)
                    .HasConstraintName("FK__EmailVeri__IdAss__6383C8BA");
            });

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.HasKey(e => e.IdEmployee)
                    .HasName("PK__Employee__51C8DD7AC3268ED6");

                entity.ToTable("Employee");

                entity.HasOne(d => d.IdCorporationNavigation)
                    .WithMany(p => p.Employees)
                    .HasForeignKey(d => d.IdCorporation)
                    .HasConstraintName("FK__Employee__IdCorp__46E78A0C");

                entity.HasOne(d => d.IdOfficeNavigation)
                    .WithMany(p => p.Employees)
                    .HasForeignKey(d => d.IdOffice)
                    .HasConstraintName("FK__Employee__IdOffi__47DBAE45");

                entity.HasOne(d => d.IdUserNavigation)
                    .WithMany(p => p.Employees)
                    .HasForeignKey(d => d.IdUser)
                    .HasConstraintName("FK__Employee__IdUser__45F365D3");
            });

            modelBuilder.Entity<LibrarySkin>(entity =>
            {
                entity.HasKey(e => e.IdLibrarySkins)
                    .HasName("PK__LibraryS__AEA1FBE63FB9FD1D");

                entity.Property(e => e.UnlockData).HasColumnType("datetime");

                entity.HasOne(d => d.IdPlayerNavigation)
                    .WithMany(p => p.LibrarySkins)
                    .HasForeignKey(d => d.IdPlayer)
                    .HasConstraintName("FK__LibrarySk__IdPla__5629CD9C");

                entity.HasOne(d => d.IdSkinNavigation)
                    .WithMany(p => p.LibrarySkins)
                    .HasForeignKey(d => d.IdSkin)
                    .HasConstraintName("FK__LibrarySk__IdSki__571DF1D5");
            });

            modelBuilder.Entity<Office>(entity =>
            {
                entity.HasKey(e => e.IdOffice)
                    .HasName("PK__Office__57A12F4FAF62F3F1");

                entity.ToTable("Office");

                entity.Property(e => e.TitleOffice)
                    .IsRequired()
                    .HasMaxLength(45)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Player>(entity =>
            {
                entity.HasKey(e => e.IdPlayer)
                    .HasName("PK__Player__0A2C3D9261DBFDE6");

                entity.ToTable("Player");

                entity.HasOne(d => d.IdEmployeeNavigation)
                    .WithMany(p => p.Players)
                    .HasForeignKey(d => d.IdEmployee)
                    .HasConstraintName("FK__Player__IdEmploy__4AB81AF0");
            });

            modelBuilder.Entity<Quest>(entity =>
            {
                entity.HasKey(e => e.IdQuest)
                    .HasName("PK__Quest__CDB9F57B7E53A2FC");

                entity.ToTable("Quest");

                entity.Property(e => e.DateHour).HasColumnType("datetime");

                entity.Property(e => e.DescriptionQuest)
                    .IsRequired()
                    .IsUnicode(false);

                entity.HasOne(d => d.IdEmployeeNavigation)
                    .WithMany(p => p.Quests)
                    .HasForeignKey(d => d.IdEmployee)
                    .HasConstraintName("FK__Quest__IdEmploye__4F7CD00D");

                entity.HasOne(d => d.IdStatusNavigation)
                    .WithMany(p => p.Quests)
                    .HasForeignKey(d => d.IdStatus)
                    .HasConstraintName("FK__Quest__IdStatus__5070F446");
            });

            modelBuilder.Entity<Run>(entity =>
            {
                entity.HasKey(e => e.IdRun)
                    .HasName("PK__Run__2A49CE1F9748A6BB");

                entity.ToTable("Run");

                entity.Property(e => e.RunDate).HasColumnType("datetime");

                entity.Property(e => e.RunDescription)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdAssistantNavigation)
                    .WithMany(p => p.Runs)
                    .HasForeignKey(d => d.IdAssistant)
                    .HasConstraintName("FK__Run__IdAssistant__5FB337D6");
            });

            modelBuilder.Entity<Skin>(entity =>
            {
                entity.HasKey(e => e.IdSkin)
                    .HasName("PK__Skin__A6FFA88BB8909986");

                entity.ToTable("Skin");

                entity.HasIndex(e => e.SkinImages, "UQ__Skin__AF3CD33BEE11E335")
                    .IsUnique();

                entity.Property(e => e.SkinDescription).IsUnicode(false);

                entity.Property(e => e.SkinImages)
                    .HasMaxLength(256)
                    .IsUnicode(false);

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<StatusQuest>(entity =>
            {
                entity.HasKey(e => e.IdStatus)
                    .HasName("PK__StatusQu__B450643A01305FA3");

                entity.ToTable("StatusQuest");

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<UserName>(entity =>
            {
                entity.HasKey(e => e.IdUser)
                    .HasName("PK__UserName__B7C92638050958A1");

                entity.ToTable("UserName");

                entity.HasIndex(e => e.Phone, "UQ__UserName__5C7E359EE8E16B52")
                    .IsUnique();

                entity.HasIndex(e => e.Email, "UQ__UserName__A9D10534E75032E0")
                    .IsUnique();

                entity.HasIndex(e => e.Cpf, "UQ__UserName__C1F89731D6ADB238")
                    .IsUnique();

                entity.Property(e => e.BirthDate).HasColumnType("datetime");

                entity.Property(e => e.Cpf)
                    .IsRequired()
                    .HasMaxLength(11)
                    .IsUnicode(false)
                    .HasColumnName("CPF")
                    .IsFixedLength(true);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(256)
                    .IsUnicode(false);

                entity.Property(e => e.Passwd)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Phone)
                    .HasMaxLength(11)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.PhotoUser)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('padrao.png')");

                entity.Property(e => e.Rg)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasColumnName("RG");

                entity.Property(e => e.UserName1)
                    .IsRequired()
                    .HasMaxLength(256)
                    .IsUnicode(false)
                    .HasColumnName("UserName");

                entity.HasOne(d => d.IdUserTypeNavigation)
                    .WithMany(p => p.UserNames)
                    .HasForeignKey(d => d.IdUserType)
                    .HasConstraintName("FK__UserName__IdUser__3C69FB99");
            });

            modelBuilder.Entity<UserType>(entity =>
            {
                entity.HasKey(e => e.IdUserType)
                    .HasName("PK__UserType__047ED66DBC73A993");

                entity.ToTable("UserType");

                entity.Property(e => e.TitleUserType)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
