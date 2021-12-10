import React, { Component, createRef, forwardRef } from 'react';
import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';

// import { connect } from 'react-redux';
// import { CountdownCircleTimer } from 'react-countdown-circle-timer';

// style
// import styled from 'styled-components';
// import Zoom from '@material-ui/core/Zoom';
// import { Button, makeStyles } from '@material-ui/core';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import Typography from '@material-ui/core/Typography';
import {
  IoMicSharp,
  IoMicOffSharp,
  IoVideocamOff,
  IoVideocam,
} from 'react-icons/io5';
// import './Game.css';
// import './UserVideo.css';

// features
import UserVideoComponent from './UserVideoComponent';

// actions

const OPENVIDU_SERVER_URL = 'https://' + window.location.hostname + ':4443';
const OPENVIDU_SERVER_SECRET = 'MY_SECRET';

// const Sbutton = styled.button`
//   background: linear-gradient(45deg, #ff859f 30%, #ffa87a 70%);
//   border-radius: 7px;
//   border: 0;
//   fontweight: bold;
//   color: white;
//   height: 40px;
//   padding: 0 30px;
//   box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
//   &:hover {
//     background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 70%);
//   }
// `;
// // 전체 컨테이너
// const useStyles = makeStyles({
//   root: {
//     minWidth: 50,
//   },
//   bullet: {
//     display: 'inline-block',
//     margin: '0 2px',
//     transform: 'scale(0.8)',
//   },
//   title: {
//     fontSize: 14,
//   },
//   pos: {
//     marginBottom: 12,
//   },
// });
// const Wrapper = styled.div`
//   display: flex;
//   padding: 0px 0px 0px 0px;
//   min-height: 100vh;
//   height: auto;
//   width: 100%;
// `;
// const NavWrapper = styled.div`
//   height: 65px;
//   display: flex;
//   justify-content: space-between;
//   position: fixed;
//   width: 100%;
//   align-items: center;
//   border-bottom: solid rgba(248, 208, 83, 0.5);
//   background-color: rgba(246, 245, 253, 1);
//   z-index: 999;
// `;
// const HeaderWrapper = styled.div`
//   margin: 0 2em 0 2em;
//   display: flex;
//   justify-content: space-between;
//   width: 100%;
//   align-items: center;
// `;

// const Logo = styled.img`
//   width: 200px;
//   height: 100px;
// `;
// const Buttons = styled.ul`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   & > * {
//     margin-right: 20px;
//     margin-left: 20px;
//   }
// `;
// const LeftList = styled.ul`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-size: 20px;
//   & > * {
//     margin-right: 10px;
//     margin-left: 10px;
//   }
// `;

// // modal
// const RankDialog = styled(Dialog)`
//   opacity: 0.97;
//   padding: 0 50px 0 100px;
//   & .MuiPaper-rounded {
//     border-radius: 15px;
//   }
// `;

// const RankDialogTitle = styled(DialogTitle)`
//   display: flex;
//   justify-content: center;
//   background-color: rgba(106, 96, 169, 0.5);
//   padding-bottom: 0;

//   & > .MuiTypography-root {
//     display: flex;
//     align-items: center;
//   }
// `;

// const Title = styled.p`
//   font-weight: bold;
//   font-size: 2rem;
//   color: white;
//   margin-bottom: 40px;
// `;

// const CancelButton = styled(CgClose)`
//   cursor: pointer;
//   color: white;
//   justify-self: flex-end;
// `;

// const RankDialogContent = styled(DialogContent)`
//   display: flex;
//   color: white;
//   flex-direction: column;
//   background-color: rgba(106, 96, 169, 0.5);
// `;

// const RankDialogContentText = styled(DialogContentText)``;

// const RankDialogActions = styled(DialogActions)`
//   flex-direction: row;
// `;

// const RankRecordContainer = styled(Table)`
//   color: white;
//   display: flex;
// `;

// const CustomTableCell = styled(TableCell)`
//   font-size: 1.2rem;
// `;

// const BadgesContainer = styled.div`
//   margin-top: 50px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const Badges = styled.div`
//   display: flex;
//   justify-content: center;
// `;

// const BadgeContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const Badge = styled.img`
//   width: 100px;
//   padding: 0 10px;
//   margin-bottom: 10px;
// `;

// const BodyTableCell = styled(TableCell)`
//   font-size: 1.5rem;
// `;

// const Transition = forwardRef(function Transition(props, ref) {
//   return <Zoom in ref={ref} {...props} />;
// });

// const music = new Audio(gamemusic2);
class Openvidu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mySessionId: undefined,
      myUserName: undefined,
      session: undefined,
      mainStreamManager: undefined,
      publisher: undefined,
      subscribers: [],
      // started: false,
      // readystate: 'ready',
      // gametype: 'pushUp',
      // status: 'up',
      check: false,
      count: 0,
      webcam: undefined,
      model: undefined,
      URL: undefined,
      // ranking: new Map(),
      // sortedrank: new Map(),
      // rankdata: undefined,
      messages: [],
      chaton: false,
      message: '',
      ishost: false,
      // timer: false,
      gameId: undefined,
      token: undefined,
      audiostate: false,
      videostate: true,
      headerText: '',
      arrow: false,
      leaved: false,
      // isRankModalOpen: false,
      // startbuttonstate: true,
      // finalRank: [],
      isFliped: true,
    };

    this.joinSession = this.joinSession.bind(this);
    // this.leaveSession = this.leaveSession.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    // this.startButton = this.startButton.bind(this);
    // this.loop = this.loop.bind(this);
    // this.start = this.start.bind(this);
    // this.init = this.init.bind(this);
    // this.pushUppredict = this.pushUppredict.bind(this);
    // this.squatpredict = this.squatpredict.bind(this);
    // this.burpeepredict = this.burpeepredict.bind(this);
    // this.renderTableData = this.renderTableData.bind(this);
    // this.chattoggle = this.chattoggle.bind(this);
    // ref
    // this.messageContainer = createRef(null);
    // this.sendmessageByClick = this.sendmessageByClick.bind(this);
    // this.sendmessageByEnter = this.sendmessageByEnter.bind(this);
    // this.handleChatMessageChange = this.handleChatMessageChange.bind(this);
    // this.closeRankModal = this.closeRankModal.bind(this);
  }

  handleChangeSessionId(e) {
    this.setState({
      mySessionId: e.target.value,
    });
  }

  handleChatMessageChange(e) {
    this.setState({
      message: e.target.value,
    });
  }

  handleChangeUserName(e) {
    this.setState({
      myUserName: e.target.value,
    });
  }

  handleMainVideoStream(stream) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream,
      });
    }
  }

  deleteSubscriber(streamManager) {
    let subscribers = this.state.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({
        subscribers,
      });
    }
  }

  joinSession() {
    // --- 1) Get an OpenVidu object ---

    this.OV = new OpenVidu();

    // --- 2) Init a session ---

    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        let mySession = this.state.session;

        // --- 3) Specify the actions when events take place in the session ---

        // On every new Stream received...
        mySession.on('streamCreated', (event) => {
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own
          let subscriber = mySession.subscribe(event.stream, undefined);
          let subscribers = this.state.subscribers;
          subscribers.push(subscriber);

          // Update the state with the new subscribers
          this.setState({
            subscribers,
          });
        });
        // mySession.on('signal:start', (event) => {
        //   this.setState({ gameId: event.data });
        //   this.start();
        // });
        // mySession.on('signal:count', (event) => {
        //   let countdata = event.data.split(',');
        //   this.state.ranking.set(countdata[0], countdata[1]);
        //   this.setState({
        //     sortedrank: new Map(
        //       [...this.state.ranking.entries()].sort((a, b) => b[1] - a[1])
        //     ),
        //   });
        //   this.setState({ rankdata: [] });
        //   this.state.sortedrank.forEach((item, index) => {
        //     this.state.rankdata = [
        //       ...this.state.rankdata,
        //       { nickname: index, count: item },
        //     ];
        //   });
        //   this.renderTableData();
        // });
        // mySession.on('signal:chat', (event) => {
        //   let chatdata = event.data.split(',');
        //   if (chatdata[0] !== this.state.myUserName) {
        //     this.setState({
        //       messages: [
        //         ...this.state.messages,
        //         {
        //           userName: chatdata[0],
        //           text: chatdata[1],
        //           chatClass: 'messages__item--visitor',
        //         },
        //       ],
        //     });
        //   }
        // });
        // On every Stream destroyed...
        mySession.on('streamDestroyed', (event) => {
          // Remove the stream from 'subscribers' array
          this.updateHost().then((clientData) => {
            const host = JSON.parse(clientData).clientData;

            mySession
              .signal({
                data: host,
                to: [],
                type: 'update-host',
              })
              .then(() => {})
              .catch((error) => {});
          });
          this.deleteSubscriber(event.stream.streamManager);
        });
        mySession.on('signal:update-host', (event) => {
          if (this.state.myUserName === event.data) {
            this.setState({ ishost: true });
          }
        });
        // On every asynchronous exception...
        mySession.on('exception', (exception) => {});

        // --- 4) Connect to the session with a valid user token ---

        // 'getToken' method is simulating what your server-side should do.
        // 'token' parameter should be retrieved and returned by your own backend

        // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
        // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
        this.getToken().then((token) => {
          // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
          // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
          mySession
            .connect(token, { clientData: this.state.myUserName })
            .then(() => {
              this.updateHost().then((firstUser) => {
                const host = JSON.parse(firstUser).clientData;

                if (this.state.myUserName === host)
                  this.setState({ ishost: true });
              });
              // --- 5) Get your own camera stream ---

              // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
              // element: we will manage it on our own) and with the desired properties
              let publisher = this.OV.initPublisher(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: undefined, // The source of video. If undefined default webcam
                publishAudio: false, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                resolution: '640x480', // The resolution of your video
                frameRate: 30, // The frame rate of your video
                insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                mirror: false, // Whether to mirror your local video or not
              });

              // --- 6) Publish your stream ---

              mySession.publish(publisher);

              // Set the main video in the page to display our webcam and store our Publisher
              this.setState({
                mainStreamManager: publisher,
                publisher,
              });
            })
            .catch((error) => {});
        });
      }
    );
  }

  // 오픈비두 API를 사용해 현재 방의 참가자 정보 획득(session 필요)
  // 일단은 CORS 때문에 'Access-Control-Allow-Origin'으로 해결했으나 실제로 구현할 땐..?
  // updateHost() {
  //   return new Promise((resolve, reject) => {
  //     $.ajax({
  //       type: 'GET',
  //       url: `${'https://i5a608.p.ssafy.io:8443/api/sessions/'}${
  //         this.state.mySessionId
  //       }/connection`,
  //       headers: {
  //         Authorization: `Basic ${btoa(
  //           `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`
  //         )}`,
  //         'Access-Control-Allow-Origin': '*',
  //         'Access-Control-Allow-Methods': 'GET,POST',
  //       },
  //       success: (response) => {
  //         let content = response.content;
  //         content.sort((a, b) => a.createdAt - b.createdAt);

  //         resolve(content[0].clientData);
  //       },
  //       error: (error) => reject(error),
  //     });
  //   });
  // }

  // 시작버튼
  // leaveSession() {
  //   // --- 7) Leave the session by calling 'disconnect' method over the Session object ---
  //   const mySession = this.state.session;
  //   if (mySession) {
  //     mySession.disconnect();
  //   }
  //   axios1
  //     .put('/api/rooms', {
  //       roomId: this.state.mySessionId,
  //     })
  //     .then(() => {
  //       // Empty all properties...
  //       this.OV = null;
  //       this.setState({
  //         leaved: true,
  //         session: '',
  //         subscribers: [],
  //         mySessionId: 'SessionA',
  //         myUserName: `Participant${Math.floor(Math.random() * 100)}`,
  //         mainStreamManager: undefined,
  //         publisher: undefined,
  //       });

  //       this.props.history.push('/');
  //     });
  // }


  getToken() {
    return this.createSession(this.state.mySessionId).then((sessionId) =>
      this.createToken(sessionId)
    );
  }

  createSession(sessionId) {
    return new Promise((resolve, reject) => {
      let data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(`${OPENVIDU_SERVER_URL}/openvidu/api/sessions`, data, {
          headers: {
            Authorization: `Basic ${btoa(
              `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`
            )}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          resolve(response.data.id);
        })
        .catch((response) => {
          let error = { ...response };
          if (error?.response?.status === 409) {
            resolve(sessionId);
          } else if (
            window.confirm(
              `No connection to OpenVidu Server. This may be a certificate error at "${OPENVIDU_SERVER_URL}"\n\nClick OK to navigate and accept it. ` +
                `If no certificate warning is shown, then check that your OpenVidu Server is up and running at "${OPENVIDU_SERVER_URL}"`
            )
          ) {
            window.location.assign(`${OPENVIDU_SERVER_URL}/accept-certificate`);
          }
        });
    });
  }

  createToken(sessionId) {
    return new Promise((resolve, reject) => {
      let data = {};
      axios
        .post(
          `${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${sessionId}/connection`,
          data,
          {
            headers: {
              Authorization: `Basic ${btoa(
                `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`
              )}`,
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  }

  render() {
    // const classes = useStyles;

    return (
      <div>
        <div>
        {/* <Buttons> */}
          {this.state.audiostate ? (
            <IoMicSharp
              color="#9FA9D8"
              size="24"
              onClick={() => {
                this.state.publisher.publishAudio(!this.state.audiostate);
                this.setState({ audiostate: !this.state.audiostate });
              }}
            />
          ) : (
            <IoMicOffSharp
              color="#50468c"
              size="24"
              onClick={() => {
                this.state.publisher.publishAudio(!this.state.audiostate);
                this.setState({ audiostate: !this.state.audiostate });
              }}
            />
          )}
          {this.state.videostate ? (
            <IoVideocam
              color="#9FA9D8"
              size="24"
              onClick={() => {
                this.state.publisher.publishVideo(!this.state.videostate);
                this.setState({ videostate: !this.state.videostate });
              }}
            />
          ) : (
            <IoVideocamOff
              color="#50468c"
              size="24"
              onClick={() => {
                this.state.publisher.publishVideo(!this.state.videostate);
                this.setState({ videostate: !this.state.videostate });
              }}
            />
          )}
        {/* </Buttons> */}
        </div>

        <div id="session">
          <div id="video-container" className="video-container">
            {/* {this.state.publisher !== undefined ? ( */}
              <div
                className="stream-container"
                onClick={() =>
                  this.handleMainVideoStream(this.state.publisher)
                }
              >
                <UserVideoComponent streamManager={this.state.publisher} />
              </div>
            {/* // ) : null} */}
            {/* {this.state.subscribers.map((sub, i) => (
              <div
                key={i}
                className="stream-container"
                onClick={() => this.handleMainVideoStream(sub)}
              >
                <UserVideoComponent streamManager={sub} />
              </div>
            ))} */}
          </div>
        </div>

        {/* {this.state.session !== undefined ? (
          <div id="session">
            <div id="video-container" className="video-container">
              {this.state.publisher !== undefined ? (
                <div
                  className="stream-container"
                  onClick={() =>
                    this.handleMainVideoStream(this.state.publisher)
                  }
                >
                  <UserVideoComponent streamManager={this.state.publisher} />
                </div>
              ) : null}
              {this.state.subscribers.map((sub, i) => (
                <div
                  key={i}
                  className="stream-container"
                  onClick={() => this.handleMainVideoStream(sub)}
                >
                  <UserVideoComponent streamManager={sub} />
                </div>
              ))}
            </div>
          </div>
        ) : null} */}

      </div>
    );
  }
}

export default Openvidu;