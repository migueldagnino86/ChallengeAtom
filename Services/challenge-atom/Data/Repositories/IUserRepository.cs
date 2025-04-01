using ChallengeAtom.Models;

namespace ChallengeAtom.Data.Repositories
{
    public interface IUserRepository
    {
        Task<User?> GetByEmailAsync(string email);
        Task<User> CreateAsync(string email);
    }
}
