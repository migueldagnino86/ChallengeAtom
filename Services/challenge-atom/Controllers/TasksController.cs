using ChallengeAtom.Data.Repositories;
using ChallengeAtom.DTOs.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ChallengeAtom.Controllers
{
    [ApiController]
    [Route("api/tasks")]
    public class TasksController(ITaskRepository taskRepository) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] Guid userId)
        {
            var tasks = await taskRepository.GetAllByUserAsync(userId);
            return Ok(tasks);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TaskCreateDto dto)
        {
            var task = new Models.Task
            {
                Title = dto.Title,
                Description = dto.Description,
                Completed = dto.Completed,
                UserId = dto.UserId
            };

            var createdTask = await taskRepository.CreateAsync(task);
            return Ok(createdTask);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] TaskUpdateDto dto)
        {
            var task = await taskRepository.GetByIdAsync(id);
            if (task == null) return NotFound();

            task.Title = dto.Title ?? task.Title;
            task.Description = dto.Description ?? task.Description;
            task.Completed = dto.Completed;

            var updatedTask = await taskRepository.UpdateAsync(task);
            return Ok(updatedTask);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await taskRepository.DeleteAsync(id);
            return NoContent();
        }
    }
}
