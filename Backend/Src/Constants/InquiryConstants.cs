using EmergencyDepartment.Models;

namespace EmergencyDepartment.Constants;

public static class InquiryConstants
{
	public static readonly string ModelName = typeof(Inquiry).Name;

	public const int TitleMinimumValidLength = 15;
	public const int TitleMaximumValidLength = 100;

	public const int DescriptionMinimumValidLength = 25;

	public const int GeneralPractitionerMinimumValidLength = 10;
	public const int GeneralPractitionerMaximumValidLength = 50;
}
