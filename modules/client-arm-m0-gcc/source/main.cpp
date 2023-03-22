/**
 * @file main.cpp
 * @author Brice Copy
 * @brief Microsquad client for Microbit V1
 * @date 2023-02-11
 */
#include "MicroBit.h"
// #include <chrono>
// #include <unordered_map>
// #include <sstream>

MicroBit    uBit;


struct LineProtocolRecord {
    char* measurement;        // Name of the measurement
    uint16_t num_tags;        // Number of tags associated with the measurement
    char* tags;               // Tags associated with the measurement
    uint16_t num_fields;      // Number of field key-value pairs of the measurement
    char* fields;             // Field key-value pairs of the measurement
    uint64_t timestamp;       // Timestamp of the measurement in nanoseconds
};



void parse_line_protocol(const char* input, LineProtocolRecord& output) {
    // Parse the input string and extract the measurement, tags, fields, and timestamp
    char measurement[256];
    char tags[1024];
    char fields[1024];
    uint64_t timestamp;
    int num_scanned = sscanf(input, "%255[^,],%1023[^ ] %1023[^ ] %lu", measurement, tags, fields, &timestamp);
    if (num_scanned != 4) {
        // If parsing fails, set all output fields to NULL or 0
        output.measurement = NULL;
        output.tags = NULL;
        output.fields = NULL;
        output.num_tags = 0;
        output.num_fields = 0;
        output.timestamp = 0;
        return;
    }

    // Copy the measurement, tags, and fields to dynamically allocated memory
    output.measurement = new char[strlen(measurement) + 1];
    strcpy(output.measurement, measurement);
    output.tags = new char[strlen(tags) + 1];
    strcpy(output.tags, tags);
    output.fields = new char[strlen(fields) + 1];
    strcpy(output.fields, fields);

    // Count the number of tags and fields by counting the number of commas
    output.num_tags = 0;
    output.num_fields = 0;
    for (char* c = tags; *c != '\0'; c++) {
        if (*c == ',') {
            output.num_tags++;
        }
    }
    for (char* c = fields; *c != '\0'; c++) {
        if (*c == ',') {
            output.num_fields++;
        }
    }

    // Add 1 to the counts to account for the last tag or field (which does not have a comma after it)
    output.num_tags++;
    output.num_fields++;

    // Convert the timestamp from nanoseconds to microseconds
    output.timestamp = timestamp / 1000;
}


int main()
{
    // Initialise the micro:bit runtime.
    uBit.init();
    uBit.radio.enable();

    // while(1)
    // {
    //     if (uBit.buttonA.isPressed())
    //         uBit.radio.datagram.send("1");

    //     else if (uBit.buttonB.isPressed())
    //         uBit.radio.datagram.send("2");

    //     uBit.sleep(100);
    // }

    // struct LineProtocolRecord lpr;
    // parse_line_protocol("VOTE,option1=A,option2=B index=0 1465839830100400200", lpr);
// 
    ManagedString meas("Measure :");
    // ManagedString m(lpr.measurement);
    // meas = meas + m;
    uBit.display.scroll(meas);
}


