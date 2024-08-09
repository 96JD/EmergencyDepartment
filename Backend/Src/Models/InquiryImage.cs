namespace EmergencyDepartment.Models;

public partial class InquiryImage
{
	public int Id { get; set; }

	public required string Url { get; set; }

	public int InquiryId { get; set; }

	public virtual Inquiry? Inquiry { get; set; }
}
