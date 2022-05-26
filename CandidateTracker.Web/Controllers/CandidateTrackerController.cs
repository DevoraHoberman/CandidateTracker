using CandidateTracker.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CandidateTracker.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidateTrackerController : ControllerBase
    {
        private readonly string _connectionString;

        public CandidateTrackerController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Route("addcandidate")]
        [HttpPost]
        public void AddCandidate(Candidate candidate)
        {
            var repo = new CandidateTrackerRepo(_connectionString);
            repo.AddCandidate(candidate);
        }

        [Route("getpending")]
        [HttpGet]
        public List<Candidate> GetPending()
        {
            var repo = new CandidateTrackerRepo(_connectionString);
            return repo.PendingCandidates();
        }
        [Route("getconfirmed")]
        [HttpGet]
        public List<Candidate> GetConfirmed()
        {
            var repo = new CandidateTrackerRepo(_connectionString);
            return repo.ConfirmedCandidates();
        }
        [Route("getrefused")]
        [HttpGet]
        public List<Candidate> GetRefused()
        {
            var repo = new CandidateTrackerRepo(_connectionString);
            return repo.RefusedCandidates();
        }
        [Route("getpendingcount")]
        [HttpGet]
        public object GetPendingCount()
        {
            var repo = new CandidateTrackerRepo(_connectionString);
            return new { count = repo.PendingCandidatesCount() };
        }
        [Route("getconfirmedcount")]
        [HttpGet]
        public object GetConfirmedCount()
        {
            var repo = new CandidateTrackerRepo(_connectionString);
            return new { count = repo.ConfirmedCandidatesCount() };
        }
        [Route("getrefusedcount")]
        [HttpGet]
        public object GetRefusedCount()
        {
            var repo = new CandidateTrackerRepo(_connectionString);
            return new { count = repo.RefusedCandidatesCount() };
        }
        [Route("confirm")]
        [HttpPost]
        public void Confirm(Candidate candidate)
        {
            var repo = new CandidateTrackerRepo(_connectionString);
            candidate.RegistrationStatus = RegistrationStatus.Confirmed;
            repo.Confirm(candidate);
        }
        [Route("refuse")]
        [HttpPost]
        public void Refuse(Candidate candidate)
        {
            var repo = new CandidateTrackerRepo(_connectionString);
            candidate.RegistrationStatus = RegistrationStatus.Refused;
            repo.Refuse(candidate);
        }
        [Route("getcandidatebyid")]
        [HttpGet]
        public Candidate GetCandidateById(int id)
        {
            var repo = new CandidateTrackerRepo(_connectionString);
            var c = repo.GetCandidateById(id);
            return c;
        }
    }
}
