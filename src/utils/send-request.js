import axios from 'axios';
import format from '../constants/json-format';
import { discounts } from '../utils/build-random-options';

const NA = 'not in data store';

const qid = {
  gender: '1.1',
  age: '1.2',
  education: '1.3',
  status: '1.4',
  occupation: '1.5',
  occupation_other: '1.5_other',
  income: '1.6',
  No_of_passenger: '2.1',
  Mode_access: '2.2',
  Mode_access_other: '2.2_other',
  purpose: '2.3',
  purpose_other: '2.3_other',
  'Frequency/Week': '2.4',
  use_in_peak_hour: '2.5',
  card_type: '2.6',

  // morning
  First_station_morning: '3.1.1',
  Last_station_morning: '3.1.2',
  No_of_station_morning: '3.1.3',
  Distance_morning: '3.1.4',
  train_fare_morning: '3.1.5',
  time_for_travel_morning: '3.1.6',

  // evening
  First_station_evening: '4.1.1',
  Last_station_evening: '4.1.2',
  No_of_station_evening: '4.1.3',
  Distance_evening: '4.1.4',
  train_fare_evening: '4.1.5',
  time_for_travel_evening: '4.1.6',

  // morning slot 1
  before_7_00_morning_1: NA,
  after_8_30_morning_1: NA,

  morning_10_precent_1: NA,
  change_before_7_00_10_percent_morning_1: NA,
  change_after_8_30_10_percent_morning_1: NA,
  // Not_change_time_10_percent_morning_1: NA,

  morning_20_percent_1: NA,
  change_before_7_00_20_percent_morning_1: NA,
  change_after_8_30_20_percent_morning_1: NA,
  // Not_change_time_20_percent_morning_1: NA,

  morning_30_percent_1: NA,
  change_before_7_00_30_percent_morning_1: NA,
  change_after_8_30_30_percent_morning_1: NA,
  // Not_change_time_30_percent_morning_1: NA,

  morning_40_percent_1: NA,
  change_before_7_00_40_percent_morning_1: NA,
  change_after_8_30_40_percent_morning_1: NA,
  // Not_change_time_40_percent_morning_1: NA,

  Reason_for_not_before_7_00_morning_1: '3.2.7',
  Reason_for_not_after_8_30_morning_1: '3.2.8',
  minimum_discount_morning_1: NA,

  // morning slot 2
  before_7_30_morning_2: NA,
  after_9_00_morning_2: NA,

  morning_10_precent_2: NA,
  change_before_7_30_10_percent_morning_2: NA,
  change_after_9_00_10_percent_morning_2: NA,
  // Not_change_time_10_percent_morning_2: NA,

  morning_20_percent_2: NA,
  change_before_7_30_20_percent_morning_2: NA,
  change_after_9_00_20_percent_morning_2: NA,
  // Not_change_time_20_percent_morning_2: NA,

  morning_30_percent_2: NA,
  change_before_7_30_30_percent_morning_2: NA,
  change_after_9_00_30_percent_morning_2: NA,
  // Not_change_time_30_percent_morning_2: NA,

  morning_40_percent_2: NA,
  change_before_7_30_40_percent_morning_2: NA,
  change_after_9_00_40_percent_morning_2: NA,
  // Not_change_time_40_percent_morning_2: NA,

  Reason_for_not_before_7_30_morning_2: '3.3.7',
  Reason_for_not_after_9_00_morning_2: '3.3.8',
  minimum_discount_morning_2: NA,

  // evening slot 1
  before_17_00_evening_1: NA,
  after_19_00_evening_1: NA,

  evening_10_precent_1: NA,
  change_before_17_00_10_percent_evening_1: NA,
  change_after_19_00_10_percent_evening_1: NA,
  // Not_change_time_10_percent_evening_1: '',

  evening_20_percent_1: NA,
  change_before_17_00_20_percent_evening_1: NA,
  change_after_19_00_20_percent_evening_1: NA,
  // Not_change_time_20_percent_evening_1: '',

  evening_30_percent_1: NA,
  change_before_17_00_30_percent_evening_1: NA,
  change_after_19_00_30_percent_evening_1: NA,
  // Not_change_time_30_percent_evening_1: NA,

  evening_40_percent_1: NA,
  change_before_17_00_40_percent_evening_1: NA,
  change_after_19_00_40_percent_evening_1: NA,
  // Not_change_time_40_percent_evening_1: '',

  Reason_for_not_before_17_00_evening_1: '4.2.7',
  Reason_for_not_after_19_00_evening_1: '4.2.8',
  minimum_discount_evening_1: NA,

  // evening slot 2
  before_18_00_evening_2: NA,
  after_20_00_evening_2: NA,

  evening_10_precent_2: NA,
  change_before_18_00_10_percent_evening_2: NA,
  change_after_20_00_10_percent_evening_2: NA,
  // Not_change_time_10_percent_evening_2: NA,

  evening_20_percent_2: NA,
  change_before_18_00_20_percent_evening_2: NA,
  change_after_20_00_20_percent_evening_2: NA,
  // Not_change_time_20_percent_evening_2: NA,

  evening_30_percent_2: NA,
  change_before_18_00_30_percent_evening_2: NA,
  change_after_20_00_30_percent_evening_2: NA,
  // Not_change_time_30_percent_evening_2: NA,

  evening_40_percent_2: NA,
  change_before_18_00_40_percent_evening_2: NA,
  change_after_20_00_40_percent_evening_2: NA,
  // Not_change_time_40_percent_evening_2: NA,

  Reason_for_not_before_18_00_evening_2: '4.3.7',
  Reason_for_not_after_20_00_evening_2: '4.3.8',
  minimum_discount_evening_2: NA,

  Opinion: '5.1',
  factor_1: NA,
  factor_2: NA,
  factor_3: NA,
  factor_4: NA,
};

const calculateDiscount = (discount, answerMatrix) => {
  const index = discounts.indexOf(discount);
  return answerMatrix[index];
};

const calculateDifference = (hour, minutes, lowerBound, upperBound) => {
  const time = (hour * 60) + minutes;
  return [time - lowerBound, upperBound - time];
};

const findMinimum = (answerMatrix) => {
  let discount = 0.0;
  answerMatrix.forEach((elem, index) => {
    if (discounts === 0.0 && elem.includes(1)) discount = discounts[index];
  });

  return discount;
};


const convertor = {
  gender: value => value + 1,
  age: value => value + 1,
  education: value => value + 1,
  status: value => value + 1,
  occupation: value => value + 1,
  ccoupation_other: value => value,
  income: value => value + 1,
  No_of_passenger: value => value + 1,
  Mode_access: value => value + 1,
  Mode_access_other: value => value,
  purpose: value => value + 1,
  purpose_other: value => value,
  'Frequency/Week': value => value + 1,
  use_in_peak_hour: value => value + 1,
  card_type: value => value + 1,

  // morning destination
  First_station_morning: (value, data) => data.distFare.stations[value],
  Last_station_morning: (value, data) => data.distFare.stations[value],
  No_of_station_morning: value => value,
  Distance_morning: value => value,
  train_fare_morning: value => value,
  time_for_travel_morning: (value, data) =>
    (data['3.1.6 hour'] !== undefined ?
      `${data['3.1.6 hour']}:${data['3.1.6 minutes']}:00` : undefined),

  // evening destination
  First_station_evening: (value, data) => data.distFare.stations[value],
  Last_station_evening: (value, data) => data.distFare.stations[value],
  No_of_station_evening: value => value,
  Distance_evening: value => value,
  train_fare_evening: value => value,
  time_for_travel_evening: (value, data) =>
    (data['4.1.6 hour'] !== undefined ?
      `${data['4.1.6 hour']}:${data['4.1.6 minutes']}:00` : undefined),

  // morning slot 1
  before_7_00_morning_1: (value, data) =>
    calculateDifference(data['3.1.6 hour'], data['3.1.6 minutes'], 7 * 60, 0)[0],
  after_8_30_morning_1: (value, data) =>
    calculateDifference(data['3.1.6 hour'], data['3.1.6 minutes'], 0, (8 * 60) + 30)[1],

  morning_10_precent_1: (value, data) =>
    (data.answers_morning1 !== undefined ?
      (calculateDiscount(10.0, data.answers_morning1).includes(1) ? 'Y' : 'N') : undefined),
  change_before_7_00_10_percent_morning_1: (value, data) =>
    (data.answers_morning1 !== undefined ?
      calculateDiscount(10.0, data.answers_morning1)[0] : undefined),
  change_after_8_30_10_percent_morning_1: (value, data) =>
    (data.answers_morning1 !== undefined ?
      calculateDiscount(10.0, data.answers_morning1)[1] : undefined),
  // Not_change_time_10_percent_morning_1: NA,

  morning_20_percent_1: (value, data) =>
    (data.answers_morning1 !== undefined ?
      (calculateDiscount(20.0, data.answers_morning1).includes(1) ? 'Y' : 'N') : undefined),
  change_before_7_00_20_percent_morning_1: (value, data) =>
    (data.answers_morning1 !== undefined ?
      calculateDiscount(20.0, data.answers_morning1)[0] : undefined),
  change_after_8_30_20_percent_morning_1: (value, data) =>
    (data.answers_morning1 !== undefined ?
      calculateDiscount(20.0, data.answers_morning1)[1] : undefined),
  // Not_change_time_20_percent_morning_1: NA,

  morning_30_percent_1: (value, data) =>
    (data.answers_morning1 !== undefined ?
      (calculateDiscount(30.0, data.answers_morning1).includes(1) ? 'Y' : 'N') : undefined),
  change_before_7_00_30_percent_morning_1: (value, data) =>
    (data.answers_morning1 !== undefined ?
      calculateDiscount(30.0, data.answers_morning1)[0] : undefined),
  change_after_8_30_30_percent_morning_1: (value, data) =>
    (data.answers_morning1 !== undefined ?
      calculateDiscount(30.0, data.answers_morning1)[1] : undefined),
  // Not_change_time_30_percent_morning_1: NA,

  morning_40_percent_1: (value, data) =>
    (data.answers_morning1 !== undefined ?
      (calculateDiscount(40.0, data.answers_morning1).includes(1) ? 'Y' : 'N') : undefined),
  change_before_7_00_40_percent_morning_1: (value, data) =>
    (data.answers_morning1 !== undefined ?
      calculateDiscount(40.0, data.answers_morning1)[0] : undefined),
  change_after_8_30_40_percent_morning_1: (value, data) =>
    (data.answers_morning1 !== undefined ?
      calculateDiscount(40.0, data.answers_morning1)[1] : undefined),
  // Not_change_time_40_percent_morning_1: NA,
  Reason_for_not_before_7_00_morning_1: value => (value !== undefined ? value + 1 : undefined),
  Reason_for_not_after_8_30_morning_1: value => (value !== undefined ? value + 1 : undefined),
  minimum_discount_morning_1: (value, data) =>
    (data.answers_morning1 !== undefined ?
      findMinimum(data.answers_morning1) : undefined),

  // morning slot 2
  before_7_30_morning_2: (value, data) =>
    calculateDifference(data['3.1.6 hour'], data['3.1.6 minutes'], (7 * 60) + 30, 0)[0],
  after_9_00_morning_2: (value, data) =>
    calculateDifference(data['3.1.6 hour'], data['3.1.6 minutes'], 0, 9 * 60)[1],

  morning_10_precent_2: (value, data) =>
    (data.answers_morning2 !== undefined ?
      (calculateDiscount(10.0, data.answers_morning2).includes(1) ? 'Y' : 'N') : undefined),
  change_before_7_30_10_percent_morning_2: (value, data) =>
    (data.answers_morning2 !== undefined ?
      calculateDiscount(10.0, data.answers_morning2)[0] : undefined),
  change_after_9_00_10_percent_morning_2: (value, data) =>
    (data.answers_morning2 !== undefined ?
      calculateDiscount(10.0, data.answers_morning2)[1] : undefined),
  // Not_change_time_10_percent_morning_1: NA,

  morning_20_percent_2: (value, data) =>
    (data.answers_morning2 !== undefined ?
      (calculateDiscount(20.0, data.answers_morning2).includes(1) ? 'Y' : 'N') : undefined),
  change_before_7_30_20_percent_morning_2: (value, data) =>
    (data.answers_morning2 !== undefined ?
      calculateDiscount(20.0, data.answers_morning2)[0] : undefined),
  change_after_9_00_20_percent_morning_2: (value, data) =>
    (data.answers_morning2 !== undefined ?
      calculateDiscount(20.0, data.answers_morning2)[1] : undefined),
  // Not_change_time_20_percent_morning_1: NA,

  morning_30_percent_2: (value, data) =>
    (data.answers_morning2 !== undefined ?
      (calculateDiscount(30.0, data.answers_morning2).includes(1) ? 'Y' : 'N') : undefined),
  change_before_7_30_30_percent_morning_2: (value, data) =>
    (data.answers_morning2 !== undefined ?
      calculateDiscount(30.0, data.answers_morning2)[0] : undefined),
  change_after_9_00_30_percent_morning_2: (value, data) =>
    (data.answers_morning2 !== undefined ?
      calculateDiscount(30.0, data.answers_morning2)[1] : undefined),
  // Not_change_time_30_percent_morning_1: NA,

  morning_40_percent_2: (value, data) =>
    (data.answers_morning2 !== undefined ?
      (calculateDiscount(40.0, data.answers_morning2).includes(1) ? 'Y' : 'N') : undefined),
  change_before_7_30_40_percent_morning_2: (value, data) =>
    (data.answers_morning2 !== undefined ?
      calculateDiscount(40.0, data.answers_morning2)[0] : undefined),
  change_after_9_00_40_percent_morning_2: (value, data) =>
    (data.answers_morning2 !== undefined ?
      calculateDiscount(40.0, data.answers_morning2)[1] : undefined),
  // Not_change_time_40_percent_morning_1: NA,
  Reason_for_not_before_7_30_morning_2: value => (value !== undefined ? value + 1 : undefined),
  Reason_for_not_after_9_00_morning_2: value => (value !== undefined ? value + 1 : undefined),
  minimum_discount_morning_2: (value, data) =>
    (data.answers_morning2 !== undefined ?
      findMinimum(data.answers_morning2) : undefined),

  // evening slot 1
  before_17_00_evening_1: (value, data) =>
    calculateDifference(data['4.1.6 hour'], data['4.1.6 minutes'], 17 * 60, 0)[0],
  after_19_00_evening_1: (value, data) =>
    calculateDifference(data['4.1.6 hour'], data['4.1.6 minutes'], 0, 19 * 60)[1],

  evening_10_precent_1: (value, data) =>
    (data.answers_evening1 !== undefined ?
      (calculateDiscount(10.0, data.answers_evening1).includes(1) ? 'Y' : 'N') : undefined),
  change_before_17_00_10_percent_evening_1: (value, data) =>
    (data.answers_evening1 !== undefined ?
      calculateDiscount(10.0, data.answers_evening1)[0] : undefined),
  change_after_19_00_10_percent_evening_1: (value, data) =>
    (data.answers_evening1 !== undefined ?
      calculateDiscount(10.0, data.answers_evening1)[1] : undefined),
  // Not_change_time_10_percent_morning_1: NA,

  evening_20_percent_1: (value, data) =>
    (data.answers_evening1 !== undefined ?
      (calculateDiscount(20.0, data.answers_evening1).includes(1) ? 'Y' : 'N') : undefined),
  change_before_17_00_20_percent_evening_1: (value, data) =>
    (data.answers_evening1 !== undefined ?
      calculateDiscount(20.0, data.answers_evening1)[0] : undefined),
  change_after_19_00_20_percent_evening_1: (value, data) =>
    (data.answers_evening1 !== undefined ?
      calculateDiscount(20.0, data.answers_evening1)[1] : undefined),
  // Not_change_time_20_percent_morning_1: NA,

  evening_30_percent_1: (value, data) =>
    (data.answers_evening1 !== undefined ?
      (calculateDiscount(30.0, data.answers_evening1).includes(1) ? 'Y' : 'N') : undefined),
  change_before_17_00_30_percent_evening_1: (value, data) =>
    (data.answers_evening1 !== undefined ?
      calculateDiscount(30.0, data.answers_evening1)[0] : undefined),
  change_after_19_00_30_percent_evening_1: (value, data) =>
    (data.answers_evening1 !== undefined ?
      calculateDiscount(30.0, data.answers_evening1)[1] : undefined),
  // Not_change_time_30_percent_morning_1: NA,

  evening_40_percent_1: (value, data) =>
    (data.answers_evening1 !== undefined ?
      (calculateDiscount(40.0, data.answers_evening1).includes(1) ? 'Y' : 'N') : undefined),
  change_before_17_00_40_percent_evening_1: (value, data) =>
    (data.answers_evening1 !== undefined ?
      calculateDiscount(40.0, data.answers_evening1)[0] : undefined),
  change_after_19_00_40_percent_evening_1: (value, data) =>
    (data.answers_evening1 !== undefined ?
      calculateDiscount(40.0, data.answers_evening1)[1] : undefined),
  // Not_change_time_40_percent_morning_1: NA,
  Reason_for_not_before_17_00_evening_1: value => (value !== undefined ? value + 1 : undefined),
  Reason_for_not_after_19_00_evening_1: value => (value !== undefined ? value + 1 : undefined),
  minimum_discount_evening_1: (value, data) =>
    (data.answers_evening1 !== undefined ?
      findMinimum(data.answers_evening1) : undefined),

  // evening slot 1
  before_18_00_evening_2: (value, data) =>
    calculateDifference(data['4.1.6 hour'], data['4.1.6 minutes'], 18 * 60, 0)[0],
  after_20_00_evening_2: (value, data) =>
    calculateDifference(data['4.1.6 hour'], data['4.1.6 minutes'], 0, 20 * 60)[1],

  evening_10_precent_2: (value, data) =>
    (data.answers_evening2 !== undefined ?
      (calculateDiscount(10.0, data.answers_evening2).includes(1) ? 'Y' : 'N') : undefined),
  change_before_18_00_10_percent_evening_2: (value, data) =>
    (data.answers_evening2 !== undefined ?
      calculateDiscount(10.0, data.answers_evening2)[0] : undefined),
  change_after_20_00_10_percent_evening_2: (value, data) =>
    (data.answers_evening2 !== undefined ?
      calculateDiscount(10.0, data.answers_evening2)[1] : undefined),
  // Not_change_time_10_percent_morning_1: NA,

  evening_20_percent_2: (value, data) =>
    (data.answers_evening2 !== undefined ?
      (calculateDiscount(20.0, data.answers_evening2).includes(1) ? 'Y' : 'N') : undefined),
  change_before_18_00_20_percent_evening_2: (value, data) =>
    (data.answers_evening2 !== undefined ?
      calculateDiscount(20.0, data.answers_evening2)[0] : undefined),
  change_after_20_00_20_percent_evening_2: (value, data) =>
    (data.answers_evening2 !== undefined ?
      calculateDiscount(20.0, data.answers_evening2)[1] : undefined),
  // Not_change_time_20_percent_morning_1: NA,

  evening_30_percent_2: (value, data) =>
    (data.answers_evening2 !== undefined ?
      (calculateDiscount(30.0, data.answers_evening2).includes(1) ? 'Y' : 'N') : undefined),
  change_before_18_00_30_percent_evening_2: (value, data) =>
    (data.answers_evening2 !== undefined ?
      calculateDiscount(30.0, data.answers_evening2)[0] : undefined),
  change_after_20_00_30_percent_evening_2: (value, data) =>
    (data.answers_evening2 !== undefined ?
      calculateDiscount(30.0, data.answers_evening2)[1] : undefined),
  // Not_change_time_30_percent_morning_1: NA,

  evening_40_percent_2: (value, data) =>
    (data.answers_evening2 !== undefined ?
      (calculateDiscount(40.0, data.answers_evening2).includes(1) ? 'Y' : 'N') : undefined),
  change_before_18_00_40_percent_evening_2: (value, data) =>
    (data.answers_evening2 !== undefined ?
      calculateDiscount(40.0, data.answers_evening2)[0] : undefined),
  change_after_20_00_40_percent_evening_2: (value, data) =>
    (data.answers_evening2 !== undefined ?
      calculateDiscount(40.0, data.answers_evening2)[1] : undefined),
  // Not_change_time_40_percent_morning_1: NA,
  Reason_for_not_before_18_00_evening_2: value => (value !== undefined ? value + 1 : undefined),
  Reason_for_not_after_20_00_evening_2: value => (value !== undefined ? value + 1 : undefined),
  minimum_discount_evening_2: (value, data) =>
    (data.answers_evening2 !== undefined ?
      findMinimum(data.answers_evening2) : undefined),

  Opinion: value => value + 1,
  factor_1: (value, data) => data['5.2'][0],
  factor_2: (value, data) => data['5.2'][1],
  factor_3: (value, data) => data['5.2'][2],
  factor_4: (value, data) => data['5.2'][3],
};


export default function (data) {
  return axios.get(`${process.env.PUBLIC_URL}/data/dist-fare.json`)
    .then((response) => {
      data.distFare = response.data;
      const result = Object.keys(format).reduce((acc, key) => {
        const id = qid[key];
        const transformer = convertor[key];
        let value = data[id];
        if (transformer !== undefined) value = transformer(value, data);
        if (value === undefined) acc[key] = format[key];
        else acc[key] = value;
        return acc;
      }, {});

      return axios.post(`${process.env.PUBLIC_URL}/datain`, result);
    });
}
