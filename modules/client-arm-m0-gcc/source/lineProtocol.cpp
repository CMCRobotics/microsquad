#include "MicroBit.h"
#include <sstream>

// Function to parse a Line Protocol message and populate a LineProtocolRecord structure
bool parseLineProtocolMessage(const ManagedString& message, LineProtocolRecord& record) {
    ManagedStringArray tokens = message.split(',');
    if (tokens.length() < 2) {
        uBit.serial.printf("Error: invalid Line Protocol message format - measurement name missing\n");
        return false;
    }
    strncpy(record.measurement, tokens[0].toCharArray(), sizeof(record.measurement));

    for (int i = 1; i < tokens.length(); i++) {
        ManagedStringArray tag_tokens = tokens[i].split('=');
        if (tag_tokens.length() != 2) {
            uBit.serial.printf("Error: invalid Line Protocol message format - tag key or value missing\n");
            return false;
        }
        char* tag_key = new char[tag_tokens[0].length() + 1];
        char* tag_value = new char[tag_tokens[1].length() + 1];
        strncpy(tag_key, tag_tokens[0].toCharArray(), tag_tokens[0].length() + 1);
        strncpy(tag_value, tag_tokens[1].toCharArray(), tag_tokens[1].length() + 1);
        record.tags.insert(std::make_pair(tag_key, tag_value));
    }

    ManagedStringArray field_tokens = tokens[tokens.length()-1].split(' ');
    for (int i = 0; i < field_tokens.length(); i++) {
        ManagedStringArray field_key_value = field_tokens[i].split('=');
        if (field_key_value.length() != 2) {
            uBit.serial.printf("Error: invalid Line Protocol message format - field key or value missing\n");
            return false;
        }
        double field_value;
        if (!field_key_value[1].toFloat(field_value)) {
            uBit.serial.printf("Error: invalid Line Protocol message format - field value not a number\n");
            return false;
        }
        char* field_key = new char[field_key_value[0].length() + 1];
        strncpy(field_key, field_key_value[0].toCharArray(), field_key_value[0].length() + 1);
        record.fields.insert(std::make_pair(field_key, field_value));
    }

    uint64_t nanoseconds;
    if (!field_tokens[field_tokens.length()-1].toUnsignedLongLong(nanoseconds)) {
        uBit.serial.printf("Error: invalid Line Protocol message format - timestamp not a number\n");
        return false;
    }
    record.timestamp = std::chrono::nanoseconds(nanoseconds);

    // Return true to indicate success
    return true;
}
