// room_matcher.cpp
#include <iostream>
#include <string>
#include "json.hpp"

using json = nlohmann::json;
using namespace std;

// This will eventually check if a room is free
bool isRoomFree(const string& startTime, const string& endTime) {
    // Logic to check if time is between 9 AM and 6 PM
    return true; 
}