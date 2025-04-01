using ChallengeAtom.Data.Repositories;
using ChallengeAtom.DTOs.Auth;
using Microsoft.AspNetCore.Mvc;

namespace ChallengeAtom.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController(IUserRepository userRepository) : ControllerBase
    {
        [HttpPost("check")]
        public async Task<IActionResult> CheckUserExists([FromBody] LoginRequest request)
        {
            var user = await userRepository.GetByEmailAsync(request.Email);
            return Ok(new { Exists = user != null });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] LoginRequest request)
        {
            var user = await userRepository.CreateAsync(request.Email);
            return Ok(user);
        }
    }
}
