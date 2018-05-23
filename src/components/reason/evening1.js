import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';

import Question from '../question';
import { addActionCreator } from '../../actions/add-data';

const forwardIcon = <FontIcon className="material-icons">arrow_forward_ios</FontIcon>;

const paperStyleNext = {
  margin: 15,
  padding: 10,
  textAlign: 'center',
};

class ReasonCalculatorEvening1 extends React.Component {
  constructor(props) {
    super(props);
    this.onNextClick = this.onNextClick.bind(this);
    this.callbackQuestion = this.callbackQuestion.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    // Generate all questions
    this.questions = this.buildQuestions();
    // Generate required indices
    const indices = this.generateRequiredIncides();
    // Filter questions based on the indices
    this.questions = this.questions.filter((elem, index) => indices.includes(index));

    this.state = {
      currentIndex: 0,
      data: {},
    };
    this.text = {};
    // No more questions to ask
    if (indices.length === 0) {
      this.props.history.push('/discount-calculator/evening2');
    }
  }

  onNextClick() {
    const { currentIndex } = this.state;
    if (currentIndex + 1 >= this.questions.length) {
      if (Object.keys(this.state.data).length !== this.questions.length) {
        alert('กรุณาตอบคำถามให้ครบทุกข้อด้วยค่ะ'); // eslint-disable-line no-alert
      } else {
        Object.keys(this.state.data).forEach((key) => {
          const ques = this.questions.find(e => e.id === key);
          if (ques.options.length === this.state.data[key] + 1) {
            this.props.addToData(`${key}_other`, this.text[key]);
          }
          this.props.addToData(key, this.state.data[key]);
        });
        this.props.history.push('/discount-calculator/evening2');
      }
    } else this.setState({ currentIndex: currentIndex + 1 });
  }

  generateRequiredIncides() {
    let result = [0, 1];
    this.props.data.answers_evening1.forEach((element) => {
      if (element[0] === 1) {
        // don't ask before question
        result = result.filter(elem => elem !== 0);
      }
      if (element[1] === 1) {
        // don't ask after question
        result = result.filter(elem => elem !== 1);
      }
    });
    return result;
  }

  handleTextChange(id, str) {
    this.text[id] = str;
  }

  buildQuestions() {
    return [ // morning 1
      {
        question: 'กรุณาระบุเหตุผลที่ท่านไม่สามารถเลื่อนเวลาการเดินทางเป็นก่อนเวลา 17.00 น. ได้',
        options: [
          'มีภาระด้านครอบครัว',
          'มีเวลาการออก งาน หรือ เลิกเรียน ที่แน่นอน',
          'มีเวลาการนัดหมายที่แน่นอน',
          'เนื่องจากไม่มีความยืดหยุ่นทางด้านการเดินทาง เช่น ต้องไปต่อรถที่มีเวลาการให้บริการที่แน่นอน',
          'เป็นช่วงที่รถไฟฟ้าแอร์พอร์ต เรล ลิงก์ มีความหนาแน่นมาก',
          'การลดราคาไม่มีความจูงใจมากพอ',
          <TextField
            hintText="อื่น ๆ"
            fullWidth
            onChange={(e, str) => this.handleTextChange('4.2.7', str)}
          />,
        ],
        id: '4.2.7',
      },
      {
        question: 'กรุณาระบุเหตุผลที่ท่านไม่สามารถเลื่อนเวลาการเดินทางหลังเวลา 19.00 น. ได้',
        options: [
          'มีภาระด้านครอบครัว',
          'มีเวลาการออก งาน หรือ เลิกเรียน ที่แน่นอน',
          'มีเวลาการนัดหมายที่แน่นอน ',
          'เนื่องจากไม่มีความยืดหยุ่นทางด้านการเดินทาง เช่น ต้องไปต่อรถที่มีเวลาการให้บริการที่แน่นอน',
          'เป็นช่วงที่รถไฟฟ้าแอร์พอร์ต เรล ลิงก์ มีความหนาแน่นมาก',
          'การลดราคาไม่มีความจูงใจมากพอ',
          <TextField
            hintText="อื่น ๆ"
            fullWidth
            onChange={(e, str) => this.handleTextChange('4.2.8', str)}
          />,
        ],
        id: '4.2.8',
      }, // Evening 2
    ];
  }

  callbackQuestion(id, value) {
    const a = {};
    a[id] = value;
    this.setState({ data: Object.assign({}, this.state.data, a) });
  }

  render() {
    if (this.questions.length > 0) {
      const currData = this.questions[this.state.currentIndex];

      return (
        <div>
          <Paper zDepth={1} style={paperStyleNext}>
            <h3>แบบทดสอบช่วงเวลาเร่งด่วนช่วงเย็น ช่วงที่ 1 (17.00-19.00 น.)</h3>
          </Paper>
          <Question
            question={currData.question}
            options={currData.options}
            id={currData.id}
            value={this.state.data[currData.id]}
            key={currData.id}
            callback={this.callbackQuestion}
          />
          <Paper zDepth={2} style={paperStyleNext}>
            <RaisedButton
              label="ถัดไป"
              labelPosition="after"
              onClick={this.onNextClick}
              primary
              icon={forwardIcon}
            />
          </Paper>
        </div>);
    }
    return (<div />);
  }
}

const mapStateToProps = state => ({
  data: state.data,
});

const mapDispatchToProps = dispatch => ({
  addToData: (id, value) => dispatch(addActionCreator(id, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReasonCalculatorEvening1);

