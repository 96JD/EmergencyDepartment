using System.ComponentModel.DataAnnotations;

namespace EmergencyDepartment.Models;

public partial class UserRole
{
	public int Id { get; set; }

	[MinLength(5), MaxLength(25)]
	public required string Name { get; set; }

	public virtual ICollection<User> Users { get; set; } = [];
}