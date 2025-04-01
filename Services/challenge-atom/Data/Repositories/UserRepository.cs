using ChallengeAtom.Models;
using Microsoft.EntityFrameworkCore;

namespace ChallengeAtom.Data.Repositories
{
    public class UserRepository(AppDbContext context) : IUserRepository
    {
        public async Task<User?> GetByEmailAsync(string email)
            => await context.Users.FirstOrDefaultAsync(u => u.Email == email);

        public async Task<User> CreateAsync(string email)
        {
            var user = new User { Email = email };
            context.Users.Add(user);
            await context.SaveChangesAsync();
            return user;
        }
    }
}
