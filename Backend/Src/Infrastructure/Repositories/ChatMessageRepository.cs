using EmergencyDepartment.Models;

namespace EmergencyDepartment.Infrastructure.Repositories;

public class ChatMessageRepository(EmergencyDepartmentContext db) : GenericRepository<ChatMessage>(db) { }
