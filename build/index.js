"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1_clock_angle_1 = require("./1.clock-angle");
const _2_remote_associates_test_1 = require("./2.remote-associates-test");
const _3_snake_and_ladder_1 = require("./3.snake-and-ladder");
(0, _1_clock_angle_1.getClockAngle)("12:30");
(0, _2_remote_associates_test_1.getQuestionPart)(['BEFRIEND', 'GIRLFRIEND', 'FRIENDSHIP']);
(0, _3_snake_and_ladder_1.quickestPath)({
    ladders: [[3, 39], [14, 35], [31, 70], [44, 65], [47, 86], [63, 83], [71, 93]],
    snakes: [[21, 4], [30, 8], [55, 38], [79, 42], [87, 54], [91, 48], [96, 66]]
});
// minEnergy(0, [4, 9], [3, 6, 8], 11)
// minEnergy(9, [], [3, 6, 8], 0)
// minEnergy(0, [4, 7], [3, 6], 10)
// 1. general case 
// console.log(minEnergy(0, [4, 9], [3, 6, 8], 11)); //pass
// 2. flip case
// console.log(minEnergy(11, [9, 4], [3, 6, 8], 0)); //pass
// 3. no shops + general
// console.log(minEnergy(5, [], [3, 6, 8] , 9)); // pass
// 4. no shops + flip
// console.log(minEnergy(9, [], [3, 6, 8] , 5)); // pass
// 5. no station + general
// console.log(minEnergy(5, [2,4], [] , 9)); // pass
// 6. no station + flip
// console.log(minEnergy(9, [2,4], [] , 5)); // pass
// 7. no station + no shops + general
// console.log(minEnergy(5, [], [] , 9));
// 8. no station + no shops + flip 
// console.log(minEnergy(9, [], [] , 0));
