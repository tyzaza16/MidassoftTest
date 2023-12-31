
export function getClockAngle(hh_mm:string): number {

  const [ rawHour, rawMinute ] = hh_mm.split(':');
  const minute: number = parseInt(rawMinute);
  const hour: number = parseInt(rawHour);


  if( hour > 24 || hour < 0 || minute < 0 || minute > 59 ) {
    throw new Error('data is not correct!');
  }

  const minuteDegree: number = minute * 6; // 360 / 60  => 1 minute = 6 degree
  const hourDegree: number = (( hour % 12) + (minute/60)) * 30; // 360 / 12  => 30 degree (must include when it shift follow minute)

  let degree:number = Math.abs(hourDegree - minuteDegree);

  if(degree > 180) {
    degree = 360 - degree;
  }
  
  return degree;
}