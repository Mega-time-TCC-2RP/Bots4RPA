using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace _2rpnet.rpa.webAPI.Utils { 
    public static class Crypt { 
        public static string GenerateHash(string Password) { 
            return BCrypt.Net.BCrypt.HashPassword(Password); 
        } 
        public static bool Compare(string FormPassword, string DatabasePassword) { 
            bool A = BCrypt.Net.BCrypt.Verify(FormPassword, DatabasePassword); return A; 
        } 
        public static bool Validate(string DatabasePassword) { 
            if (DatabasePassword.Length >= 32 && DatabasePassword.Substring(0, 1) == "$") { 
                return true; 
            } 
            else return false; 
        } 
    } 
}