import _ from 'lodash';
import { morning1, morning2, evening1, evening2 } from '../constants/timePeriod';

const discounts = [10.0, 20.0, 30.0, 40.0];

function buildTimePeriod(timePeriod) {
  const time = {};
  switch (timePeriod) {
    case morning1:
      time.before = '7:00';
      time.after = '8:30';
      break;
    case morning2:
      time.before = '7:30';
      time.after = '9:00';
      break;
    case evening1:
      time.before = '17:00';
      time.after = '19:00';
      break;
    case evening2:
      time.before = '18:00';
      time.after = '20:00';
      break;
    default:
  }

  return time;
}

function buildOptions(timePeriod, data, isStudent) {
  let random = _.shuffle([0, 1, 2, 3]);
  const time = buildTimePeriod(timePeriod);

  if (isStudent) random = _.shuffle([2, 3]);

  return random.map((value) => {
    const discount = discounts[value];
    let normalFare = [morning1, morning2].includes(timePeriod) ?
      data['3.1.5'] : data['4.1.5'];
    normalFare = normalFare.toFixed(2);
    const normalFareActual = [morning1, morning2].includes(timePeriod) ?
      data.fareIntermediateMorning : data.fareIntermediateEvening;
    let discountFare = normalFareActual - (normalFareActual * (discount / 100));
    discountFare = discountFare.toFixed(2);

    let arrivalTime = 'Arrival Time: ';
    if ([morning1, morning2].includes(timePeriod)) {
      const date = new Date();
      date.setSeconds(0);
      date.setMinutes(data['3.1.6 minutes']);
      date.setHours(data['3.1.6 hour']);
      arrivalTime += date.toLocaleTimeString();
    } else {
      const date = new Date();
      date.setSeconds(0);
      date.setMinutes(data['4.1.6 minutes']);
      date.setHours(data['4.1.6 hour']);
      arrivalTime += date.toLocaleTimeString();
    }


    const question = `If given ${discount}% discount of normal fare ${normalFare} bhat to ${discountFare} bhat then`;
    const options = [
      `Shift to before ${time.before}`,
      `Shift to after ${time.after}`,
      'Shift both time',
      'Not shift the time',
    ];

    return {
      normalFare, discountFare, question, options, timePeriod, discount, value, arrivalTime,
    };
  });
}

export {
  discounts,
  buildTimePeriod,
  buildOptions,
};
