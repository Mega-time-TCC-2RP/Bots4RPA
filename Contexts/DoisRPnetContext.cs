using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using _2rpnet.rpa.webAPI.Domains;

#nullable disable

namespace _2rpnet.rpa.webAPI.Contexts
{
    public partial class DoisRPnetContext : DbContext
    {
        public DoisRPnetContext()
        {
        }

        public DoisRPnetContext(DbContextOptions<DoisRPnetContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Assistant> Assistants { get; set; }
        public virtual DbSet<AssistantProcedure> AssistantProcedures { get; set; }
        public virtual DbSet<Comment> Comments { get; set; }
        public virtual DbSet<Corporation> Corporations { get; set; }
        public virtual DbSet<EmailVerification> EmailVerifications { get; set; }
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
        public virtual DbSet<StatusWorkflow> StatusWorkflows { get; set; }
        public virtual DbSet<Trophy> Trophies { get; set; }
        public virtual DbSet<UserName> UserNames { get; set; }
        public virtual DbSet<UserType> UserTypes { get; set; }
        public virtual DbSet<Workflow> Workflows { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=grupo7.database.windows.net; Initial Catalog=2RP-Tarde; User ID=admin7; Password=Senai@132");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Assistant>(entity =>
            {
                entity.HasKey(e => e.IdAssistant)
                    .HasName("PK__Assistan__72DCFF80BFEFAC3C");

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
                    .HasConstraintName("FK__Assistant__IdEmp__73901351");
            });

            modelBuilder.Entity<AssistantProcedure>(entity =>
            {
                entity.HasKey(e => e.IdAprocedure)
                    .HasName("PK__Assistan__2A41E0FAB9782872");

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
                    .HasConstraintName("FK__Assistant__IdAss__766C7FFC");
            });

            modelBuilder.Entity<Comment>(entity =>
            {
                entity.HasKey(e => e.IdComment)
                    .HasName("PK__Comment__57C9AD5814FA0AA8");

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
                    .HasConstraintName("FK__Comment__IdPlaye__691284DE");

                entity.HasOne(d => d.IdPostNavigation)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.IdPost)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Comment__IdPost__681E60A5");
            });

            modelBuilder.Entity<Corporation>(entity =>
            {
                entity.HasKey(e => e.IdCorporation)
                    .HasName("PK__Corporat__2BAEF03DA8A95762");

                entity.ToTable("Corporation");

                entity.HasIndex(e => e.Phone, "UQ__Corporat__5C7E359EE4F7A5DB")
                    .IsUnique();

                entity.HasIndex(e => e.Cnpj, "UQ__Corporat__AA57D6B4FCB67885")
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
                    .HasName("PK__EmailVer__E64B1416C799EF5E");

                entity.ToTable("EmailVerification");

                entity.HasIndex(e => e.Username, "UQ__EmailVer__536C85E4559CE652")
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
                    .HasConstraintName("FK__EmailVeri__IdAss__7E0DA1C4");
            });

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.HasKey(e => e.IdEmployee)
                    .HasName("PK__Employee__51C8DD7A0B009A9D");

                entity.ToTable("Employee");

                entity.HasOne(d => d.IdCorporationNavigation)
                    .WithMany(p => p.Employees)
                    .HasForeignKey(d => d.IdCorporation)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Employee__IdCorp__46BD6CDA");

                entity.HasOne(d => d.IdOfficeNavigation)
                    .WithMany(p => p.Employees)
                    .HasForeignKey(d => d.IdOffice)
                    .HasConstraintName("FK__Employee__IdOffi__47B19113");

                entity.HasOne(d => d.IdUserNavigation)
                    .WithMany(p => p.Employees)
                    .HasForeignKey(d => d.IdUser)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Employee__IdUser__45C948A1");
            });

            modelBuilder.Entity<LibraryAssistant>(entity =>
            {
                entity.HasKey(e => e.IdLiraryAssistant)
                    .HasName("PK__LibraryA__76E33D6B6C2DB9C6");

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
                    .HasConstraintName("FK__LibraryAs__IdAss__01DE32A8");

                entity.HasOne(d => d.IdEmployeeNavigation)
                    .WithMany(p => p.LibraryAssistants)
                    .HasForeignKey(d => d.IdEmployee)
                    .HasConstraintName("FK__LibraryAs__IdEmp__00EA0E6F");

                entity.HasOne(d => d.IdLibrarySkinNavigation)
                    .WithMany(p => p.LibraryAssistants)
                    .HasForeignKey(d => d.IdLibrarySkin)
                    .HasConstraintName("FK__LibraryAs__IdLib__02D256E1");
            });

            modelBuilder.Entity<LibrarySkin>(entity =>
            {
                entity.HasKey(e => e.IdLibrarySkins)
                    .HasName("PK__LibraryS__AEA1FBE645027704");

                entity.Property(e => e.UnlockData)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.IdPlayerNavigation)
                    .WithMany(p => p.LibrarySkins)
                    .HasForeignKey(d => d.IdPlayer)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__LibrarySk__IdPla__5BB889C0");

                entity.HasOne(d => d.IdSkinNavigation)
                    .WithMany(p => p.LibrarySkins)
                    .HasForeignKey(d => d.IdSkin)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__LibrarySk__IdSki__5CACADF9");
            });

            modelBuilder.Entity<LibraryTrophy>(entity =>
            {
                entity.HasKey(e => e.IdLibraryTrophy)
                    .HasName("PK__LibraryT__06B3A134108F20B0");

                entity.ToTable("LibraryTrophy");

                entity.Property(e => e.UnlockData)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.IdPlayerNavigation)
                    .WithMany(p => p.LibraryTrophies)
                    .HasForeignKey(d => d.IdPlayer)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__LibraryTr__IdPla__6FBF826D");

                entity.HasOne(d => d.IdTrophyNavigation)
                    .WithMany(p => p.LibraryTrophies)
                    .HasForeignKey(d => d.IdTrophy)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__LibraryTr__IdTro__70B3A6A6");
            });

            modelBuilder.Entity<Like>(entity =>
            {
                entity.HasKey(e => e.IdLikes)
                    .HasName("PK__Likes__3FDC48861764ACF0");

                entity.HasOne(d => d.IdPlayerNavigation)
                    .WithMany(p => p.Likes)
                    .HasForeignKey(d => d.IdPlayer)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Likes__IdPlayer__644DCFC1");

                entity.HasOne(d => d.IdPostNavigation)
                    .WithMany(p => p.Likes)
                    .HasForeignKey(d => d.IdPost)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Likes__IdPost__6359AB88");
            });

            modelBuilder.Entity<Office>(entity =>
            {
                entity.HasKey(e => e.IdOffice)
                    .HasName("PK__Office__57A12F4F8CEBC16C");

                entity.ToTable("Office");

                entity.Property(e => e.TitleOffice)
                    .IsRequired()
                    .HasMaxLength(45)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Player>(entity =>
            {
                entity.HasKey(e => e.IdPlayer)
                    .HasName("PK__Player__0A2C3D92E54340FF");

                entity.ToTable("Player");

                entity.HasOne(d => d.IdEmployeeNavigation)
                    .WithMany(p => p.Players)
                    .HasForeignKey(d => d.IdEmployee)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Player__IdEmploy__4A8DFDBE");
            });

            modelBuilder.Entity<Post>(entity =>
            {
                entity.HasKey(e => e.IdPost)
                    .HasName("PK__Post__F8DCBD4D0B1C5B66");

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
                    .HasConstraintName("FK__Post__IdPlayer__607D3EDD");
            });

            modelBuilder.Entity<Quest>(entity =>
            {
                entity.HasKey(e => e.IdQuest)
                    .HasName("PK__Quest__CDB9F57BD10E42B3");

                entity.ToTable("Quest");

                entity.Property(e => e.Completed).HasDefaultValueSql("((0))");

                entity.Property(e => e.QuestDescription).IsUnicode(false);

                entity.Property(e => e.Title)
                    .IsRequired()
                    .IsUnicode(false);

                entity.HasOne(d => d.IdWorkflowNavigation)
                    .WithMany(p => p.Quests)
                    .HasForeignKey(d => d.IdWorkflow)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Quest__IdWorkflo__541767F8");
            });

            modelBuilder.Entity<Run>(entity =>
            {
                entity.HasKey(e => e.IdRun)
                    .HasName("PK__Run__2A49CE1F47F6EB15");

                entity.ToTable("Run");

                entity.Property(e => e.RunDate).HasColumnType("datetime");

                entity.Property(e => e.RunDescription)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdAssistantNavigation)
                    .WithMany(p => p.Runs)
                    .HasForeignKey(d => d.IdAssistant)
                    .HasConstraintName("FK__Run__IdAssistant__7948ECA7");

                entity.HasOne(d => d.IdWorkflowNavigation)
                    .WithMany(p => p.Runs)
                    .HasForeignKey(d => d.IdWorkflow)
                    .HasConstraintName("FK__Run__IdWorkflow__7A3D10E0");
            });

            modelBuilder.Entity<Skin>(entity =>
            {
                entity.HasKey(e => e.IdSkin)
                    .HasName("PK__Skin__A6FFA88B58168914");

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

            modelBuilder.Entity<StatusWorkflow>(entity =>
            {
                entity.HasKey(e => e.IdStatus)
                    .HasName("PK__StatusWo__B450643A77339E83");

                entity.ToTable("StatusWorkflow");

                entity.Property(e => e.StatusTitle)
                    .HasMaxLength(10)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Trophy>(entity =>
            {
                entity.HasKey(e => e.IdTrophy)
                    .HasName("PK__Trophy__E3A7B71B67E0FFD7");

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
                    .HasName("PK__UserName__B7C92638212A6303");

                entity.ToTable("UserName");

                entity.HasIndex(e => e.Phone, "UQ__UserName__5C7E359E2714E986")
                    .IsUnique();

                entity.HasIndex(e => e.Email, "UQ__UserName__A9D10534F63EFCA7")
                    .IsUnique();

                entity.HasIndex(e => e.Cpf, "UQ__UserName__C1F897319AC917BE")
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

                entity.Property(e => e.GoogleId).HasColumnName("googleId");

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
                    .HasConstraintName("FK__UserName__IdUser__3B4BBA2E");
            });

            modelBuilder.Entity<UserType>(entity =>
            {
                entity.HasKey(e => e.IdUserType)
                    .HasName("PK__UserType__047ED66D6C000D61");

                entity.ToTable("UserType");

                entity.Property(e => e.TitleUserType)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Workflow>(entity =>
            {
                entity.HasKey(e => e.IdWorkflow)
                    .HasName("PK__Workflow__AFBA43F564DF1CE2");

                entity.ToTable("Workflow");

                entity.Property(e => e.EndDate).HasColumnType("datetime");

                entity.Property(e => e.IdStatus).HasDefaultValueSql("((1))");

                entity.Property(e => e.Title)
                    .IsRequired()
                    .IsUnicode(false);

                entity.Property(e => e.WorkflowDescription).IsUnicode(false);

                entity.HasOne(d => d.IdEmployeeNavigation)
                    .WithMany(p => p.Workflows)
                    .HasForeignKey(d => d.IdEmployee)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Workflow__IdEmpl__4F52B2DB");

                entity.HasOne(d => d.IdStatusNavigation)
                    .WithMany(p => p.Workflows)
                    .HasForeignKey(d => d.IdStatus)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Workflow__IdStat__5046D714");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
