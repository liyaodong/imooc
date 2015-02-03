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
    if(!/.studentstudy/.test(path) ) return false;
    $('body').append('<div id="js-video-data" style="display: none;"></div>');

    var target = 'http://ptr.chaoxing.com/multimedia/log';
    var logUrl = 'http://mooc.chaoxing.com/multimedia/log';
    getVideoData();
    // all code in dist/moocplayer.js

    function sendAjax (param) {
      $.ajax({type: "GET",url: logUrl,data: param,dataType: "json",success: function(data, textStatus) {
        // if (data.isPassed) {
        // }
      },error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert('服务器出现错误，暂时没法一键学习');
      }});
    }

    var getData = function(){
      var $jsData = $('#js-video-data');
      setTimeout(function(){
        if($jsData.text().length) {
          // load ok you can do something...
          var paramsData = $.parseJSON($jsData.text());
          sendAjax(paramsData);
        } else {
          getData();
        }
      },300);
    }

    // valid plugin regist
    var fp = new Fingerprint().get();
    chrome.storage.local.get( "fp", function (data) {
      if(fp == data.fp) {
        // if plugin regist
        getData();
        console.log('plugin runed');
      } else {
        alert('插件未注册，请在选项页面输入注册码');
      }
    });

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

    var init = function(){
      var script = document.createElement('script'),
          header = document.getElementsByTagName('head')[0];
      script.type = 'text/javascript';
      script.src = chrome.extension.getURL('dist/moocplayer.js');
      header.appendChild(script);
    }
    init();
  }

  window.generCode = function() {
    var code = rc();
    var encode = encryCode.encrypt(code);
    console.log('你既然知道怎么激活插件那也应该知道怎么编写');
    console.log(encode);
  };



};

