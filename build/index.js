"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1_clock_angle_1 = require("./1.clock-angle");
const _2_remote_associates_test_1 = require("./2.remote-associates-test");
const _3_snakeAndLadder_1 = require("./3.snakeAndLadder");
const _4_one_dimension_trip_1 = require("./4.one-dimension-trip");
(0, _1_clock_angle_1.getClockAngle)("12:30");
(0, _2_remote_associates_test_1.getQuestionPart)(['BEFRIEND', 'GIRLFRIEND', 'FRIENDSHIP']);
(0, _3_snakeAndLadder_1.quickestPath)({
    ladders: [[3, 39], [14, 35], [31, 70], [44, 65], [47, 86], [63, 83], [71, 93]],
    snakes: [[21, 4], [30, 8], [55, 38], [79, 42], [87, 54], [91, 48], [96, 66]]
});
(0, _4_one_dimension_trip_1.minEnergy)(0, [4, 9], [3, 6, 8], 11);
