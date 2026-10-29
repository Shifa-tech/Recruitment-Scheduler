#include <iostream>
#include <vector>
#include <string>
#include "json.hpp"

using json = nlohmann::json;
using namespace std;

bool hasAnySkill(const vector<string>& interviewerSkills, const vector<string>& requiredSkills) {
    for (const auto& reqSkill : requiredSkills) {
        for (const auto& intSkill : interviewerSkills) {
            if (reqSkill == intSkill) return true; 
        }
    }
    return false;
}

json findMatchingInterviewers(const json& input) {
    // 👈 Ensure we read "requiredSkills" as an array
    vector<string> requiredSkills = input["requiredSkills"].get<vector<string>>();
    json matches = json::array();

    for (const auto& interviewer : input["interviewers"]) {
        vector<string> intSkills = interviewer["skills"].get<vector<string>>();
        
        if (!hasAnySkill(intSkills, requiredSkills)) continue; 

        for (const auto& avail : interviewer["availability"]) {
            string startStr = avail["start"];
            string endStr = avail["end"];
            
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