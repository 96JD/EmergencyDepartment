using System.ComponentModel.DataAnnotations;

namespace EmergencyDepartment.Models;

public partial class Faq
{
	public int Id { get; set; }

	[MinLength(15), MaxLength(100)]
	public required string Question { get; set; }

	public required string Answer { get; set; }
}
