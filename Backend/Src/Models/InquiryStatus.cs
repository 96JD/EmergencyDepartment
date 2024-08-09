using System.ComponentModel.DataAnnotations;

namespace EmergencyDepartment.Models;

public partial class InquiryStatus
{
	public int Id { get; set; }

	[MinLength(5), MaxLength(25)]
	public required string Name { get; set; }

	public virtual ICollection<Inquiry> Inquiries { get; set; } = [];
}