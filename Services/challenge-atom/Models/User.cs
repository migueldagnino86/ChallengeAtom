namespace ChallengeAtom.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public required string Email { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public ICollection<Task> Tasks { get; set; } = new List<Task>();
    }
}
