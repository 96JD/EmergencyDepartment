using EmergencyDepartment.Constants;
using System.ComponentModel.DataAnnotations;

namespace EmergencyDepartment.Models;

public partial class User
{
	[RegularExpression(@"^\d{11}$", ErrorMessage = UserConstants.PersonNumberInvalidErrorMessage)]
	public long PersonNumber { get; set; }

	[MaxLength(25)]
	public required string FirstName { get; set; }

	[MaxLength(25)]
	public required string LastName { get; set; }

	[Phone, MinLength(8), MaxLength(25)]
	public required string PhoneNumber { get; set; }

	[MinLength(5), MaxLength(50)]
	public required string Address { get; set; }

	public required string Password { get; set; }

	public DateTime CreatedDate { get; set; }

	public DateTime? UpdatedDate { get; set; }

	public int UserRoleId { get; set; }

	public virtual UserRole? UserRole { get; set; }

	public virtual ICollection<Inquiry> PatientInquiries { get; set; } = [];

	public virtual ICollection<Inquiry> NurseInquiries { get; set; } = [];

	public virtual ICollection<ChatMessage> SenderChatMessages { get; set; } = [];

	public virtual ICollection<ChatMessage> ReceiverChatMessages { get; set; } = [];
}