using _2rpnet.rpa.webAPI.Contexts;
using _2rpnet.rpa.webAPI.Domains;
using _2rpnet.rpa.webAPI.Interfaces;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace _2rpnet.rpa.webAPI.Repositories
{
    public class QuestRepository : IQuestRepository
    {
        private readonly DoisRPnetContext ctx;

        public QuestRepository(DoisRPnetContext appContext)
        {
            ctx = appContext;
        }

        public void ChangeQuestStatus(Quest quest)
        {
            if (quest.Completed == true)
            {
                quest.Completed = false;
            }
            else quest.Completed = true;
            ctx.Quests.Update(quest);
            ctx.SaveChanges();
        }

        public Quest Create(Quest quest)
        {
            ctx.Quests.Add(quest);
            ctx.SaveChangesAsync();

            return quest;
        }

        public void Delete(Quest quest)
        {
            ctx.Quests.Remove(quest);
            ctx.SaveChangesAsync();
        }

        public IEnumerable<Quest> ReadAll()
        {
            return ctx.Quests.Include(Q => Q.IdWorkflowNavigation).ToList();
        }

        public Quest SearchByID(int id)
        {
            return ctx.Quests.AsNoTracking().Include(Q => Q.IdWorkflowNavigation).ToList().FirstOrDefault(q => q.IdQuest == id);
        }

        public Quest Update(Quest quest)
        {
            Quest queryQuest = SearchByID(quest.IdQuest);
            if (queryQuest == null)
            {
                return null;
            }
            quest.IdWorkflow = queryQuest.IdWorkflow;
            ctx.Entry(quest).State = EntityState.Modified;
            ctx.SaveChangesAsync();

            return SearchByID(quest.IdQuest);
        }
    }
}
