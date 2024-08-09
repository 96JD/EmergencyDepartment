using EmergencyDepartment.Constants;
using System.ComponentModel.DataAnnotations;

namespace EmergencyDepartment.Models;

public partial class Inquiry
{
	public int Id { get; set; }

	[MinLength(15), MaxLength(100)]
	public required string Title { get; set; }

	[MinLength(25)]
	public required string Description { get; set; }

	[MinLength(10), MaxLength(50)]
	public required string GeneralPractitioner { get; set; }

	public string? Summary { get; set; }

	public DateTime ReceivedDate { get; set; }

	public DateTime? UpdatedDate { get; set; }

	[RegularExpression(@"^\d{11}$", ErrorMessage = UserConstants.PersonNumberInvalidErrorMessage)]
	public long? PatientPersonNumber { get; set; }

	public virtual User? Patient { get; set; }

	[RegularExpression(@"^\d{11}$", ErrorMessage = UserConstants.PersonNumberInvalidErrorMessage)]
	public long? NursePersonNumber { get; set; }

	public virtual User? Nurse { get; set; }

	public int InquiryStatusId { get; set; }

	public virtual InquiryStatus? InquiryStatus { get; set; }

	public virtual ICollection<InquiryImage> InquiryImages { get; set; } = [];

	public virtual ICollection<ChatMessage> ChatMessages { get; set; } = [];
}