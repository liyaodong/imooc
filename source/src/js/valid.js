window.onload = function() {
  var encryCode = new AES.Crypto('webgeek'),
      fp = new Fingerprint().get();

  // option js
  (function() {
    if(!$('body').hasClass('option')) return false;

    var validbtn = getById('valid-btn'),
        codeInput = getById('unlockkey');

    validbtn.addEventListener('click', function() {
      validCode();
    });

    codeInput.addEventListener("keypress", function() {
      if (event.keyCode == 13) {
        validCode();
      }
    });

    chrome.storage.local.get( "fp", function (data) {
      if(fp == data.fp) {
        $('.valid').remove();
        $('#title').text('你已激活插件，愉快的开始使用吧！');
      }
      $('.root').show();
    });
  })();


  // content script js
  (function() {
    var url = window.location.origin,
        path = window.location.pathname;

    // At first , you need get video mid and video data
    // if(!/.studentstudy/.test(path) ) return false;
    console.info('plugin runing..');

    var target = 'http://ptr.chaoxing.com/multimedia/log';
    console.log(getVideoData());
//     if (isdrag == 1) {
//           var t = time.split('-')[1];
//           enc = CryptoUtils.hex_md5('>.MY[Or/s<?OJC]' + (parseInt(t * 1000)))
//       } else {
//           enc = CryptoUtils.hex_md5('>.MY[Or/s<?OJC]' + (parseInt(time * 1000)))
//       }


//     var param = {
//       clazzId: me.data.clazzId,  // ok , url contain this data
//       clipTime: clipTime, // startTime + '_' + endTime;
//       duration: me.data.duration, //
//       isdrag: isdrag, // ok , 1
//       jobid: me.data.jobid,
//       objectId: me.data.objectId,
//       otherInfo: me.data.otherInfo,
//       playingTime: time,
//       rt: me.data.rt,
//       dtype: 'Video',
//       enc: enc
//     };

//     $.ajax({type: "GET",url: me.reportUrl,data: param,dataType: "json",success: function(data, textStatus) {
//             me.logCount = 0;
//             if (data.isPassed) {
//                 me.finishJob()
//             }
//         },error: function(XMLHttpRequest, textStatus, errorThrown) {
//             me.logCount += 1;
//             if (me.logCount >= 3) {
//                 me.logCount = 0;
//                 if (Math.floor(XMLHttpRequest.status) >= 500) {
//                     alert('服务器现在繁忙，不能保证您能否正常完成任务，请您稍后继续...')
//                 } else {
//                     alert('您的网络不稳定，请您稍后继续...')
//                 }
//             }
//         }});


  })();




  function getById (id) {
    return document.getElementById(id);
  }

  function validCode () {
    var code = getById('unlockkey').value;
    var test = encryCode.decrypt(code);
    var tip  = getById('tip');
    if(test == rc()) {
      chrome.storage.local.set({"fp": fp}, function () {
        window.location.reload();
      });
    } else {
      tip.innerHTML = '校验失败';
    }
  }

  // 如果你懂代码，那何必用我的程序
  // real code
  function rc () {
    var str = new Date();
    var code = '' + str.getFullYear() + str.getMonth() + str.getDate() + str.getHours();
    return code;
  }

  function getQueryParams(qs) {
    qs = qs.split("+").join(" ");

    var params = {}, tokens,
      re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
      params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
  }

  // get video Data
  function getVideoData () {
    // console.log(window.MoocPlayers);
    // At first get video mid
    // var mid = $('iframe').eq(0).contents().find('iframe').attr('mid');
    // console.log(mid);

    function  checkFn(fnName){
      var fn = window[fnName];
      console.log(window[fnName]);
      return (fn&&typeof fn != 'undefined') ? true:false;
    }

    var loadFn = function(){
      setTimeout(function(){
        if(checkFn('MoocPlayer')){
          console.log('loaed');
        } else {
          console.log('unload,checking');
          loadFn();
        }
      },300);
    }
    // loadFn();

    // return window.MoocPlayers.getVideoData(mid);
    return 'run ok';
  }


  window.generCode = function() {
    var code = rc();
    var encode = encryCode.encrypt(code);
    console.log('你既然知道怎么激活插件那也应该知道怎么编写');
    console.log(encode);
  };



};

