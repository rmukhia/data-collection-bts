import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import StarRatingComponent from 'react-star-rating-component';
import { ListItem } from 'material-ui/List';
import sendRequest from '../utils/send-request';

import Question from './question';
import { addActionCreator } from '../actions/add-data';

const forwardIcon = <FontIcon className="material-icons">arrow_forward_ios</FontIcon>;

const paperStyle = {
  margin: 15,
  padding: 10,
  textAlign: 'center',
};

const count = names =>
  names.reduce((a, b) =>
    Object.assign(a, { [b]: (a[b] || 0) + 1 }), {});

const duplicates = dict =>
  Object.keys(dict).filter(a => dict[a] > 1);

class Section extends React.Component {
  constructor(props) {
    super(props);
    this.onNextClick = this.onNextClick.bind(this);
    this.onStarClick = this.onStarClick.bind(this);
    this.questionCallback = this.questionCallback.bind(this);
    this.questions = [{
      id: '5.1',
      question: 'ท่านคิดว่าหากมีการลดราคาค่าโดยสารนอกชั่วโมงเร่งด่วนจะสามารถ ลดปัญหาความแออัด ในช่วงเช้าเวลา  07.00-09.00 น. และ ช่วงเย็นเวลา 17.00-20.00 น.  ได้หรือไม่ ',
      options: [
        'อาจจะ สามารถลดปัญหาความแออัดได้',
        'สามารถ ลดปัญหาความแออัดได้',
        'ไม่สามารถลดปัญหาความแออัดได้',
      ],
    },
    {
      id: '5.2',
      question: 'ท่านคิดว่าปัจจัยใดดังต่อไปนี้ ที่สามารถช่วยลดปัญหาความแออัดในช่วงเวลา ชม. เร่งด่วนได้ (กรุณาให้คะแนน 1-4 โดย 4 หมายถึงเห็นด้วยมากที่สุด)',
      options: [
        'ไม่มีการเข้า ออกงาน/เรียน ในเวลาที่แน่นอน',
        'การเพิ่มราคาค่าโดยสารใน ชม. เร่งด่วน',
        'การลดราคาค่าโดยสารนอก ชม. เร่งด่วน',
        'การเพิ่มขบวนรถให้เพิ่มขึ้นจากเดิม',
      ],
    },
    ];

    this.val = {};
    this.state = {
      ratings: {
      },
    };
  }

  onNextClick() {
    if (this.val.question1 === undefined ||
      Object.keys(this.state.ratings).length !== this.questions[1].options.length) {
      alert('กรุณาตอบคำถามให้ครบทุกข้อด้วยค่ะ'); // eslint-disable-line no-alert
      return;
    }
    if (duplicates(count(Object.keys(this.state.ratings).map(key =>
      this.state.ratings[key]))).length > 0) {
      alert('กรุณาให้ระดับความสำคัญ 1-4 ที่ระดับแตกต่างกัน'); // eslint-disable-line no-alert
    } else {
      this.props.addToData('5.1', this.val.question1);
      this.props.addToData('5.2', this.state.ratings);
      sendRequest(Object.assign(
        {}, this.props.data,
        {
          5.1: this.val.question1,
          5.2: this.state.ratings,
        },
      )).then((response) => {
        if (response.statusText === 'OK') alert('บันทึกข้อมูลเรียบร้อยแล้ว ขอบคุณสำหรับการทำแบบสอบถามครั้งนี้ค่ะ :) '); // eslint-disable-line no-alert
      }).catch(() => {
        alert('มีข้อผิดพลาดบางอย่าง ไม่สามารถทำการบรรทึกข้อมูลได้'); // eslint-disable-line no-alert
      }).finally(() => {
        this.props.history.push(this.props.nextPage);
      });
    }
  }

  onStarClick(nVal, pVal, n) {
    const a = {};
    a[n] = nVal;
    this.setState({
      ratings: Object.assign({}, this.state.ratings, a),
    });
  }

  questionCallback(id, value) {
    this.val[id] = value;
  }


  render() {
    const child = this.questions[1].options.map((text, index) =>
      (
        <ListItem disabled key={index} index={index}>
          {text} &nbsp; &nbsp;
          <StarRatingComponent
            name={`${index}`}
            starCount={4}
            value={this.state.ratings[index]}
            onStarClick={this.onStarClick}
          />
        </ListItem>));


    return (
      <div>
        <Question
          question={this.questions[0].question}
          id="question1"
          options={this.questions[0].options}
          key={this.questions[0].id}
          callback={this.questionCallback}
        />
        <Question
          question={this.questions[1].question}
          id="question2"
          options={[]}
          key={this.questions[1].id}
          callback={this.questionCallback}
          child={child}
        />
        <Paper zDepth={2} style={paperStyle}>
          <RaisedButton
            label="สิ้นสุดการทำแบบสอบถาม"
            labelPosition="after"
            onClick={this.onNextClick}
            primary
            icon={forwardIcon}
          />
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.data,
});

const mapDispatchToProps = dispatch => ({
  addToData: (id, value) => dispatch(addActionCreator(id, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Section);
