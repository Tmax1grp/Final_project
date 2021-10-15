import React from 'react';
import { OpenVidu } from 'openvidu-browser';
// import OpenViduSession from 'openvidu-react';

import axios from 'axios';

export default function Lecture() {
  var OV;
  var session;
  var sessionName;	// Name of the video session the user will connect to
  var token;      // Token retrieved from OpenVidu Server
  var sessiontitle;

  const createSession = e => {
    // e.preventDefault();
    var url = '/lecture-service/api-sessions/create-session'
    var classroomId={
      'classroomId' : 1
    }
    var config={
      headers:{
        'Content-Type' : 'application/json',
        'Authorization': sessionStorage.token
      }
    }
    axios.post(url, classroomId, config)
    .then(res => {
      console.log(res.data)
      console.log("성공")
    })
    .catch(err => {
      console.log(err)
    })
  }
  
  const joinSession = (e) => {
    getToken((token) => {
      OV = new OpenVidu();
      session = OV.initSession();
      console.dir(OV)
      console.dir(session)
      session.on('streamCreated', (event) => {
        var subscriber = session.subscribe(event.stream, 'videocontainer');
        subscriber.on('videoElementCreated', (event) => {
          appendUserData(event.element, subscriber.stream.connection);
        });
      });
		  session.on('streamDestroyed', (event) => {
        removeUserData(event.stream.connection);
      });
      session.on('exception', (exception) => {
        console.warn(exception);
      });
      
      var nickName = "jieun";
      session.connect(token, { clientData: nickName })
        .then(() => {
          var userName = "publisher";
          // this.sessiontitle.text(sessionName);
          // this.join.hide();
          // this.session.show();
          if (isPublisher(userName)) {
            var publisher = OV.initPublisher('videocontainer', {
              audioSource: undefined, // The source of audio. If undefined default microphone
              videoSource: undefined, // The source of video. If undefined default webcam
              publishAudio: true,  	// Whether you want to start publishing with your audio unmuted or not
              publishVideo: true,  	// Whether you want to start publishing with your video enabled or not
              resolution: '640x480',  // The resolution of your video
              frameRate: 30,			// The frame rate of your video
              insertMode: 'APPEND',	// How the video is inserted in the target element 'video-container'
              mirror: false       	// Whether to mirror your local video or not
            });
					  publisher.on('videoElementCreated', (event) => {
              var userData = {
                nickName: "jieun",
                userName: "publisher"
              };
              initMainVideo(event.element, userData);
              appendUserData(event.element, userData);
              this.event.element.prop('muted', true); // Mute local video
            })
              session.publish(publisher);
				  } else {
            console.warn('You don\'t have permissions to publish');
            initMainVideoThumbnail(); // Show SUBSCRIBER message in main video
				  }
        })
			.catch(error => {
				console.warn('There was an error connecting to the session:', error.code, error.message);
			});
	  });
	  return false;
  }

  function getToken(callback) {
    sessionName = 1
    // sessionName = this.sessionName.val(); // Video-call chosen by the User
    httpPostRequest(
      '/lecture-service/api-sessions/generate-token',
      {classroomId: 1},
      'Request of TOKEN gone WRONG:',
      (response) => {
        token = response; // Get token from response
        console.dir(token)
        console.warn('Request of TOKEN gone WELL (TOKEN:' + token + ')');
        callback(token); // Continue the join operation
      }
    );  
  }

  function httpPostRequest(url, body, errorMsg, callback) {
    // var url = 'http://localhost:8000/lecture-service/api-sessions/generate-token'
    // var http = new XMLHttpRequest();
    // http.open('POST', url, true);
    // http.setRequestHeader('Content-type', 'application/json');
    // http.setRequestHeader('Authorization', sessionStorage.token);
    // http.addEventListener('readystatechange', processRequest, false);
    // http.send(JSON.stringify(body));
  
    // function processRequest() {
    //   if (http.readyState === 4) {
    //     if (http.status === 200) {
    //       try {
    //         callback(JSON.parse(http.responseText));
    //       } catch (e) {
    //         callback();
    //       }
    //     } else {
    //       console.warn(errorMsg);
    //       console.warn(http.responseText);
    //     }
    //   }
    // }
    
    var config={
      headers:{
        'Content-Type' : 'application/json',
        'Authorization': sessionStorage.token
      }
    }
    axios.post(url, body, config)
    .then(res => {
      callback(res.data[0])
      console.dir(res.data[0])
      // callback(res.data[0].split('&')[1].split('=')[1]);
    })
    .catch(err => {
      console.log(err)
      console.log(errorMsg)
      callback();
    })
  }
  
  function appendUserData(videoElement, connection) {
    var clientData;
    var serverData;
    var nodeId;
    if (connection.nickName) { // Appending local video data
      clientData = connection.nickName;
      serverData = connection.userName;
      nodeId = 'main-videodata';
    } else {
      clientData = JSON.parse(connection.data.split('%/%')[0]).clientData;
      serverData = JSON.parse(connection.data.split('%/%')[1]).serverData;
      nodeId = connection.connectionId;
    }
    var dataNode = document.createElement('div');
    dataNode.className = "data-node";
    dataNode.id = "data-" + nodeId;
    dataNode.innerHTML = "<p class='nickName'>" + clientData + "</p><p class='userName'>" + serverData + "</p>";
    videoElement.parentNode.insertBefore(dataNode, videoElement.nextSibling);
    addClickListener(videoElement, clientData, serverData);
  }

  function addClickListener(videoElement, clientData, serverData) {
    videoElement.addEventListener('click', function () {
      var mainVideo = this.mainvideo.video.get(0);
      if (mainVideo.srcObject !== videoElement.srcObject) {
        this.mainvideo.fadeOut("fast", () => {
          this.mainvideo.p.nickName.html(clientData);
          this.mainvideo.p.userName.html(serverData);
          mainVideo.srcObject = videoElement.srcObject;
          this.mainvideo.fadeIn("fast");
        });
      }
    });
  }
  
  function removeUserData(connection) {
    var userNameRemoved = "data-" + connection.connectionId;
    if (this.userNameRemoved.find.p.userName.html() === this.mainvideo.p.userName.html()) {
      cleanMainVideo(); // The participant focused in the main video has left
    }
    userNameRemoved.remove();
  }

  function cleanMainVideo() {
    this.mainvideo.video.get(0).srcObject = null;
    this.mainvideo.p.each(function () {
      this.html('');
    });
  }

  function isPublisher(userName) {
    return userName.includes('publisher');
  }

    function initMainVideo(videoElement, userData) {
    this.mainvideo.video.get(0).srcObject = videoElement.srcObject;
    this.mainvideo.p.nickName.html(userData.nickName);
    this.mainvideo.p.userName.html(userData.userName);
    this.mainvideo.video.prop('muted', true);
  }
  
  function initMainVideoThumbnail() {
    this.mainvideo.video.css("background", "url('images/subscriber-msg.jpg') round");
  }
  
  const leaveSession = () => {

    // --- 9) Leave the session by calling 'disconnect' method over the Session object ---
  
    // session.disconnect();
    // session = null;
  
    // Removing all HTML elements with the user's nicknames
    cleanSessionView();
  
  //   this.join.show();
  //   this.session.hide();
  }


  function cleanSessionView() {
    // removeAllUserData();
    cleanMainVideo();
    // this.mainvideo.video.css("background", "");
  }

  // function removeUser() {
  //   httpPostRequest(
  //     'api-sessions/remove-user',
  //     {sessionName: sessionName, token: token},
  //     'User couldn\'t be removed from session',
  //     (response) => {
  //       console.warn("You have been removed from session " + sessionName);
  //     }
  //   );
  // }

  // const handlerJoinSessionEvent = () => {
  //   console.log('Join session');
  // }

  // const handlerLeaveSessionEvent = () => {
  //   console.log('Leave session');
  //   this.setState({
  //     session: undefined,
  //   });
  // }

  // const handlerErrorEvent = () => {
  //   console.log('Leave session');
  // }


  return (
    <div>
      <div id="maincontainer" className="container">
        <h1>Join a video session</h1>
        <p className="text-center">
          <button className="btn btn-lg btn-success" onClick={createSession}>Create</button>
        </p>
        <p className="text-center">
          <button className="btn btn-lg btn-success" onClick={joinSession}>Join</button>
        </p>
      </div> 

      <div>
        {/* <div id="session" style="display: none;"> */}
        <div id="session">
          {/* <div id="sessionheader"> */}
            <h1 id="sessiontitle"></h1>
            <input className="btn btn-large btn-danger" type="button" id="buttonLeaveSession" onMouseUp={leaveSession} value="Leave session" />
            누르면 에러ㅠㅠ
          {/* </div> */}
          <div id="mainvideo" className="col-md-6" value={sessionStorage.userName}>
            <p className="nickName"></p>
            <p className="userName">userName : {sessionStorage.userName}</p>
            <video autoPlay playsInline={true}></video>
          </div>
          <div id="videocontainer" className="col-md-6"></div>
        </div>
        {/* <div id="session">
          <OpenVidu
            id="opv-session"
            // sessionName={mySessionId}
            // user={myUserName}
            // token={token}
            // joinSession={handlerJoinSessionEvent}
            leaveSession={handlerLeaveSessionEvent}
            // error={handlerErrorEvent}
          />
        </div> */}
      </div>
    </div>

  );
}
