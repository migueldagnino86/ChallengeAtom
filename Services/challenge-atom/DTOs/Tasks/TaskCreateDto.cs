namespace ChallengeAtom.DTOs.Tasks
{
    public class TaskCreateDto
    {
        public required string Title { get; set; }
        public string? Description { get; set; }
        public bool Completed { get; set; }
        public required Guid UserId { get; set; }
    }
}
