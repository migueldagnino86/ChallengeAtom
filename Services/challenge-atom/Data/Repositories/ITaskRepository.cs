using Task = ChallengeAtom.Models.Task;
namespace ChallengeAtom.Data.Repositories
{
    public interface ITaskRepository
    {
        Task<IEnumerable<Task>> GetAllByUserAsync(Guid userId);
        Task<Task?> GetByIdAsync(Guid id);
        Task<Task> CreateAsync(Task task);
        Task<Task> UpdateAsync(Task task);
        Task<bool> DeleteAsync(Guid id);
    }
}
