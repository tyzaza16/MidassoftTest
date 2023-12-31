"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClockAngle = void 0;
function getClockAngle(hh_mm) {
    const [rawHour, rawMinute] = hh_mm.split(':');
    const minute = parseInt(rawMinute);
    const hour = parseInt(rawHour);
    if (hour > 24 || hour < 0 || minute < 0 || minute > 59) {
        throw new Error('data is not correct!');
    }
    const minuteDegree = minute * 6; // 360 / 60  => 1 minute = 6 degree
    const hourDegree = ((hour % 12) + (minute / 60)) * 30; // 360 / 12  => 30 degree (must include when it shift follow minute)
    let degree = Math.abs(hourDegree - minuteDegree);
    if (degree > 180) {
        degree = 360 - degree;
    }
    return degree;
}
exports.getClockAngle = getClockAngle;
