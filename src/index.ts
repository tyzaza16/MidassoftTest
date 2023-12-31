import { getClockAngle } from "./1.clock-angle";
import { getQuestionPart } from './2.remote-associates-test';
import { quickestPath } from "./3.snake-and-ladder";
import { minEnergy } from "./4.one-dimension-trip";

getClockAngle("12:30");

getQuestionPart(['BEFRIEND', 'GIRLFRIEND', 'FRIENDSHIP']);

quickestPath({
  ladders: [ [3, 39], [14, 35], [31, 70], [44, 65], [47, 86], [63, 83], [71, 93] ],
  snakes: [ [21, 4], [30, 8], [55, 38], [79, 42], [87, 54], [91, 48], [96, 66] ]
});

minEnergy(0, [4, 9], [3, 6, 8], 11);
