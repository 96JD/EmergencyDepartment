using EmergencyDepartment.Models;

namespace EmergencyDepartment.Constants;

public static class InquiryStatusConstants
{
	public static readonly string ModelName = typeof(InquiryStatus).Name;

	public const int Active = 1;
	public const int InProgress = 2;
	public const int InChat = 3;
	public const int InSummary = 4;
	public const int Finished = 5;
}
