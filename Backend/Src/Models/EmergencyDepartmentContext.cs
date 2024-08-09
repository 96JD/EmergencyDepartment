using Microsoft.EntityFrameworkCore;

namespace EmergencyDepartment.Models;

public partial class EmergencyDepartmentContext : DbContext
{
	public EmergencyDepartmentContext() { }

	public EmergencyDepartmentContext(DbContextOptions<EmergencyDepartmentContext> options)
		: base(options) { }

	public virtual DbSet<ChatMessage>? ChatMessages { get; set; }

	public virtual DbSet<Faq>? Faqs { get; set; }

	public virtual DbSet<Inquiry>? Inquiries { get; set; }

	public virtual DbSet<InquiryImage>? InquiryImages { get; set; }

	public virtual DbSet<InquiryStatus>? InquiryStatuses { get; set; }

	public virtual DbSet<User>? Users { get; set; }

	public virtual DbSet<UserRole>? UserRoles { get; set; }

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		modelBuilder.UseCollation("utf8mb4_0900_ai_ci").HasCharSet("utf8mb4");

		modelBuilder.Entity<ChatMessage>(entity =>
		{
			entity.ToTable("chat_messages");
			entity.HasKey(e => e.Id).HasName("PRIMARY");
			entity.Property(e => e.Id).HasColumnName("id");
			entity.Property(e => e.Text).HasColumnName("text");
			entity.Property(e => e.ImageUrl).HasMaxLength(255).HasColumnName("image_url");
			entity
				.Property(e => e.ReceivedDate)
				.HasDefaultValueSql("CURRENT_TIMESTAMP")
				.HasColumnType("datetime")
				.HasColumnName("received_date");
			entity.Property(e => e.SenderPersonNumber).HasColumnName("sender_person_number");
			entity.HasIndex(e => e.SenderPersonNumber, "sender_person_number");
			entity
				.HasOne(d => d.Sender)
				.WithMany(p => p.SenderChatMessages)
				.HasForeignKey(d => d.SenderPersonNumber)
				.OnDelete(DeleteBehavior.ClientSetNull)
				.HasConstraintName("chat_messages_ibfk_1");
			entity.Property(e => e.ReceiverPersonNumber).HasColumnName("receiver_person_number");
			entity.HasIndex(e => e.ReceiverPersonNumber, "receiver_person_number");
			entity
				.HasOne(d => d.Receiver)
				.WithMany(p => p.ReceiverChatMessages)
				.HasForeignKey(d => d.ReceiverPersonNumber)
				.OnDelete(DeleteBehavior.ClientSetNull)
				.HasConstraintName("chat_messages_ibfk_2");
			entity.Property(e => e.InquiryId).HasColumnName("inquiry_id");
			entity.HasIndex(e => e.InquiryId, "inquiry_id");
			entity
				.HasOne(d => d.Inquiry)
				.WithMany(p => p.ChatMessages)
				.HasForeignKey(d => d.InquiryId)
				.OnDelete(DeleteBehavior.ClientSetNull)
				.HasConstraintName("chat_messages_ibfk_3");
		});

		modelBuilder.Entity<Faq>(entity =>
		{
			entity.ToTable("faqs");
			entity.HasKey(e => e.Id).HasName("PRIMARY");
			entity.Property(e => e.Id).HasColumnName("id");
			entity.Property(e => e.Question).HasMaxLength(100).HasColumnName("question");
			entity.HasIndex(e => e.Question, "question").IsUnique();
			entity.Property(e => e.Answer).HasColumnType("text").HasColumnName("answer");
		});

		modelBuilder.Entity<Inquiry>(entity =>
		{
			entity.ToTable("inquiries");
			entity.HasKey(e => e.Id).HasName("PRIMARY");
			entity.Property(e => e.Id).HasColumnName("id");
			entity.Property(e => e.Title).HasMaxLength(100).HasColumnName("title");
			entity.Property(e => e.Description).HasColumnType("text").HasColumnName("description");
			entity.Property(e => e.GeneralPractitioner).HasMaxLength(50).HasColumnName("general_practitioner");
			entity.Property(e => e.Summary).HasColumnName("summary");
			entity
				.Property(e => e.ReceivedDate)
				.HasDefaultValueSql("CURRENT_TIMESTAMP")
				.HasColumnType("datetime")
				.HasColumnName("received_date");
			entity.Property(e => e.UpdatedDate).HasColumnType("datetime").HasColumnName("updated_date");
			entity.Property(e => e.PatientPersonNumber).HasColumnName("patient_person_number");
			entity.HasIndex(e => e.PatientPersonNumber, "patient_person_number");
			entity
				.HasOne(d => d.Patient)
				.WithMany(p => p.PatientInquiries)
				.HasForeignKey(d => d.PatientPersonNumber)
				.HasConstraintName("inquiries_ibfk_1");
			entity.Property(e => e.NursePersonNumber).HasColumnName("nurse_person_number");
			entity.HasIndex(e => e.NursePersonNumber, "nurse_person_number");
			entity
				.HasOne(d => d.Nurse)
				.WithMany(p => p.NurseInquiries)
				.HasForeignKey(d => d.NursePersonNumber)
				.HasConstraintName("inquiries_ibfk_2");
			entity.Property(e => e.InquiryStatusId).HasDefaultValueSql("'1'").HasColumnName("inquiry_status_id");
			entity.HasIndex(e => e.InquiryStatusId, "inquiry_status_id");
			entity
				.HasOne(d => d.InquiryStatus)
				.WithMany(p => p.Inquiries)
				.HasForeignKey(d => d.InquiryStatusId)
				.OnDelete(DeleteBehavior.ClientSetNull)
				.HasConstraintName("inquiries_ibfk_3");
		});

		modelBuilder.Entity<InquiryImage>(entity =>
		{
			entity.ToTable("inquiry_images");
			entity.HasKey(e => e.Id).HasName("PRIMARY");
			entity.Property(e => e.Id).HasColumnName("id");
			entity.Property(e => e.Url).HasMaxLength(255).HasColumnName("url");
			entity.Property(e => e.InquiryId).HasColumnName("inquiry_id");
			entity.HasIndex(e => e.InquiryId, "inquiry_id");
			entity
				.HasOne(d => d.Inquiry)
				.WithMany(p => p.InquiryImages)
				.HasForeignKey(d => d.InquiryId)
				.OnDelete(DeleteBehavior.ClientSetNull)
				.HasConstraintName("inquiry_images_ibfk_1");
		});

		modelBuilder.Entity<InquiryStatus>(entity =>
		{
			entity.ToTable("inquiry_statuses");
			entity.HasKey(e => e.Id).HasName("PRIMARY");
			entity.Property(e => e.Id).HasColumnName("id");
			entity.Property(e => e.Name).HasMaxLength(25).HasColumnName("name");
			entity.HasIndex(e => e.Name, "name").IsUnique();
		});

		modelBuilder.Entity<User>(entity =>
		{
			entity.ToTable("users");
			entity.HasKey(e => e.PersonNumber).HasName("PRIMARY");
			entity.Property(e => e.PersonNumber).ValueGeneratedNever().HasColumnName("person_number");
			entity.Property(e => e.FirstName).HasMaxLength(25).HasColumnName("first_name");
			entity.Property(e => e.LastName).HasMaxLength(25).HasColumnName("last_name");
			entity.Property(e => e.PhoneNumber).HasMaxLength(25).HasColumnName("phone_number");
			entity.HasIndex(e => e.PhoneNumber, "phone_number").IsUnique();
			entity.Property(e => e.Address).HasMaxLength(50).HasColumnName("address");
			entity.Property(e => e.Password).HasMaxLength(255).HasColumnName("password");
			entity
				.Property(e => e.CreatedDate)
				.HasDefaultValueSql("CURRENT_TIMESTAMP")
				.HasColumnType("datetime")
				.HasColumnName("created_date");
			entity.Property(e => e.UpdatedDate).HasColumnType("datetime").HasColumnName("updated_date");
			entity.Property(e => e.UserRoleId).HasColumnName("user_role_id");
			entity.HasIndex(e => e.UserRoleId, "user_role_id");
			entity
				.HasOne(d => d.UserRole)
				.WithMany(p => p.Users)
				.HasForeignKey(d => d.UserRoleId)
				.OnDelete(DeleteBehavior.ClientSetNull)
				.HasConstraintName("users_ibfk_1");
		});

		modelBuilder.Entity<UserRole>(entity =>
		{
			entity.ToTable("user_roles");
			entity.HasKey(e => e.Id).HasName("PRIMARY");
			entity.Property(e => e.Id).HasColumnName("id");
			entity.Property(e => e.Name).HasMaxLength(25).HasColumnName("name");
			entity.HasIndex(e => e.Name, "name").IsUnique();
		});
	}
}
