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

function buildOptions(timePeriod, data) {
  const random = _.shuffle([0, 1, 2, 3]);
  const time = buildTimePeriod(timePeriod);

  return random.map((value) => {
    const discount = discounts[value];
    const normalFare = data['3.1.5'];
    const discountFare = normalFare - (normalFare * (discount / 100));
    const question = `If given ${discount}% discount of normal fare ${normalFare} bhat to ${discountFare} bhat then`;
    const options = [
      `Shift to before ${time.before}`,
      `Shift to after ${time.after}`,
      'Shift both time',
      'Not shift the time',
    ];

    return {
      normalFare, discountFare, question, options, timePeriod, discount, value,
    };
  });
}

export {
  discounts,
  buildTimePeriod,
  buildOptions,
};
