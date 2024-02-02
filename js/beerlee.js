//星空背景
function dark() {window.requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame;var n,e,i,h,t=.05,s=document.getElementById("universe"),o=!0,a="180,184,240",r="226,225,142",d="226,225,224",c=[];function f(){n=window.innerWidth,e=window.innerHeight,i=.216*n,s.setAttribute("width",n),s.setAttribute("height",e)}function u(){h.clearRect(0,0,n,e);for(var t=c.length,i=0;i<t;i++){var s=c[i];s.move(),s.fadeIn(),s.fadeOut(),s.draw()}}function y(){this.reset=function(){this.giant=m(3),this.comet=!this.giant&&!o&&m(10),this.x=l(0,n-10),this.y=l(0,e),this.r=l(1.1,2.6),this.dx=l(t,6*t)+(this.comet+1-1)*t*l(50,120)+2*t,this.dy=-l(t,6*t)-(this.comet+1-1)*t*l(50,120),this.fadingOut=null,this.fadingIn=!0,this.opacity=0,this.opacityTresh=l(.2,1-.4*(this.comet+1-1)),this.do=l(5e-4,.002)+.001*(this.comet+1-1)},this.fadeIn=function(){this.fadingIn&&(this.fadingIn=!(this.opacity>this.opacityTresh),this.opacity+=this.do)},this.fadeOut=function(){this.fadingOut&&(this.fadingOut=!(this.opacity<0),this.opacity-=this.do/2,(this.x>n||this.y<0)&&(this.fadingOut=!1,this.reset()))},this.draw=function(){if(h.beginPath(),this.giant)h.fillStyle="rgba("+a+","+this.opacity+")",h.arc(this.x,this.y,2,0,2*Math.PI,!1);else if(this.comet){h.fillStyle="rgba("+d+","+this.opacity+")",h.arc(this.x,this.y,1.5,0,2*Math.PI,!1);for(var t=0;t<30;t++)h.fillStyle="rgba("+d+","+(this.opacity-this.opacity/20*t)+")",h.rect(this.x-this.dx/4*t,this.y-this.dy/4*t-2,2,2),h.fill()}else h.fillStyle="rgba("+r+","+this.opacity+")",h.rect(this.x,this.y,this.r,this.r);h.closePath(),h.fill()},this.move=function(){this.x+=this.dx,this.y+=this.dy,!1===this.fadingOut&&this.reset(),(this.x>n-n/4||this.y<0)&&(this.fadingOut=!0)},setTimeout(function(){o=!1},50)}function m(t){return Math.floor(1e3*Math.random())+1<10*t}function l(t,i){return Math.random()*(i-t)+t}f(),window.addEventListener("resize",f,!1),function(){h=s.getContext("2d");for(var t=0;t<i;t++)c[t]=new y,c[t].reset();u()}(),function t(){document.getElementsByTagName('html')[0].getAttribute('data-theme')=='dark'&&u(),window.requestAnimationFrame(t)}()};
dark()

//动态标题
var OriginTitile = document.title;
var titleTime;
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    //离开当前页面时标签显示内容
    document.title = "o(>_<)o 要记得我还在这里等你哦";
    clearTimeout(titleTime);
  } else {
    //返回当前页面时标签显示内容
    document.title = "(❁´◡`❁)欢迎回来！" + OriginTitile;
    //两秒后变回正常标题
    titleTime = setTimeout(function () {
      document.title = OriginTitile;
    }, 2000);
  }
});

//地理位置信息get请求
$.ajax({
  type: 'get',
  url: 'https://apis.map.qq.com/ws/location/v1/ip',
  data: {
      key: 'SMMBZ-V5BR4-GDVUX-KPDX5-TD2AE-KUF6A',
      output: 'jsonp',
  },
  dataType: 'jsonp',
  success: function (res) {
      ipLoacation = res;
  }
})
function getDistance(e1, n1, e2, n2) {
  const R = 6371
  const { sin, cos, asin, PI, hypot } = Math
  let getPoint = (e, n) => {
      e *= PI / 180
      n *= PI / 180
      return { x: cos(n) * cos(e), y: cos(n) * sin(e), z: sin(n) }
  }

  let a = getPoint(e1, n1)
  let b = getPoint(e2, n2)
  let c = hypot(a.x - b.x, a.y - b.y, a.z - b.z)
  let r = asin(c / 2) * 2 * R
  return Math.round(r);
}

function showWelcome() {

  let dist = getDistance(108.563332, 34.153990, ipLoacation.result.location.lng, ipLoacation.result.location.lat); //这里换成自己的经纬度
  let pos = ipLoacation.result.ad_info.nation;
  let ip;
  let posdesc;
  switch (ipLoacation.result.ad_info.nation) {
      case "中国":
          pos = ipLoacation.result.ad_info.province + " " + ipLoacation.result.ad_info.city + " " + ipLoacation.result.ad_info.district;
          ip = ipLoacation.result.ip;
        default:
            posdesc = "";
            break;
    }

  //根据本地时间切换欢迎语
  let timeChange;
  let date = new Date();
  if (date.getHours() >= 6 && date.getHours() < 11) timeChange = "<span>早上好</span>，一日之计在于晨！";
  else if (date.getHours() >= 11 && date.getHours() < 14) timeChange = "<span>中午好</span>，该摸鱼吃午饭了。";
  else if (date.getHours() >= 14 && date.getHours() < 16) timeChange = "<span>下午好</span>，且先轻抿一口淡茶！";
  else if (date.getHours() >= 16 && date.getHours() < 19) timeChange = "<span>夕阳无限好，</span>干饭要趁早！";
  else if (date.getHours() >= 19 && date.getHours() < 24) timeChange = "<span>晚上好</span>，卷起来！嗨起来！";
  else timeChange = "夜深了，早点休息，熬夜会变丑哦。";

  try {
      //自定义文本和需要放的位置
      document.getElementById("welcome-info").innerHTML =
          `欢迎来自 <span style="color:#1DA1F2">${pos}</span> 的小伙伴。
          ${timeChange}您现在距离Beerlee约有 <span style="color:#1DA1F2">${dist}</span> 公里。 ${posdesc}</b>`;
  } catch (err) {
      // console.log("Pjax无法获取#welcome-info元素 (#_<-)")
  }
}
window.onload = showWelcome;
// 如果使用了pjax在加上下面这行代码
document.addEventListener('pjax:complete', showWelcome);


//右键菜单
function setMask() {
  //设置遮罩
  if (document.getElementsByClassName("rmMask")[0] != undefined)
      return document.getElementsByClassName("rmMask")[0];
  mask = document.createElement('div');
  mask.className = "rmMask";
  mask.style.width = window.innerWidth + 'px';
  mask.style.height = window.innerHeight + 'px';
  mask.style.background = '#fff';
  mask.style.opacity = '.0';
  mask.style.position = 'fixed';
  mask.style.top = '0';
  mask.style.left = '0';
  mask.style.zIndex = 998;
  document.body.appendChild(mask);
  document.getElementById("rightMenu").style.zIndex = 19198;
  return mask;
}

function insertAtCursor(myField, myValue) {

  //IE 浏览器
  if (document.selection) {
      myField.focus();
      sel = document.selection.createRange();
      sel.text = myValue;
      sel.select();
  }

  //FireFox、Chrome等
  else if (myField.selectionStart || myField.selectionStart == '0') {
      var startPos = myField.selectionStart;
      var endPos = myField.selectionEnd;

      // 保存滚动条
      var restoreTop = myField.scrollTop;
      myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);

      if (restoreTop > 0) {
          myField.scrollTop = restoreTop;
      }

      myField.focus();
      myField.selectionStart = startPos + myValue.length;
      myField.selectionEnd = startPos + myValue.length;
  } else {
      myField.value += myValue;
      myField.focus();
  }
}

let rmf = {};
rmf.showRightMenu = function (isTrue, x = 0, y = 0) {
  let $rightMenu = $('#rightMenu');
  $rightMenu.css('top', x + 'px').css('left', y + 'px');

  if (isTrue) {
      $rightMenu.show();
  } else {
      $rightMenu.hide();
  }
}

rmf.copyWordsLink = function () {
  let url = window.location.href
  let txa = document.createElement("textarea");
  txa.value = url;
  document.body.appendChild(txa)
  txa.select();
  document.execCommand("Copy");
  document.body.removeChild(txa);
  Snackbar.show({
    text: '本文地址复制成功！',
    pos: 'top-right',
    showAction: false,
})}

//复制选中文字
rmf.copySelect = function () {
  document.execCommand('Copy', false, null);
  Snackbar.show({
    text: '复制成功！',
    pos: 'top-right',
    showAction: false,
})}
//回到顶部
rmf.scrollToTop = function () {
  document.getElementsByClassName("menus_items")[1].setAttribute("style", "");
  document.getElementById("name-container").setAttribute("style", "display:none");
  btf.scrollToDest(0, 500);
}

document.body.addEventListener('touchmove', function () {

}, { passive: false });

function popupMenu() {
  window.oncontextmenu = function (event) {
      // if (event.ctrlKey) return true;

      $('.rightMenu-group.hide').hide();
      if (document.getSelection().toString()) {
          $('#menu-text').show();
      }
      if (document.getElementById('post')) {
          $('#menu-post').show();
      } else {
          if (document.getElementById('page')) {
              $('#menu-post').show();
          }
      }
      var el = window.document.body;
      el = event.target;
      var a = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/
      if (a.test(window.getSelection().toString()) && el.tagName != "A") {
          $('#menu-too').show()
      }
      if (el.tagName == 'A') {
          $('#menu-to').show()
          rmf.open = function () {
              if (el.href.indexOf("http://") == -1 && el.href.indexOf("https://") == -1 || el.href.indexOf("yisous.xyz") != -1) {
                  pjax.loadUrl(el.href)
              }
              else {
                  location.href = el.href
              }
          }
          rmf.openWithNewTab = function () {
              window.open(el.href);
              // window.location.reload();
          }
          rmf.copyLink = function () {
              let url = el.href
              let txa = document.createElement("textarea");
              txa.value = url;
              document.body.appendChild(txa)
              txa.select();
              document.execCommand("Copy");
              document.body.removeChild(txa);
              Snackbar.show({
                text: '链接地址复制成功！',
                pos: 'top-right',
                showAction: false,
            })
          }
      } else if (el.tagName == 'IMG') {
          $('#menu-img').show()
          rmf.openWithNewTab = function () {
              window.open(el.src);
              // window.location.reload();
          }
          rmf.click = function () {
              el.click()
          }
          rmf.copyLink = function () {
              let url = el.src
              let txa = document.createElement("textarea");
              txa.value = url;
              document.body.appendChild(txa)
              txa.select();
              document.execCommand("Copy");
              document.body.removeChild(txa);
          }
          rmf.saveAs = function () {
              var a = document.createElement('a');
              var url = el.src;
              var filename = url.split("/")[-1];
              a.href = url;
              a.download = filename;
              a.click();
              window.URL.revokeObjectURL(url);
          }
      } else if (el.tagName == "TEXTAREA" || el.tagName == "INPUT") {
          $('#menu-paste').show();
          rmf.paste = function () {
              navigator.permissions
                  .query({
                      name: 'clipboard-read'
                  })
                  .then(result => {
                      if (result.state == 'granted' || result.state == 'prompt') {
                          //读取剪贴板
                          navigator.clipboard.readText().then(text => {
                              console.log(text)
                              insertAtCursor(el, text)
                          })
                      } else {
                          Snackbar.show({
                              text: '请允许读取剪贴板！',
                              pos: 'top-center',
                              showAction: false,
                          })
                      }
                  })
          }
      }
      let pageX = event.clientX + 10;
      let pageY = event.clientY;
      let rmWidth = $('#rightMenu').width();
      let rmHeight = $('#rightMenu').height();
      if (pageX + rmWidth > window.innerWidth) {
          pageX -= rmWidth + 10;
      }
      if (pageY + rmHeight > window.innerHeight) {
          pageY -= pageY + rmHeight - window.innerHeight;
      }
      mask = setMask();
      // 滚动消失的代码和阅读进度有冲突，因此放到readPercent.js里面了
      $(".rightMenu-item").click(() => {
          $('.rmMask').attr('style', 'display: none');
      })
      $(window).resize(() => {
          rmf.showRightMenu(false);
          $('.rmMask').attr('style', 'display: none');
      })
      mask.onclick = () => {
          $('.rmMask').attr('style', 'display: none');
      }
      rmf.showRightMenu(true, pageY, pageX);
      $('.rmMask').attr('style', 'display: flex');
      return false;
  };

  window.addEventListener('click', function () {
      rmf.showRightMenu(false);
  });
}

// 全屏
rmf.fullScreen = function () {
  if (document.fullscreenElement) document.exitFullscreen();
  else document.documentElement.requestFullscreen();
}

if (!(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
  popupMenu()
}
const box = document.documentElement

function addLongtabListener(target, callback) {
  let timer = 0 // 初始化timer

  target.ontouchstart = () => {
      timer = 0 // 重置timer
      timer = setTimeout(() => {
          callback();
          timer = 0
      }, 380) // 超时器能成功执行，说明是长按
  }

  target.ontouchmove = () => {
      clearTimeout(timer) // 如果来到这里，说明是滑动
      timer = 0
  }

  target.ontouchend = () => { // 到这里如果timer有值，说明此触摸时间不足380ms，是点击
      if (timer) {
          clearTimeout(timer)
      }
  }
}

addLongtabListener(box, popupMenu)

// 分类导航栏高亮 

function catalogActive () {
    let $list = document.getElementById('catalog-list')
    if ($list) {
      // 鼠标滚轮滚动
      $list.addEventListener('mousewheel', function (e) {
        // 计算鼠标滚轮滚动的距离
        $list.scrollLeft -= e.wheelDelta / 2
        // 阻止浏览器默认方法
        e.preventDefault()
      }, false)
  
      // 高亮当前页面对应的分类或标签
      let path = decodeURIComponent(window.location.pathname).replace(/page\/[0-9]+\//g, '')
      let $catalog = document.getElementById(path)
      $catalog?.classList.add('selected')
  
      // 滚动当前页面对应的分类或标签到中部
      $list.scrollLeft = ($catalog.offsetLeft - $list.offsetLeft) - ($list.offsetWidth - $catalog.offsetWidth) / 2
    }
  }
  catalogActive()
  document.addEventListener('pjax:complete', catalogActive);
  
// 页面滚动百分比
window.addEventListener('scroll', function () {
    let totalH = document.body.scrollHeight || document.documentElement.scrollHeight // 页面总高
    let clientH = window.innerHeight || document.documentElement.clientHeight // 可视高
    document.querySelector('#nav #hotkey #top-button a.site-page i').dataset.percent = ((document.body.scrollTop || document.documentElement.scrollTop) / (totalH - clientH) * 100).toFixed(0)
  })

//瀑布流
if (document.querySelector('#bber-talk')) {
  var swiper = new Swiper('.swiper-container', {
    direction: 'vertical', // 垂直切换选项
    loop: true,
    autoplay: {
    delay: 3000,
    pauseOnMouseEnter: true
  },
  });
}

// 段落序号
function postAddToc () {
    let postContent = document.querySelector('#post>#article-container.post-content')
    let cardToc = document.getElementById('card-toc')
    if (postContent && cardToc) {
      let tocNumber = cardToc.getElementsByClassName('toc-number')
      let tocLink = cardToc.getElementsByClassName('toc-link')
      for (let i = 0; i < tocLink.length; i++) {
        document.getElementById(decodeURIComponent(tocLink[i].attributes.href.value).slice(1)).dataset.toc = tocNumber[i].innerText
      }
    }
  }
  postAddToc ()
//pjax-data标签属性
  document.addEventListener('pjax:complete', postAddToc);


   //导航栏标题
   if (GLOBAL_CONFIG_SITE.title.replace("Beerlee", "") === "") {
    document.getElementById("page-title").style.display = "none";
  } else {
    document.querySelector("#page-title>span").innerHTML = document.title.split("| Beerlee")[0];
  }
  // 添加pjax-data标签属性
  document.addEventListener('pjax:complete', pageTitle);
  function pageTitle() {
    var pageTitle = document.getElementById('page-title');
    pageTitle.setAttribute('pjax-data', 'true');
  }

//快速添加友链
  var leonus = {
    linkCom: e => {
        var t = document.querySelector(".el-textarea__inner");
        "bf" == e ? (t.value = "```yml\n", t.value += "- name: \n  link: \n  avatar: \n  descr: \n  siteshot: ", t.value += "\n```", t.setSelectionRange(15, 15)) : (t.value = "站点名称：\n站点地址：\n头像链接：\n站点描述：\n站点截图：", t.setSelectionRange(5, 5)), t.focus()
    },
    owoBig: () => {
        if (!document.getElementById("post-comment") || document.body.clientWidth < 768) return;
        let e = 1,
            t = "",
            o = document.createElement("div"),
            n = document.querySelector("body");
        o.id = "owo-big", n.appendChild(o), new MutationObserver((l => {
            for (let a = 0; a < l.length; a++) {
                let i = l[a].addedNodes,
                    s = "";
                if (2 == i.length && "OwO-body" == i[1].className) s = i[1];
                else {
                    if (1 != i.length || "tk-comment" != i[0].className) continue;
                    s = i[0]
                }
                s.onmouseover = l => {
                    e && ("OwO-body" == s.className && "IMG" == l.target.tagName || "tk-owo-emotion" == l.target.className) && (e = 0, t = setTimeout((() => {
                        let e = 3 * l.path[0].clientHeight,
                            t = 3 * l.path[0].clientWidth,
                            a = l.x - l.offsetX - (t - l.path[0].clientWidth) / 2,
                            i = l.y - l.offsetY;
                        a + t > n.clientWidth && (a -= a + t - n.clientWidth + 10), a < 0 && (a = 10), o.style.cssText = `display:flex; height:${e}px; width:${t}px; left:${a}px; top:${i}px;`, o.innerHTML = `<img src="${l.target.src}">`
                    }), 300))
                }, s.onmouseout = () => {
                    o.style.display = "none", e = 1, clearTimeout(t)
                }
            }
        })).observe(document.getElementById("post-comment"), {
            subtree: !0,
            childList: !0
        })
    },
};
















ichikaBlur = 'blur(10px)';
ichikaNoBlur = 'blur(0px)';
ichikaCardBgDark = 'rgba(0,0,0,0.7)';
ichikaBlurBg = 'rgba(255,255,255,0.88)';
ichikaNoBlurBg = 'rgba(255,255,255,0.95)';



// 存数据
function saveData(name, data) {
    localStorage.setItem(name, JSON.stringify({ 'time': Date.now(), 'data': data }))
}

// 取数据
function loadData(name, time) {
    let d = JSON.parse(localStorage.getItem(name));
    // 过期或有错误返回 0 否则返回数据
    if (d) {
        let t = Date.now() - d.time
        if (t < (time * 60 * 1000) && t > -1) return d.data;
    }
    return 0;
}

// 切换背景函数
// 此处的flag是为了每次读取时都重新存储一次,导致过期时间不稳定
// 如果flag为0则存储,即设置背景. 为1则不存储,即每次加载自动读取背景.
function changeBg (s, flag) {
    //移出web_bg pjax选择器，防止闪屏
    hasSetBg = true;
    let bg = document.getElementById('web_bg')
    let hd = document.getElementById('page-header')
    if (s.charAt(0) == '#') {
        bg.style.backgroundColor = s
        bg.style.backgroundImage = 'none'
        bg.style.setProperty('opacity', '1', 'important')
        hd.style.backgroundColor = s
        hd.style.backgroundImage = 'none'
        bg.classList.add('header-nogradient')
        hd.classList.add('header-nogradient')
    }
    else {

        bg.style.backgroundImage = s
        if (s.charAt(0) === 'l') {
            bg.style.setProperty('opacity', '1', 'important')
            bg.classList.add('header-nogradient')
            hd.classList.add('header-nogradient')
        } else {
            bg.style.setProperty('opacity', '1', 'important')
            bg.classList.remove('header-nogradient')
            hd.classList.remove('header-nogradient')
        }
        hd.style.backgroundImage = 'url(' + s + ')'
    };

    
    if (!flag) {
        try {
            pjaxSelectors.forEach(function (item, index, arr) {
                if (item === "#web_bg") {
                    arr.splice(index, 1);
                }
            });
        }catch(error){}
        saveData('blogbg', s)
    }
}

//控制台函数
//桌面端按钮拖动
var consoleButton = document.getElementById("consoleButton");
var isDrag = false;
consoleButton.onmousedown = function (mousePos) {
    var btnPosX = consoleButton.style.right;
    var btnPosY = consoleButton.style.bottom;
    let startTime = new Date();
    document.onmousemove = function (evt) {
        let nowTime = new Date();
        if (nowTime - startTime > 100) {
            isDrag = true;
            var resultX = parseFloat(btnPosX) - (evt.clientX - mousePos.clientX);
            var resultY = parseFloat(btnPosY) - (evt.clientY - mousePos.clientY);
            resultX = (resultX > 0 && resultX < window.innerWidth - consoleButton.clientWidth) ? resultX : Math.max(0, Math.min(window.innerWidth - consoleButton.clientWidth, resultX));
            resultY = (resultY > 0 && resultY < window.innerHeight - consoleButton.clientHeight) ? resultY : Math.max(0, Math.min(window.innerHeight - consoleButton.clientHeight, resultY));
            consoleButton.style.right = resultX + 'px';
            consoleButton.style.bottom = resultY + 'px';
        }
    }
    document.onmouseup = function () {
        document.onmousemove = null;
    };
};
//移动端按钮拖动
consoleButton.ontouchstart = function (a) {
    var mousePos = a.targetTouches[0];
    var btnPosX = consoleButton.style.right;
    var btnPosY = consoleButton.style.bottom;
    let startTime = new Date();
    consoleButton.ontouchmove = function (e) {
        e.preventDefault()
        let nowTime = new Date();
        if (nowTime - startTime > 100) {
            var evt = e.targetTouches[0];
            var resultX = parseFloat(btnPosX) - (evt.clientX - mousePos.clientX);
            var resultY = parseFloat(btnPosY) - (evt.clientY - mousePos.clientY);
            resultX = (resultX > 0 && resultX < window.innerWidth - consoleButton.clientWidth) ? resultX : Math.max(0, Math.min(window.innerWidth - consoleButton.clientWidth, resultX));
            resultY = (resultY > 0 && resultY < window.innerHeight - consoleButton.clientHeight) ? resultY : Math.max(0, Math.min(window.innerHeight - consoleButton.clientHeight, resultY));
            consoleButton.style.right = resultX + 'px';
            consoleButton.style.bottom = resultY + 'px';
            
        }
    }
    document.ontouchend = function () {
        document.ontouchmove = null;
    };
};

function showConsole () {
    if (isDrag) {
        isDrag = false;
        return;
    }
    let consolePanel = document.getElementById('console');
    let consblur = document.getElementById('console-blur')
    if (consolePanel.style.opacity == 0) {
        consolePanel.style.opacity = 1;
        consolePanel.style.zIndex = 999;
        consblur.style.opacity = 1;
        consblur.style.zIndex = 998;
    }
    else {
        consolePanel.style.opacity = 0;
        consolePanel.style.zIndex = -100;
        consblur.style.opacity = 0;
        consblur.style.zIndex = -100;
    }
}

function backToMenu() {
    let secmenu = document.getElementById('console-secmenu')

    document.getElementById('console-content').classList.remove('console-insecmenu');
    document.getElementById('console-settings').style.opacity = 1;
    document.getElementById('console-show').style.opacity = 1;
    document.getElementById('console-bottom').style.opacity = 1;
    document.getElementById('console-return').style.opacity = 0;
    secmenu.style.opacity = 0;
    secmenu.style.zIndex = -1;
}

function showSecMenu() {
    let secmenu = document.getElementById('console-secmenu')
    document.getElementById('console-content').classList.add('console-insecmenu');
    document.getElementById('console-settings').style.opacity = 0;
    document.getElementById('console-show').style.opacity = 0;
    document.getElementById('console-bottom').style.opacity = 0;
    document.getElementById('console-return').style.opacity = 1;
    secmenu.style.opacity = 1;
    secmenu.style.zIndex = 1;
}

//主界面快速按钮

function darkMode() {
    const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
    
    if (nowMode === 'light') {
        activateDarkMode()
        document.getElementById('quick-darkmode').innerHTML = '<i class="fas fa-sun"></i>'
        saveToLocal.set('theme', 'dark', 2)
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)
    } else {
        activateLightMode()
        document.getElementById('quick-darkmode').innerHTML = '<i class="fas fa-moon"></i>'
        saveToLocal.set('theme', 'light', 2)
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day)
    }
    try {
        layoutSwitch('bgBlur', loadData('bgBlur', 1440 * 30))
    } catch (error) { localStorage.removeItem(option); console.log('error') }
    // handle some cases
    typeof utterancesTheme === 'function' && utterancesTheme()
    typeof changeGiscusTheme === 'function' && changeGiscusTheme()
    typeof FB === 'object' && window.loadFBComment()
    typeof runMermaid === 'function' && window.runMermaid()
}

function readMode() {
    const $body = document.body
    $body.classList.add('read-mode')
    const newEle = document.createElement('button')
    newEle.type = 'button'
    newEle.className = 'fas fa-sign-out-alt exit-readmode'
    $body.appendChild(newEle)

    function clickFn() {
        $body.classList.remove('read-mode')
        newEle.remove()
        newEle.removeEventListener('click', clickFn)
    }
    newEle.addEventListener('click', clickFn)
    showConsole()
}

function fullScreen() {
    if (document.fullscreenElement) document.exitFullscreen()
    else document.documentElement.requestFullscreen();
}

function showBgSetting () { //切换背景页面
    let result = `<div id="blog-setting">
    <span><button id="resetbg" onclick="localStorage.removeItem('blogbg');localStorage.removeItem('autoTheme');localStorage.removeItem('manualTheme');location.reload();"><i class="fa-solid fa-arrows-rotate"></i> 重置背景</button></span>
    
    <div class="bgbox"><a href="javascript:;" </a>`



    document.getElementById('console-secmenu').innerHTML = result + `</div>
    <h2 id="渐变"><a href="#渐变" class="headerlink" title="渐变"></a>渐变</h2>
    <div class="bgbox">
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #eecda3, #ef629f)" onclick="changeBg('linear-gradient(to right, #eecda3, #ef629f)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #B7D31E, #42CE1E)" onclick="changeBg('linear-gradient(to right, #B7D31E, #42CE1E)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #06DE86, #06A5DE)" onclick="changeBg('linear-gradient(to right, #06DE86, #06A5DE)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #189BC4, #183DC4)" onclick="changeBg('linear-gradient(to right, #189BC4, #183DC4)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #C018C4, #C41818)" onclick="changeBg('linear-gradient(to right, #C018C4, #C41818)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #8B00BB, #030094)" onclick="changeBg('linear-gradient(to right, #8B00BB, #030094)')"></a>
    </div>

    <h2 id="纯色"><a href="#纯色" class="headerlink" title="纯色"></a>纯色</h2>
    <div class="bgbox">
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #7D9D9C" onclick="changeBg('#7D9D9C')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #49A6E9" onclick="changeBg('#49A6E9')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #F7CEFF" onclick="changeBg('#F7CEFF')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #FFFFCE" onclick="changeBg('#FFFFCE')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #CFFFCE" onclick="changeBg('#CFFFCE')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #17EFE9" onclick="changeBg('#17EFE9')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #9F17EF" onclick="changeBg('#9F17EF')"></a>
    </div>`;
    showSecMenu();
}

//按钮id
var layoutOption = [
    ['showWidget', '显示侧边栏', 1, '显示信息栏', 0],  //[关键词，桌面端名，桌面端默认值，移动端名，移动端默认值] 1：true 0：false -1：隐藏
    ['singleRow', '首页单栏布局', 0, '', -1],
    ['navFixed', '固定导航栏', 1, '固定导航栏', 1],
    ['HDCover', '高清封面（消耗流量）', 0, '', -1],
    ['bgBlur', '背景虚化（消耗性能）', 1, '背景虚化（消耗性能）', 1],
    ['useSakura', '落樱特效', 1, '落樱特效', 0],
    ['clickEffect', '单击特效', 1, '', -1]
]
isNavFixed = true
//布局页
function showLayoutSetting () {
    if (window.innerWidth > 768) {
        let a = `<div id="layout-content"><button id="resetLayout" onclick="resetLayout()"><i class="fa-solid fa-arrows-rotate"></i></button>
        <div><ul>`
        layoutOption.forEach((option) => {
            if (option[2] != -1) a += `<li><span>${option[1]}</span><label class="switch"><input id="${option[0]}" onclick="layoutSwitch('${option[0]}',1)" type="checkbox" ${option[2] == 1 ? 'checked' : ''}><div class="slider round"></div></label></li>`
        })
        a += `</ul></div></div>`
        document.getElementById('console-secmenu').innerHTML = a
    }
    else {
        let a = `<div id="layout-content"><button id="resetLayout" onclick="resetLayout()"><i class="fa-solid fa-arrows-rotate"></i></button>
        <div><ul>`
        layoutOption.forEach((option) => {
            if (option[4] != -1) a += `<li><span>${option[3]}</span><label class="switch"><input id="${option[0]}" onclick="layoutSwitch('${option[0]}',1)" type="checkbox" ${option[4] == 1 ? 'checked' : ''}><div class="slider round"></div></label></li>`
        })
        a += `</ul></div></div>`
        document.getElementById('console-secmenu').innerHTML = a
    }

    //设置按钮初始状态
    layoutOption.forEach(function (option) {
        try {
            if ((window.innerWidth > 768 && option[2] != -1) || (window.innerWidth <= 768 && option[4] != -1)) {
                let data = loadData(option[0], 1440 * 30)
                if (typeof (data) == "boolean") document.getElementById(option[0]).checked = data;
                else localStorage.removeItem(option[0]);
            }
        } catch (error) { localStorage.removeItem(option[0]); console.log('error') }
    })

    showSecMenu();
} 

//统计页51统计数据
var lainfo = ''
function showData() {
    // 链接替换即可，不需要后面的参数
    document.getElementById('console-secmenu').innerHTML = `<div id="data-content"">
    <iframe id="timeuprobot" src="https://status.ichika.cc"><div class="comments-load" id="iframeload"></div></iframe>
    <div class="data-meta"><div id="data-51la"><div class="comments-load"></div></div></div>
    </div>`

    if (lainfo == '') {
        fetch('https://v6-widget.51.la/v6/JqAEr98WCPCHb0eq/quote.js').then(res => res.text()).then((data) => {
            let title = ['最近活跃访客', '今日人数', '今日访问', '昨日人数', '昨日访问', '本月访问', '总访问量']
            let num = data.match(/(<\/span><span>).*?(\/span><\/p>)/g);
            num = num.map(el => {
                let val = el.replace(/(<\/span><span>)/g, "");
                let str = val.replace(/(<\/span><\/p>)/g, "");
                return str;
              });
            let order = [1, 3, 2, 4, 5] // 新增  可排序，如果需要隐藏则删除对应数字即可。
            // 示例：[1, 3, 2, 4, 5] 显示 ['今日人数', '昨日人数', '今日访问', '昨日访问', '本月访问']，不显示 最近活跃访客(0) 和 总访问量(6)
            for (let i = 0; i < order.length; i++)  lainfo += '<div><span>' + title[order[i]] + '</span><span class="num-51la">' + num[order[i]] + '</span></div>'
            document.getElementById('data-51la').innerHTML = lainfo + `<div style="text-align:center">由<a target="_blank" rel="nofollow noopener noreferrer" href='https://www.51.la/'>51LA</a>提供数据支持</div>`
        })
    }
    else document.getElementById('data-51la').innerHTML = lainfo + `<div style="text-align:center">由<a target="_blank" rel="nofollow noopener noreferrer" href='https://www.51.la/'>51LA</a>提供数据支持</div>`

    showSecMenu();
} 

//恢复默认设置
function resetLayout () {
    layoutOption.forEach(option => {
        if (window.innerWidth > 768) {
            if (option[2] == 0) {
                document.getElementById(option[0]).checked = false;
                layoutSwitch(option[0], false);
            }
            else if (option[2] == 1) {
                document.getElementById(option[0]).checked = true;
                layoutSwitch(option[0], true)
            }
        }
        else {
            if (option[4] == 0) {
                document.getElementById(option[0]).checked = false;
                layoutSwitch(option[0], false);
            }
            else if (option[4] == 1) {
                document.getElementById(option[0]).checked = true;
                layoutSwitch(option[0], true)
            }
        }
    })
}

//布局页各项设置
function layoutSwitch(name, flag) {
    let switchOn = (typeof (flag) == "boolean") ? flag : document.getElementById(name).checked;
    switch (name) {
        case 'showWidget':
            if (switchOn) {
                if (document.getElementById('aside-content'))document.getElementById('aside-content').classList.remove('show-widget-asidehide')
                if (document.getElementById('post'))document.getElementById('post').classList.remove('show-widget-posts')
                if (document.getElementById('recent-posts')) document.getElementById('recent-posts').classList.remove('show-widget-posts')
                if (document.getElementsByClassName('post_cover')) Array.from(document.getElementsByClassName('post_cover')).forEach(function (item) { item.classList.remove('show-widget-postcard') })
            }
            else {
                if (document.getElementById('aside-content')) document.getElementById('aside-content').classList.add('show-widget-asidehide')
                if (document.getElementById('post')) document.getElementById('post').classList.add('show-widget-posts')
                if (document.getElementById('recent-posts')) document.getElementById('recent-posts').classList.add('show-widget-posts')
                if (document.getElementsByClassName('post_cover')) Array.from(document.getElementsByClassName('post_cover')).forEach(function (item) { item.classList.add('show-widget-postcard') })
            }
            break;
        case 'singleRow':
            if (switchOn && document.getElementsByClassName('recent-post-item')) {
                Array.from(document.getElementsByClassName('recent-post-item')).forEach(function (item) { item.classList.add('single-row') })
                if (typeof (flag) == "number" && document.getElementById('HDCover').checked) layoutSwitch('HDCover',true)
            }
            else if (!switchOn && document.getElementsByClassName('recent-post-item')) Array.from(document.getElementsByClassName('recent-post-item')).forEach(function (item) { item.classList.remove('single-row') })
            break;
        case 'navFixed':
            if (switchOn) isNavFixed = true;
            else {
                if (document.getElementsByClassName('menus_items')[1].classList.contains('page-name-invisible')) {
                    document.getElementsByClassName('menus_items')[1].classList.remove('page-name-invisible')
                    document.getElementsByClassName('menus_items')[1].classList.add('page-name-visible')
                    document.getElementById('page-name').classList.remove('page-name-visible')
                    document.getElementById('page-name').classList.add('page-name-invisible')
                }
                isNavFixed = false;
            }
            break;
        case 'HDCover':
            if (switchOn && (loadData('singleRow', 1440 * 30) == true || document.getElementById('singleRow'))) Array.from(document.getElementsByClassName('post_bg')).forEach(function (img) { img.setAttribute("src", `${img.getAttribute('src').split('!cover')[0]}`) })
            break;
        case 'bgBlur':
            if (switchOn) {
                if (document.documentElement.getAttribute('data-theme') === 'dark') document.documentElement.style.setProperty('--ichika-card-bg', ichikaCardBgDark)
                else document.documentElement.style.setProperty('--ichika-card-bg', ichikaBlurBg)
                document.documentElement.style.setProperty('--ichika-bgblur', ichikaBlur)
            }
            else {
                if (document.documentElement.getAttribute('data-theme') === 'dark') document.documentElement.style.setProperty('--ichika-card-bg', ichikaCardBgDark)
                else document.documentElement.style.setProperty('--ichika-card-bg', ichikaNoBlurBg)
                document.documentElement.style.setProperty('--ichika-bgblur', ichikaNoBlur)
            }
            break;
        case 'useSakura':
            stopp(switchOn)
            break;
        case 'clickEffect':
            if (switchOn && document.getElementsByClassName('fireworks')[0]) document.getElementsByClassName('fireworks')[0].setAttribute('style', 'display:block')
            else if (!switchOn && document.getElementsByClassName('fireworks')[0]) document.getElementsByClassName('fireworks')[0].setAttribute('style', 'display:none')
            break;
        default:
            break;
    }
    saveData(name, switchOn)
}

//初始化布局设置
layoutOption.forEach(function (option){
    try {
        let data = loadData(option[0], 1440 * 30)
        if (typeof (data) == "boolean") layoutSwitch(option[0], data)
        else localStorage.removeItem(option)[0];
    } catch (error) { localStorage.removeItem(option[0])}
})

// 存数据
// name：命名 data：数据
function saveData(name, data) {
  localStorage.setItem(name, JSON.stringify({ 'time': Date.now(), 'data': data }))
}

// 取数据
// name：命名 time：过期时长,单位分钟,如传入30,即加载数据时如果超出30分钟返回0,否则返回数据
function loadData(name, time) {
  let d = JSON.parse(localStorage.getItem(name));
  // 过期或有错误返回 0 否则返回数据
  if (d) {
      let t = Date.now() - d.time
      if (t < (time * 60 * 1000) && t > -1) return d.data;
  }
  return 0;
}

// 上面两个函数如果你有其他需要存取数据的功能，也可以直接使用

// 读取背景
try {
  let data = loadData('blogbg', 1440)
  if (data) changeBg(data, 1)
  else localStorage.removeItem('blogbg');
} catch (error) { localStorage.removeItem('blogbg'); }

// 切换背景函数
// 此处的flag是为了每次读取时都重新存储一次,导致过期时间不稳定
// 如果flag为0则存储,即设置背景. 为1则不存储,即每次加载自动读取背景.
function changeBg(s, flag) {
  let bg = document.getElementById('web_bg')
  if (s.charAt(0) == '#') {
      bg.style.backgroundColor = s
      bg.style.backgroundImage = 'none'
  } else bg.style.backgroundImage = s
  if (!flag) { saveData('blogbg', s) }
}

// 以下为2.0新增内容

// 创建窗口
var winbox = ''

function createWinbox() {
  let div = document.createElement('div')
  document.body.appendChild(div)
  winbox = WinBox({
      id: 'changeBgBox',
      index: 999,
      title: "切换背景",
      x: "center",
      y: "center",
      minwidth: '300px',
      height: "60%",
      background: '#49b1f5',
      onmaximize: () => { div.innerHTML = `<style>body::-webkit-scrollbar {display: none;}div#changeBgBox {width: 100% !important;}</style>` },
      onrestore: () => { div.innerHTML = '' }
  });
  winResize();
  window.addEventListener('resize', winResize)

}