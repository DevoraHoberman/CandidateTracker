using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CandidateTracker.Data
{
    public class CandidateTrackerRepo
    {
        private readonly string _connectionString;

        public CandidateTrackerRepo(string connectionString)
        {
            _connectionString = connectionString;
        }
        public void AddCandidate(Candidate candidate)
        {
            using var context = new CandidateTrackerDataContext(_connectionString);            
            context.Candidates.Add(candidate);
            context.SaveChanges();
        }
        public List<Candidate> PendingCandidates()
        {
            using var context = new CandidateTrackerDataContext(_connectionString);
            return context.Candidates.Where(c => c.RegistrationStatus == RegistrationStatus.Pending).ToList();
        }
        public List<Candidate> ConfirmedCandidates()
        {
            using var context = new CandidateTrackerDataContext(_connectionString);
            return context.Candidates.Where(c => c.RegistrationStatus == RegistrationStatus.Confirmed).ToList();
        }
        public List<Candidate> RefusedCandidates()
        {
            using var context = new CandidateTrackerDataContext(_connectionString);
            return context.Candidates.Where(c => c.RegistrationStatus == RegistrationStatus.Refused).ToList();
        }

        public int PendingCandidatesCount()
        {
            using var context = new CandidateTrackerDataContext(_connectionString);
            return context.Candidates.Where(c => c.RegistrationStatus == RegistrationStatus.Pending).Count();
        }

        public int ConfirmedCandidatesCount()
        {
            using var context = new CandidateTrackerDataContext(_connectionString);
            return context.Candidates.Where(c => c.RegistrationStatus == RegistrationStatus.Confirmed).Count();
        }
        public int RefusedCandidatesCount()
        {
            using var context = new CandidateTrackerDataContext(_connectionString);
            return context.Candidates.Where(c => c.RegistrationStatus == RegistrationStatus.Refused).Count();
        }

        public void Confirm(Candidate candidate)
        {
            using var context = new CandidateTrackerDataContext(_connectionString);
            context.Candidates.Update(candidate);
            context.SaveChanges();
        }
        public void Refuse(Candidate candidate)
        {
            using var context = new CandidateTrackerDataContext(_connectionString);
            context.Candidates.Update(candidate);
            context.SaveChanges();
        }
        public Candidate GetCandidateById(int id)
        {
            using var context = new CandidateTrackerDataContext(_connectionString);
            var c = context.Candidates.Where(c => c.Id == id).FirstOrDefault();
            return c;
        }

    }
}
