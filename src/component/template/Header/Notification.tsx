import { BellOutlined } from '@ant-design/icons';
import { Avatar, Badge, List, Popover } from 'antd';
import { useEffect, useState } from 'react';
// import { socket } from '../../../utils/socket';
import apisNotification from './service/apis';
import storage from '../../../utils/sessionStorage';
// import dayjs from 'dayjs';

const Notification = () => {

  const [notification, setNotification] = useState<any[]>([]);

  const userID = storage.get('user_id');
  

  const hanlerGetAllNotification = async () => {
    const res = await apisNotification.getAllNotification({userId : userID});
    if(res.status && res?.status === 200){
      setNotification(res?.data?.data);
    }
  };

  useEffect(() => {
    if(userID && userID !== ''){
      hanlerGetAllNotification();
    }
  },[]);

  useEffect(() => {
  },[notification]);

  // useEffect(() => {
  //   socket.on('notify-new-lesson', (data) => {
  //     const newNotification = {
  //       Name: 'GVCN đã gửi báo bài ' + (data.dataLesson ? 'ngày ' + dayjs(data.dataLesson.SentDay__c ).format('DD/MM/YYYY') : 'mới'),
  //       Message__c: '',
  //       ExternalID__c: 'LESSON-' + data.classId + '-' +  data.lessonId + '-' + userID,
  //       IsSeen__c: false,
  //       Type__c: 'LESSON',
  //       CreatedDate: new Date()
  //     };
  //     setNotification([newNotification, ...notification]);
  //   });
  // },[socket]);

  const [open, setOpen] = useState<boolean>();

  const getStatusTime = (milisecond : bigint) => {
    const ss = milisecond / BigInt(1000);
    const mm = ss / BigInt(60);
    const hh = mm / BigInt(24);
    const dd = hh / BigInt(24);
    const MM = dd / BigInt(7);
    const ww = MM / BigInt(4);
    const yy = ww / BigInt(12);

    if(ss < 60) return ss + ' giây trước';
    else if(mm < 60) return mm + ' phút trước';
    else if(hh < 24) return hh + ' tiếng trước';
    else if(dd < 7) return dd + ' ngày trước';
    else if(MM < 4) return MM + ' tuần trước';
    else if(ww < 12) return ww + ' tháng trước';
    return yy + ' năm trước';
  };

  return (
    <Popover
      content={
        <List
          style={{
            width: '400px'
          }}
          itemLayout="horizontal"
          dataSource={notification}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                title={<a href="/app/report-session">{item.Name}</a>}
                description={item.Message__c}
              />
              <div>{getStatusTime(BigInt((new Date).valueOf() - item.CreatedDate.valueOf()))}</div>
            </List.Item>
          )}
        />
      }
      placement='bottomRight'
      title="Thông báo"
      trigger="click"
      
      open={open}
      arrow={false}
      onOpenChange={(newValue) => setOpen(newValue)}
    >
      <Badge count={notification ? notification.reduce((total, item) => (item.IsSeen__c === false) ? total + 1 :total, 0) : 0} size='small'>
        <BellOutlined />
      </Badge>
    </Popover>
  );
};

export default Notification;