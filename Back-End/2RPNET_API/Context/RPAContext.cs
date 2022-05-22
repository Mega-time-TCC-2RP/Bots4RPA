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
        public virtual DbSet<Employee> Employees { get; set; }
        public virtual DbSet<LibraryAssistant> LibraryAssistants { get; set; }
        public virtual DbSet<LibrarySkin> LibrarySkins { get; set; }
        public virtual DbSet<LibraryTrophy> LibraryTrophies { get; set; }
        public virtual DbSet<Like> Likes { get; set; }
        public virtual DbSet<Office> Offices { get; set; }
        public virtual DbSet<Player> Players { get; set; }
        public virtual DbSet<Post> Posts { get; set; }
        public virtual DbSet<Quest> Quests { get; set; }
        public virtual DbSet<Run> Runs { get; set; }
        public virtual DbSet<Skin> Skins { get; set; }
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
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Assistant>(entity =>
            {
                entity.HasKey(e => e.IdAssistant)
                    .HasName("PK__Assistan__72DCFF8096B1055E");

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
                    .HasConstraintName("FK__Assistant__IdEmp__7FC0E00C");
            });

            modelBuilder.Entity<AssistantProcedure>(entity =>
            {
                entity.HasKey(e => e.IdAprocedure)
                    .HasName("PK__Assistan__2A41E0FA68094FC5");

                entity.ToTable("AssistantProcedure");

                entity.Property(e => e.IdAprocedure).HasColumnName("IdAProcedure");

                entity.Property(e => e.ProcedureDescription)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.ProcedureName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ProcedureValue)
                    .HasMaxLength(256)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdAssistantNavigation)
                    .WithMany(p => p.AssistantProcedures)
                    .HasForeignKey(d => d.IdAssistant)
                    .HasConstraintName("FK__Assistant__IdAss__029D4CB7");
            });

            modelBuilder.Entity<Comment>(entity =>
            {
                entity.HasKey(e => e.IdComment)
                    .HasName("PK__Comment__57C9AD5850706D8B");

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
                    .HasConstraintName("FK__Comment__IdPlaye__75435199");

                entity.HasOne(d => d.IdPostNavigation)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.IdPost)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Comment__IdPost__744F2D60");
            });

            modelBuilder.Entity<Corporation>(entity =>
            {
                entity.HasKey(e => e.IdCorporation)
                    .HasName("PK__Corporat__2BAEF03DF6C6B29D");

                entity.ToTable("Corporation");

                entity.HasIndex(e => e.Phone, "UQ__Corporat__5C7E359EC82C8C1B")
                    .IsUnique();

                entity.HasIndex(e => e.Cnpj, "UQ__Corporat__AA57D6B482BA80E6")
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

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.HasKey(e => e.IdEmployee)
                    .HasName("PK__Employee__51C8DD7A048A3026");

                entity.ToTable("Employee");

                entity.HasOne(d => d.IdCorporationNavigation)
                    .WithMany(p => p.Employees)
                    .HasForeignKey(d => d.IdCorporation)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Employee__IdCorp__52EE3995");

                entity.HasOne(d => d.IdOfficeNavigation)
                    .WithMany(p => p.Employees)
                    .HasForeignKey(d => d.IdOffice)
                    .HasConstraintName("FK__Employee__IdOffi__53E25DCE");

                entity.HasOne(d => d.IdUserNavigation)
                    .WithMany(p => p.Employees)
                    .HasForeignKey(d => d.IdUser)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Employee__IdUser__51FA155C");
            });

            modelBuilder.Entity<LibraryAssistant>(entity =>
            {
                entity.HasKey(e => e.IdLiraryAssistant)
                    .HasName("PK__LibraryA__76E33D6B85895919");

                entity.ToTable("LibraryAssistant");

                entity.Property(e => e.Nickname)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.UnlockDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.IdAssistantNavigation)
                    .WithMany(p => p.LibraryAssistants)
                    .HasForeignKey(d => d.IdAssistant)
                    .HasConstraintName("FK__LibraryAs__IdAss__0E0EFF63");

                entity.HasOne(d => d.IdEmployeeNavigation)
                    .WithMany(p => p.LibraryAssistants)
                    .HasForeignKey(d => d.IdEmployee)
                    .HasConstraintName("FK__LibraryAs__IdEmp__0D1ADB2A");

                entity.HasOne(d => d.IdLibrarySkinNavigation)
                    .WithMany(p => p.LibraryAssistants)
                    .HasForeignKey(d => d.IdLibrarySkin)
                    .HasConstraintName("FK__LibraryAs__IdLib__0F03239C");
            });

            modelBuilder.Entity<LibrarySkin>(entity =>
            {
                entity.HasKey(e => e.IdLibrarySkins)
                    .HasName("PK__LibraryS__AEA1FBE63F92D0A0");

                entity.Property(e => e.UnlockData)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.IdPlayerNavigation)
                    .WithMany(p => p.LibrarySkins)
                    .HasForeignKey(d => d.IdPlayer)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__LibrarySk__IdPla__67E9567B");

                entity.HasOne(d => d.IdSkinNavigation)
                    .WithMany(p => p.LibrarySkins)
                    .HasForeignKey(d => d.IdSkin)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__LibrarySk__IdSki__68DD7AB4");
            });

            modelBuilder.Entity<LibraryTrophy>(entity =>
            {
                entity.HasKey(e => e.IdLibraryTrophy)
                    .HasName("PK__LibraryT__06B3A134015EAF2A");

                entity.ToTable("LibraryTrophy");

                entity.Property(e => e.UnlockData)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.IdPlayerNavigation)
                    .WithMany(p => p.LibraryTrophies)
                    .HasForeignKey(d => d.IdPlayer)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__LibraryTr__IdPla__7BF04F28");

                entity.HasOne(d => d.IdTrophyNavigation)
                    .WithMany(p => p.LibraryTrophies)
                    .HasForeignKey(d => d.IdTrophy)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__LibraryTr__IdTro__7CE47361");
            });

            modelBuilder.Entity<Like>(entity =>
            {
                entity.HasKey(e => e.IdLikes)
                    .HasName("PK__Likes__3FDC48868E79B1B1");

                entity.HasOne(d => d.IdPlayerNavigation)
                    .WithMany(p => p.Likes)
                    .HasForeignKey(d => d.IdPlayer)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Likes__IdPlayer__707E9C7C");

                entity.HasOne(d => d.IdPostNavigation)
                    .WithMany(p => p.Likes)
                    .HasForeignKey(d => d.IdPost)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Likes__IdPost__6F8A7843");
            });

            modelBuilder.Entity<Office>(entity =>
            {
                entity.HasKey(e => e.IdOffice)
                    .HasName("PK__Office__57A12F4FCC468352");

                entity.ToTable("Office");

                entity.Property(e => e.TitleOffice)
                    .IsRequired()
                    .HasMaxLength(45)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Player>(entity =>
            {
                entity.HasKey(e => e.IdPlayer)
                    .HasName("PK__Player__0A2C3D92DDFA94E7");

                entity.ToTable("Player");

                entity.HasOne(d => d.IdEmployeeNavigation)
                    .WithMany(p => p.Players)
                    .HasForeignKey(d => d.IdEmployee)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Player__IdEmploy__56BECA79");
            });

            modelBuilder.Entity<Post>(entity =>
            {
                entity.HasKey(e => e.IdPost)
                    .HasName("PK__Post__F8DCBD4D14EE723A");

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
                    .HasConstraintName("FK__Post__IdPlayer__6CAE0B98");
            });

            modelBuilder.Entity<Quest>(entity =>
            {
                entity.HasKey(e => e.IdQuest)
                    .HasName("PK__Quest__CDB9F57B927BBB51");

                entity.ToTable("Quest");

                entity.Property(e => e.Completed).HasDefaultValueSql("((0))");

                entity.Property(e => e.QuestDescription).IsUnicode(false);

                entity.Property(e => e.Title)
                    .IsRequired()
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Run>(entity =>
            {
                entity.HasKey(e => e.IdRun)
                    .HasName("PK__Run__2A49CE1FCB9FD452");

                entity.ToTable("Run");

                entity.Property(e => e.RunDate).HasColumnType("datetime");

                entity.HasOne(d => d.IdAssistantNavigation)
                    .WithMany(p => p.Runs)
                    .HasForeignKey(d => d.IdAssistant)
                    .HasConstraintName("FK__Run__IdAssistant__0579B962");
            });

            modelBuilder.Entity<Skin>(entity =>
            {
                entity.HasKey(e => e.IdSkin)
                    .HasName("PK__Skin__A6FFA88BEF9D4AA4");

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

            modelBuilder.Entity<Trophy>(entity =>
            {
                entity.HasKey(e => e.IdTrophy)
                    .HasName("PK__Trophy__E3A7B71B6228F172");

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
                    .HasName("PK__UserName__B7C92638CF505A66");

                entity.ToTable("UserName");

                entity.HasIndex(e => e.Phone, "UQ__UserName__5C7E359E1D56EF5F")
                    .IsUnique();

                entity.HasIndex(e => e.Email, "UQ__UserName__A9D10534E6B5CED8")
                    .IsUnique();

                entity.HasIndex(e => e.Cpf, "UQ__UserName__C1F8973140C785FC")
                    .IsUnique();

                entity.HasIndex(e => e.GoogleId, "idx_googleid_notnull")
                    .IsUnique()
                    .HasFilter("([googleId] IS NOT NULL)");

                entity.HasIndex(e => e.Phone, "idx_userphone_notnull")
                    .IsUnique()
                    .HasFilter("([Phone] IS NOT NULL)");

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

                entity.Property(e => e.GoogleId)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("googleId");

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
                    .HasConstraintName("FK__UserName__IdUser__477C86E9");
            });

            modelBuilder.Entity<UserType>(entity =>
            {
                entity.HasKey(e => e.IdUserType)
                    .HasName("PK__UserType__047ED66D834CD94C");

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
