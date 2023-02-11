#ifndef _MICROBIT_IMAGES
#define _MICROBIT_IMAGES

#include "MicroBit.h"

namespace IMAGES
{
    extern const uint8_t  T_HEART[] __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,1,0,1,0, 1,1,1,1,1, 1,1,1,1,1, 0,1,1,1,0, 0,0,1,0,0};
    extern const uint8_t  T_HEART_SMALL[] __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,0,0,0,0, 0,1,0,1,0, 0,1,1,1,0, 0,0,1,0,0, 0,0,0,0,0};
    extern const uint8_t  T_HAPPY[] __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,0,0,0,0, 0,1,0,1,0, 0,0,0,0,0, 1,0,0,0,1, 0,1,1,1,0};
    extern const uint8_t  T_SMILE[] __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 1,0,0,0,1, 0,1,1,1,0};
    extern const uint8_t  T_SAD[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,0,0,0,0, 0,1,0,1,0, 0,0,0,0,0, 0,1,1,1,0, 1,0,0,0,1};
    extern const uint8_t  T_CONFUSED[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,0,0,0,0, 0,1,0,1,0, 0,0,0,0,0, 0,1,0,1,0, 1,0,1,0,1};
    extern const uint8_t  T_ANGRY[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  1,0,0,0,1, 0,1,0,1,0, 0,0,0,0,0, 1,1,1,1,1, 1,0,1,0,1};
    extern const uint8_t  T_ASLEEP[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,0,0,0,0, 1,1,0,1,1, 0,0,0,0,0, 0,1,1,1,0, 0,0,0,0,0};
    extern const uint8_t  T_SURPRISED[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,1,0,1,0, 0,0,0,0,0, 0,0,1,0,0, 0,1,0,1,0, 0,0,1,0,0};
    extern const uint8_t  T_SILLY[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  1,0,0,0,1, 0,0,0,0,0, 1,1,1,1,1, 0,0,1,0,1, 0,0,1,1,1};
    extern const uint8_t  T_FABULOUS[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  1,1,1,1,1, 1,1,0,1,1, 0,0,0,0,0, 0,1,0,1,0, 0,1,1,1,0};
    extern const uint8_t  T_MEH[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,1,0,1,0, 0,0,0,0,0, 0,0,0,1,0, 0,0,1,0,0, 0,1,0,0,0};
    extern const uint8_t  T_YES[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,0,0,0,0, 0,0,0,0,1, 0,0,0,1,0, 1,0,1,0,0, 0,1,0,0,0};
    extern const uint8_t  T_NO[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  1,0,0,0,1, 0,1,0,1,0, 0,0,1,0,0, 0,1,0,1,0, 1,0,0,0,1};
    extern const uint8_t  T_CLOCK12[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,0,1,0,0, 0,0,1,0,0, 0,0,1,0,0, 0,0,0,0,0, 0,0,0,0,0};
    extern const uint8_t  T_CLOCK1[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,0,0,1,0, 0,0,0,1,0, 0,0,1,0,0, 0,0,0,0,0, 0,0,0,0,0};
    extern const uint8_t  T_CLOCK2[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,0,0,0,0, 0,0,0,1,1, 0,0,1,0,0, 0,0,0,0,0, 0,0,0,0,0};
    extern const uint8_t  T_CLOCK3[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,0,0,0,0, 0,0,0,0,0, 0,0,1,1,1, 0,0,0,0,0, 0,0,0,0,0};
    extern const uint8_t  T_CLOCK4[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,0,0,0,0, 0,0,0,0,0, 0,0,1,0,0, 0,0,0,1,1, 0,0,0,0,0};
    extern const uint8_t  T_CLOCK5[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,0,0,0,0, 0,0,0,0,0, 0,0,1,0,0, 0,0,0,1,0, 0,0,0,1,0};
    extern const uint8_t  T_CLOCK6[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,0,0,0,0, 0,0,0,0,0, 0,0,1,0,0, 0,0,1,0,0, 0,0,1,0,0};
    extern const uint8_t  T_CLOCK7[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,0,0,0,0, 0,0,0,0,0, 0,0,1,0,0, 0,1,0,0,0, 0,1,0,0,0};
    extern const uint8_t  T_CLOCK8[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,0,0,0,0, 0,0,0,0,0, 0,0,1,0,0, 1,1,0,0,0, 0,0,0,0,0};
    extern const uint8_t  T_CLOCK9[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,0,0,0,0, 0,0,0,0,0, 1,1,1,0,0, 0,0,0,0,0, 0,0,0,0,0};
    extern const uint8_t  T_CLOCK10[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,0,0,0,0, 1,1,0,0,0, 0,0,1,0,0, 0,0,0,0,0, 0,0,0,0,0};
    extern const uint8_t  T_CLOCK11[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,1,0,0,0, 0,1,0,0,0, 0,0,1,0,0, 0,0,0,0,0, 0,0,0,0,0};
    extern const uint8_t  T_ARROW_N[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,0,1,0,0, 0,1,1,1,0, 1,0,1,0,1, 0,0,1,0,0, 0,0,1,0,0};
    extern const uint8_t  T_ARROW_NE[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,0,1,1,1, 0,0,0,1,1, 0,0,1,0,1, 0,1,0,0,0, 1,0,0,0,0};
    extern const uint8_t  T_ARROW_E[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,0,1,0,0, 0,0,0,1,0, 1,1,1,1,1, 0,0,0,1,0, 0,0,1,0,0};
    extern const uint8_t  T_ARROW_SE[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  1,0,0,0,0, 0,1,0,0,0, 0,0,1,0,1, 0,0,0,1,1, 0,0,1,1,1};
    extern const uint8_t  T_ARROW_S[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,0,1,0,0, 0,0,1,0,0, 1,0,1,0,1, 0,1,1,1,0, 0,0,1,0,0};
    extern const uint8_t  T_ARROW_SW[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,0,0,0,1, 0,0,0,1,0, 1,0,1,0,0, 1,1,0,0,0, 1,1,1,0,0};
    extern const uint8_t  T_ARROW_W[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,0,1,0,0, 0,1,0,0,0, 1,1,1,1,1, 0,1,0,0,0, 0,0,1,0,0};
    extern const uint8_t  T_ARROW_NW[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  1,1,1,0,0, 1,1,0,0,0, 1,0,1,0,0, 0,0,0,1,0, 0,0,0,0,1};
    extern const uint8_t  T_TRIANGLE[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,0,0,0,0, 0,0,1,0,0, 0,1,0,1,0, 1,1,1,1,1, 0,0,0,0,0};
    extern const uint8_t  T_TRIANGLE_LEFT[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  1,0,0,0,0, 1,1,0,0,0, 1,0,1,0,0, 1,0,0,1,0, 1,1,1,1,1};
    extern const uint8_t  T_CHESSBOARD[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,1,0,1,0, 1,0,1,0,1, 0,1,0,1,0, 1,0,1,0,1, 0,1,0,1,0};
    extern const uint8_t  T_DIAMOND[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,0,1,0,0, 0,1,0,1,0, 1,0,0,0,1, 0,1,0,1,0, 0,0,1,0,0};
    extern const uint8_t  T_DIAMOND_SMALL[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,0,0,0,0, 0,0,1,0,0, 0,1,0,1,0, 0,0,1,0,0, 0,0,0,0,0};
    extern const uint8_t  T_SQUARE[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  1,1,1,1,1, 1,0,0,0,1, 1,0,0,0,1, 1,0,0,0,1, 1,1,1,1,1};
    extern const uint8_t  T_SQUARE_SMALL[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,0,0,0,0, 0,1,1,1,0, 0,1,0,1,0, 0,1,1,1,0, 0,0,0,0,0};
    extern const uint8_t  T_RABBIT[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  1,0,1,0,0, 1,0,1,0,0, 1,1,1,1,0, 1,1,0,1,0, 1,1,1,1,0};
    extern const uint8_t  T_COW[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  1,0,0,0,1, 1,0,0,0,1, 1,1,1,1,1, 0,1,1,1,0, 0,0,1,0,0};
    extern const uint8_t  T_MUSIC_CROTCHET[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,0,1,0,0, 0,0,1,0,0, 0,0,1,0,0, 1,1,1,0,0, 1,1,1,0,0};
    extern const uint8_t  T_MUSIC_QUAVER[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,0,1,0,0, 0,0,1,1,0, 0,0,1,0,1, 1,1,1,0,0, 1,1,1,0,0};
    extern const uint8_t  T_MUSIC_QUAVERS[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,1,1,1,1, 0,1,0,0,1, 0,1,0,0,1, 1,1,0,1,1, 1,1,0,1,1};
    extern const uint8_t  T_PITCHFORK[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  1,0,1,0,1, 1,0,1,0,1, 1,1,1,1,1, 0,0,1,0,0, 0,0,1,0,0};
    extern const uint8_t  T_XMAS[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,0,1,0,0, 0,1,1,1,0, 0,0,1,0,0, 0,1,1,1,0, 1,1,1,1,1};
    extern const uint8_t  T_PACMAN[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,1,1,1,1, 1,1,0,1,0, 1,1,1,0,0, 1,1,1,1,0, 0,1,1,1,1};
    extern const uint8_t  T_TARGET[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,0,1,0,0, 0,1,1,1,0, 1,1,0,1,1, 0,1,1,1,0, 0,0,1,0,0};
    extern const uint8_t  T_TSHIRT[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  1,1,0,1,1, 1,1,1,1,1, 0,1,1,1,0, 0,1,1,1,0, 0,1,1,1,0};
    extern const uint8_t  T_ROLLERSKATE[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,0,0,1,1, 0,0,0,1,1, 1,1,1,1,1, 1,1,1,1,1, 0,1,0,1,0};
    extern const uint8_t  T_DUCK[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,1,1,0,0, 1,1,1,0,0, 0,1,1,1,1, 0,1,1,1,0, 0,0,0,0,0};
    extern const uint8_t  T_HOUSE[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,0,1,0,0, 0,1,1,1,0, 1,1,1,1,1, 0,1,1,1,0, 0,1,0,1,0};
    extern const uint8_t  T_TORTOISE[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,0,0,0,0, 0,1,1,1,0, 1,1,1,1,1, 0,1,0,1,0, 0,0,0,0,0};
    extern const uint8_t  T_BUTTERFLY[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  1,1,0,1,1, 1,1,1,1,1, 0,0,1,0,0, 1,1,1,1,1, 1,1,0,1,1};
    extern const uint8_t  T_STICKFIGURE[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,0,1,0,0, 1,1,1,1,1, 0,0,1,0,0, 0,1,0,1,0, 1,0,0,0,1};
    extern const uint8_t  T_GHOST[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  1,1,1,1,1, 1,0,1,0,1, 1,1,1,1,1, 1,1,1,1,1, 1,0,1,0,1};
    extern const uint8_t  T_SWORD[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,0,1,0,0, 0,0,1,0,0, 0,0,1,0,0, 0,1,1,1,0, 0,0,1,0,0};
    extern const uint8_t  T_GIRAFFE[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  1,1,0,0,0, 0,1,0,0,0, 0,1,0,0,0, 0,1,1,1,0, 0,1,0,1,0};
    extern const uint8_t  T_SKULL[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,1,1,1,0, 1,0,1,0,1, 1,1,1,1,1, 0,1,1,1,0, 0,1,1,1,0};
    extern const uint8_t  T_UMBRELLA[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  0,1,1,1,0, 1,1,1,1,1, 0,0,1,0,0, 1,0,1,0,0, 0,1,1,0,0};
    extern const uint8_t  T_SNAKE[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  1,1,0,0,0, 1,1,0,1,1, 0,1,0,1,0, 0,1,1,1,0, 0,0,0,0,0};
    extern const uint8_t  T_SCISSORS[]  __attribute__ ((aligned (4)))  = { 0xff, 0xff, 10, 0, 5, 0,  1,1,0,0,1, 1,1,0,1,0, 0,0,1,0,0, 1,1,0,1,0, 1,1,0,0,1};               
}
#endif	//_MICROBIT_IMAGES