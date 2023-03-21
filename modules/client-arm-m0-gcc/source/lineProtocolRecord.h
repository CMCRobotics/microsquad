#include "MicroBit.h"
#include <chrono>
#include <unordered_map>

// Struct to represent a Line Protocol data record
struct LineProtocolRecord {
    char measurement[32]; // Name of the measurement
    std::unordered_map<char*, char*, MicroBitMapHash> tags; // Tags associated with the measurement
    std::unordered_map<char*, double, MicroBitMapHash> fields; // Fields associated with the measurement
    std::chrono::nanoseconds timestamp; // Timestamp for the measurement
};
