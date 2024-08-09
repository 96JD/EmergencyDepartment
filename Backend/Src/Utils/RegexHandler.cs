using System.Text.RegularExpressions;

namespace EmergencyDepartment.Utils;

public static partial class RegexHandler
{
	[GeneratedRegex(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$")]
	private static partial Regex PasswordRegex();

	private static readonly Regex passwordRegex = PasswordRegex();

	public static bool EvaluatePassword(string text)
	{
		return passwordRegex.IsMatch(text);
	}
}
