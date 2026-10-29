#include <iostream>
#include <string>
#include "json.hpp"

using json = nlohmann::json;
using namespace std;

// Forward declarations
json findMatchingInterviewers(const json& input);
bool isRoomFree(const string& start, const string& end);

int main() {
    try {
        // 1. Read JSON from NestJS
        json input;
        cin >> input;

        // 2. Find Interviewers & Times
        json matches = findMatchingInterviewers(input);

        if (matches.empty()) {
            cout << json{{"success", false}, {"error", "NO_INTERVIEWER_AVAILABLE"}}.dump() << endl;
            return 0;
        }

        // 3. Assign Rooms (Simplified for now)
        json finalSlots = json::array();
        for (auto& match : matches) {
            string start = match["startTime"];
            string end = match["endTime"];

            if (isRoomFree(start, end)) {
                match["room"] = "Room 101"; // Placeholder
                finalSlots.push_back(match);
            }
        }

        if (finalSlots.empty()) {
            cout << json{{"success", false}, {"error", "NO_ROOM_AVAILABLE"}}.dump() << endl;
            return 0;
        }

        // 4. Return ALL valid slots to NestJS
        cout << json{{"success", true}, {"matches", finalSlots}}.dump() << endl;

    } catch (const exception& e) {
        cout << json{{"success", false}, {"error", e.what()}}.dump() << endl;
    }
    return 0;
}