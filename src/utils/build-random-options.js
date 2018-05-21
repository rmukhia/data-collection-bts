import _ from 'lodash';
import { morning1, morning2, evening1, evening2 } from '../constants/timePeriod';

const discounts = [10.0, 20.0, 30.0, 40.0];

function buildTimePeriod(timePeriod) {
  const time = {};
  switch (timePeriod) {
    case morning1:
      time.before = '07:00';
      time.after = '08:30';
      break;
    case morning2:
      time.before = '07:30';
      time.after = '09:00';
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

    let arrivalTime = 'เวลาโดยประมาณที่ท่านเดินทางมาถึงสถานี: ';
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


    const question = `หากมีการปรับลดราคาค่าโดยสารลง ${discount}% จากราคาเดิมที่ท่านจ่ายต่อเที่ยว ${normalFare} บาท เหลือเพียง ${discountFare} บาทต่อเที่ยว`;
    const subquestion = `ท่านสนใจเลื่อนเวลาการเดินทางในการใช้บริการรถไฟฟ้าแอร์พอร์ตลิงก์ ออกจากเวลา ${time.before}-${time.after} น. เพื่อรับผลประโยชน์ด้านการลดราคา หรือไม่`;
    const options = [
      `สนใจ และสามารถเลื่อนเวลาการเดินทาง เป็นก่อน ${time.before} น.ได้`,
      `สนใจ และสามารถเลื่อนเวลาการเดินทาง เป็นหลัง ${time.after} น.ได้`,
      `สนใจ และสามารถ เลื่อนเวลาการเดินทาง ทั้งก่อน ${time.before} น.และ หลัง ${time.after} น.ได้`,
      'ไม่สนใจเลื่อนเวลาการเดินทางออกจากช่วงเวลาที่กำหนด',
    ];

    return {
      normalFare,
      discountFare,
      question,
      subquestion,
      options,
      timePeriod,
      discount,
      value,
      arrivalTime,
    };
  });
}

export {
  discounts,
  buildTimePeriod,
  buildOptions,
};
