using System.Xml.Linq;
using Microsoft.EntityFrameworkCore;
using Task = ChallengeAtom.Models.Task;

namespace ChallengeAtom.Data.Repositories
{
    public class TaskRepository(AppDbContext context) : ITaskRepository
    {
        public async Task<IEnumerable<Task>> GetAllByUserAsync(Guid userId)
            => await context.Tasks
                .Where(t => t.UserId == userId)
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();

        public async Task<Task?> GetByIdAsync(Guid id)
            => await context.Tasks.FindAsync(id);

        public async Task<Models.Task> CreateAsync(Task task)
        {
            context.Tasks.Add(task);
            await context.SaveChangesAsync();
            return task;
        }

        public async Task<Task> UpdateAsync(Task task)
        {
            context.Tasks.Update(task);
            await context.SaveChangesAsync();
            return task;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var task = await context.Tasks.FindAsync(id);
            if (task == null) return false;

            context.Tasks.Remove(task);
            await context.SaveChangesAsync();
            return true;
        }
    }
}
