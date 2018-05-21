import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { Link } from 'react-router-dom';


const titleStyle = {
  'font-size': '1em',
};

const iconStyleLeft = {
  color: '#FFF',
};

const TitleBar = () => (
  <AppBar
    titleStyle={titleStyle}
    iconStyleLeft={iconStyleLeft}
    iconElementLeft={<Link to="/" ><IconButton><NavigationClose /></IconButton></Link>}
    title="แบบสำรวจพฤติกรรมของผู้ใช้บริการรถไฟฟ้า แอร์พอร์ต เรล ลิงก์ ที่มีต่อการลดราคาค่าโดยสารนอกชั่วโมงเร่งด่วน"
  />
);

export default TitleBar;
