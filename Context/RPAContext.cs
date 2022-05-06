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
        public virtual DbSet<Comment> Comments { get; set; }
        public virtual DbSet<Corporation> Corporations { get; set; }
        public virtual DbSet<EmailVerification> EmailVerifications { get; set; }
        public virtual DbSet<Employee> Employees { get; set; }
        public virtual DbSet<LibrarySkin> LibrarySkins { get; set; }
        public virtual DbSet<LibraryTrophy> LibraryTrophies { get; set; }
        public virtual DbSet<Like> Likes { get; set; }
        public virtual DbSet<Office> Offices { get; set; }
        public virtual DbSet<Player> Players { get; set; }
        public virtual DbSet<Post> Posts { get; set; }
        public virtual DbSet<Quest> Quests { get; set; }
        public virtual DbSet<Run> Runs { get; set; }
        public virtual DbSet<Skin> Skins { get; set; }
        public virtual DbSet<StatusQuest> StatusQuests { get; set; }
        public virtual DbSet<Trophy> Trophies { get; set; }
        public virtual DbSet<UserName> UserNames { get; set; }
        public virtual DbSet<UserType> UserTypes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("name=RPA");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Latin1_General_CI_AS");

            modelBuilder.Entity<Assistant>(entity =>
            {
                entity.HasKey(e => e.IdAssistant)
                    .HasName("PK__Assistan__72DCFF80509A0AE5");

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
                    .HasConstraintName("FK__Assistant__IdEmp__70DDC3D8");
            });

            modelBuilder.Entity<AssistantProcedure>(entity =>
            {
                entity.HasKey(e => e.IdAprocedure)
                    .HasName("PK__Assistan__2A41E0FABDF82B10");

                entity.ToTable("AssistantProcedure");

                entity.Property(e => e.IdAprocedure).HasColumnName("IdAProcedure");

                entity.Property(e => e.ProcedureDescription)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.ProcedureName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdAssistantNavigation)
                    .WithMany(p => p.AssistantProcedures)
                    .HasForeignKey(d => d.IdAssistant)
                    .HasConstraintName("FK__Assistant__IdAss__73BA3083");
            });

            modelBuilder.Entity<Comment>(entity =>
            {
                entity.HasKey(e => e.IdComment)
                    .HasName("PK__Comment__57C9AD588BCE1607");

                entity.ToTable("Comment");

                entity.Property(e => e.CommentDescription).IsUnicode(false);

                entity.Property(e => e.DataComment)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(45)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdPlayerNavigation)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.IdPlayer)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Comment__IdPlaye__66603565");

                entity.HasOne(d => d.IdPostNavigation)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.IdPost)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Comment__IdPost__656C112C");
            });

            modelBuilder.Entity<Corporation>(entity =>
            {
                entity.HasKey(e => e.IdCorporation)
                    .HasName("PK__Corporat__2BAEF03D05EEE184");

                entity.ToTable("Corporation");

                entity.HasIndex(e => e.Phone, "UQ__Corporat__5C7E359ED18D2D8C")
                    .IsUnique();

                entity.HasIndex(e => e.Cnpj, "UQ__Corporat__AA57D6B4B2E534B3")
                    .IsUnique();

                entity.Property(e => e.AddressName)
                    .IsRequired()
                    .IsUnicode(false);

                entity.Property(e => e.Cnpj)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasColumnName("CNPJ");

                entity.Property(e => e.CorporateName)
                    .IsRequired()
                    .IsUnicode(false);

                entity.Property(e => e.CorporatePhoto)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('padraoEmpresa.png')");

                entity.Property(e => e.NameFantasy)
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
                    .HasName("PK__EmailVer__E64B1416579512DD");

                entity.ToTable("EmailVerification");

                entity.HasIndex(e => e.Username, "UQ__EmailVer__536C85E464FF4F2D")
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
                    .HasConstraintName("FK__EmailVeri__IdAss__7A672E12");
            });

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.HasKey(e => e.IdEmployee)
                    .HasName("PK__Employee__51C8DD7A2D732ABD");

                entity.ToTable("Employee");

                entity.HasOne(d => d.IdCorporationNavigation)
                    .WithMany(p => p.Employees)
                    .HasForeignKey(d => d.IdCorporation)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Employee__IdCorp__48CFD27E");

                entity.HasOne(d => d.IdOfficeNavigation)
                    .WithMany(p => p.Employees)
                    .HasForeignKey(d => d.IdOffice)
                    .HasConstraintName("FK__Employee__IdOffi__49C3F6B7");

                entity.HasOne(d => d.IdUserNavigation)
                    .WithMany(p => p.Employees)
                    .HasForeignKey(d => d.IdUser)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Employee__IdUser__47DBAE45");
            });

            modelBuilder.Entity<LibrarySkin>(entity =>
            {
                entity.HasKey(e => e.IdLibrarySkins)
                    .HasName("PK__LibraryS__AEA1FBE6B8AF1B5A");

                entity.Property(e => e.UnlockData)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.IdPlayerNavigation)
                    .WithMany(p => p.LibrarySkins)
                    .HasForeignKey(d => d.IdPlayer)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__LibrarySk__IdPla__59063A47");

                entity.HasOne(d => d.IdSkinNavigation)
                    .WithMany(p => p.LibrarySkins)
                    .HasForeignKey(d => d.IdSkin)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__LibrarySk__IdSki__59FA5E80");
            });

            modelBuilder.Entity<LibraryTrophy>(entity =>
            {
                entity.HasKey(e => e.IdLibraryTrophy)
                    .HasName("PK__LibraryT__06B3A134A65EFE98");

                entity.ToTable("LibraryTrophy");

                entity.Property(e => e.UnlockData)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.IdPlayerNavigation)
                    .WithMany(p => p.LibraryTrophies)
                    .HasForeignKey(d => d.IdPlayer)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__LibraryTr__IdPla__6D0D32F4");

                entity.HasOne(d => d.IdTrophyNavigation)
                    .WithMany(p => p.LibraryTrophies)
                    .HasForeignKey(d => d.IdTrophy)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__LibraryTr__IdTro__6E01572D");
            });

            modelBuilder.Entity<Like>(entity =>
            {
                entity.HasKey(e => e.IdLikes)
                    .HasName("PK__Likes__3FDC4886F5281AFA");

                entity.HasOne(d => d.IdPlayerNavigation)
                    .WithMany(p => p.Likes)
                    .HasForeignKey(d => d.IdPlayer)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Likes__IdPlayer__619B8048");

                entity.HasOne(d => d.IdPostNavigation)
                    .WithMany(p => p.Likes)
                    .HasForeignKey(d => d.IdPost)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Likes__IdPost__60A75C0F");
            });

            modelBuilder.Entity<Office>(entity =>
            {
                entity.HasKey(e => e.IdOffice)
                    .HasName("PK__Office__57A12F4F39458805");

                entity.ToTable("Office");

                entity.Property(e => e.TitleOffice)
                    .IsRequired()
                    .HasMaxLength(45)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Player>(entity =>
            {
                entity.HasKey(e => e.IdPlayer)
                    .HasName("PK__Player__0A2C3D929671A3B3");

                entity.ToTable("Player");

                entity.HasOne(d => d.IdEmployeeNavigation)
                    .WithMany(p => p.Players)
                    .HasForeignKey(d => d.IdEmployee)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Player__IdEmploy__4CA06362");
            });

            modelBuilder.Entity<Post>(entity =>
            {
                entity.HasKey(e => e.IdPost)
                    .HasName("PK__Post__F8DCBD4D3366EE22");

                entity.ToTable("Post");

                entity.Property(e => e.DataPost)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.PostDescription).IsUnicode(false);

                entity.Property(e => e.PostImage).IsUnicode(false);

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdPlayerNavigation)
                    .WithMany(p => p.Posts)
                    .HasForeignKey(d => d.IdPlayer)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Post__IdPlayer__5DCAEF64");
            });

            modelBuilder.Entity<Quest>(entity =>
            {
                entity.HasKey(e => e.IdQuest)
                    .HasName("PK__Quest__CDB9F57B07AB5A26");

                entity.ToTable("Quest");

                entity.Property(e => e.DateHour).HasColumnType("datetime");

                entity.Property(e => e.DescriptionQuest)
                    .IsRequired()
                    .IsUnicode(false);

                entity.HasOne(d => d.IdEmployeeNavigation)
                    .WithMany(p => p.Quests)
                    .HasForeignKey(d => d.IdEmployee)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Quest__IdEmploye__5165187F");

                entity.HasOne(d => d.IdStatusNavigation)
                    .WithMany(p => p.Quests)
                    .HasForeignKey(d => d.IdStatus)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Quest__IdStatus__52593CB8");
            });

            modelBuilder.Entity<Run>(entity =>
            {
                entity.HasKey(e => e.IdRun)
                    .HasName("PK__Run__2A49CE1FA87A9F9A");

                entity.ToTable("Run");

                entity.Property(e => e.RunDate).HasColumnType("datetime");

                entity.Property(e => e.RunDescription)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdAssistantNavigation)
                    .WithMany(p => p.Runs)
                    .HasForeignKey(d => d.IdAssistant)
                    .HasConstraintName("FK__Run__IdAssistant__76969D2E");
            });

            modelBuilder.Entity<Skin>(entity =>
            {
                entity.HasKey(e => e.IdSkin)
                    .HasName("PK__Skin__A6FFA88B5E5BED29");

                entity.ToTable("Skin");

                entity.Property(e => e.SkinDescription)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('Não há uma descrição para este visual de assistente :(')");

                entity.Property(e => e.SkinImages)
                    .IsRequired()
                    .IsUnicode(false);

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<StatusQuest>(entity =>
            {
                entity.HasKey(e => e.IdStatus)
                    .HasName("PK__StatusQu__B450643A331798ED");

                entity.ToTable("StatusQuest");

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Trophy>(entity =>
            {
                entity.HasKey(e => e.IdTrophy)
                    .HasName("PK__Trophy__E3A7B71BE83C2017");

                entity.ToTable("Trophy");

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(45)
                    .IsUnicode(false);

                entity.Property(e => e.TrophyDescription)
                    .IsRequired()
                    .IsUnicode(false);

                entity.Property(e => e.TrophyImage)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('padraoTrofeu.png')");
            });

            modelBuilder.Entity<UserName>(entity =>
            {
                entity.HasKey(e => e.IdUser)
                    .HasName("PK__UserName__B7C926387F642B32");

                entity.ToTable("UserName");

                entity.HasIndex(e => e.Phone, "UQ__UserName__5C7E359E7724F113")
                    .IsUnique();

                entity.HasIndex(e => e.Email, "UQ__UserName__A9D10534261EDC08")
                    .IsUnique();

                entity.HasIndex(e => e.Cpf, "UQ__UserName__C1F8973114E78501")
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

                entity.Property(e => e.UserValidation).HasDefaultValueSql("((0))");

                entity.HasOne(d => d.IdUserTypeNavigation)
                    .WithMany(p => p.UserNames)
                    .HasForeignKey(d => d.IdUserType)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UserName__IdUser__3D5E1FD2");
            });

            modelBuilder.Entity<UserType>(entity =>
            {
                entity.HasKey(e => e.IdUserType)
                    .HasName("PK__UserType__047ED66D3F13F16D");

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
