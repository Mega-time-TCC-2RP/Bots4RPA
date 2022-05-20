using _2rpnet.rpa.webAPI.Domains;
using System.Collections.Generic;

namespace _2rpnet.rpa.webAPI.Interfaces
{
    public interface IPlayerRepository
    {
        Player Create(Player player);
        IEnumerable<Player> ReadAll();
        Player Update(Player player);
        void Delete(Player player);
        Player SearchByID(int id);
        //Player DecreaseScore(Player player, int DecreaseValue);
        //Player IncreaseScore(Player player, int DecreaseValue);
    }
}
