namespace EmergencyDepartment.Models;

public partial class ChatMessage
{
	public int Id { get; set; }

	public string? Text { get; set; }

	public string? ImageUrl { get; set; }

	public DateTime ReceivedDate { get; set; }

	public long SenderPersonNumber { get; set; }

	public virtual User? Sender { get; set; }

	public long ReceiverPersonNumber { get; set; }

	public virtual User? Receiver { get; set; }

	public int InquiryId { get; set; }

	public virtual Inquiry? Inquiry { get; set; }
}
