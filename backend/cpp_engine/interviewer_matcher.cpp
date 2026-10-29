#include <iostream>
#include <vector>
#include <string>
#include "json.hpp"

using json = nlohmann::json;
using namespace std;

// Helper to check if an interviewer has the skill
bool hasSkill(const vector<string>& skills, const string& requiredSkill) {
    for (const auto& skill : skills) {
        if (skill == requiredSkill) return true;
    }
    return false;
}

json findMatchingInterviewers(const json& input) {
    string requiredSkill = input["requiredSkill"];
    json matches = json::array();

    for (const auto& interviewer : input["interviewers"]) {
        vector<string> skills = interviewer["skills"].get<vector<string>>();
        
        // 1. Check Skill first
        if (!hasSkill(skills, requiredSkill)) continue; 

        // 2. Check Availability
        for (const auto& avail : interviewer["availability"]) {
            string startStr = avail["start"];
            string endStr = avail["end"];
            
            // For simplicity, we are just passing the raw block back.
            // NestJS will slice this into 1-hour slots if needed, 
            // or we can slice it here.
            matches.push_back({
                {"interviewerId", interviewer["id"]},
                {"name", interviewer["name"]},
                {"startTime", startStr},
                {"endTime", endStr}
            });
        }
    }
    return matches;
}