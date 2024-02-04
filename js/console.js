
PCimg = [ //标准壁纸
    'https://cdn.ichika.cc/WallPaper/102875400_p0.png',
    'https://cdn.ichika.cc/typora/202210141544062.png',
    'https://cdn.ichika.cc/typora/202210141513175.png',
    'https://cdn.ichika.cc/typora/202210141535511.png',
    'https://cdn.ichika.cc/typora/archivecover.png',
    'https://cdn.ichika.cc/typora/categorycover.png',
    'https://cdn.ichika.cc/typora/tagcover.png',
    'https://cdn.ichika.cc/typora/202210141549031.png',
    'https://cdn.ichika.cc/typora/202210141549269.png',
    'https://cdn.ichika.cc/typora/202210181614358.png',
    'https://cdn.ichika.cc/typora/202210141549975.png',
    'https://cdn.ichika.cc/typora/202210141535193.jpg',
    'https://cdn.ichika.cc/typora/202210141536098.png',
    'https://cdn.ichika.cc/typora/202210141545495.jpg',
    'https://cdn.ichika.cc/typora/202210141538929.jpg',
    'https://cdn.ichika.cc/WallPaper/illust_101965789_20221019_154953.png',
    'https://cdn.ichika.cc/WallPaper/sekaiichika1.png'
]
Moblieimg = [ //手机壁纸
    'https://cdn.ichika.cc/WallPaper/102185774_p0.jpg',
    'https://cdn.ichika.cc/WallPaper/102897176_p0.jpg',
    'https://cdn.ichika.cc/WallPaper/103399572_p0.png',
    'https://cdn.ichika.cc/WallPaper/104001022_p0.jpg',
    'https://cdn.ichika.cc/typora/Miku15Years.jpg',
    'https://cdn.ichika.cc/page/Touhou1.jpg',
    'https://cdn.ichika.cc/page/bbcover.png',
    'https://cdn.ichika.cc/typora/202210141549113.jpg',
    'https://cdn.ichika.cc/typora/202210141549936.jpg',
    'https://cdn.ichika.cc/WallPaper/illust_100285476_20221019_154927.png',
    'https://cdn.ichika.cc/WallPaper/illust_83162615_20221019_154713.jpg',
    'https://cdn.ichika.cc/WallPaper/illust_87558396_20221019_154633.jpg',
    'https://cdn.ichika.cc/WallPaper/illust_93208096_20221019_154748.jpg',
    'https://cdn.ichika.cc/WallPaper/illust_93261557_20221019_154904.jpg',
    'https://cdn.ichika.cc/WallPaper/illust_94054694_20221019_154602.png',
    'https://cdn.ichika.cc/WallPaper/illust_94886325_20221019_154850.png',
    'https://cdn.ichika.cc/WallPaper/illust_94964180_20221019_154719.png',
    'https://cdn.ichika.cc/WallPaper/illust_96477234_20221019_154742.jpg',
    'https://cdn.ichika.cc/WallPaper/illust_96791042_20221019_154642.jpg',
    'https://cdn.ichika.cc/WallPaper/illust_97513114_20221019_154922.jpg',
    'https://cdn.ichika.cc/WallPaper/illust_97883472_20221019_154736.jpg',
    'https://cdn.ichika.cc/WallPaper/illust_98031598_20221019_154829.jpg',
    'https://cdn.ichika.cc/WallPaper/illust_98107508_20221019_154822.jpg',
    'https://cdn.ichika.cc/WallPaper/illust_98398587_20221019_154815.jpg',
    'https://cdn.ichika.cc/WallPaper/illust_99170622_20221019_154809.jpg',
    'https://cdn.ichika.cc/WallPaper/illust_99486664_20221019_154914.jpg',
    'https://cdn.ichika.cc/WallPaper/illust_99684687_20221019_154620.png'
]







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

    result += `</div><h2 id="桌面端"><a href="#桌面端" class="headerlink" title="桌面端"></a>桌面端</h2><div class="bgbox">`

    PCimg.forEach(function (img) {
        result +=`<a href="javascript:;" rel="noopener external nofollow" style="background-image:url(${img}!cover)" class="imgbox" onclick="changeBg('url(${img})')"></a>`
    })

    result += `</div><h2 id="移动端"><a href="#移动端" class="headerlink" title="移动端"></a>移动端</h2><div class="bgbox">`

    Moblieimg.forEach(function (img) {
        result += `<a href="javascript:;" rel="noopener external nofollow" style="background-image:url(${img}!cover)" class="pimgbox" onclick="changeBg('url(${img})')"></a>`
    })



    
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
























//统计页51统计数据
function showData() {
    document.getElementById('console-secmenu').innerHTML = `<div id="data-content"">
   
    <iframe id="timeuprobot" src="https://status.beerlee.cn"><div class="comments-load" id="iframeload"></div></iframe>
    
    <script id="LA-DATA-WIDGET" crossorigin="anonymous" charset="UTF-8" src="https://v6-widget.51.la/v6/K3svWvEINq7CIBTm/quote.js?theme=#5DADE2,#333333,#4E4E4E,#333333,#FFFFFF,#1690FF,15&col=true&f=14&badge=icon_0&icon=center&display=1,0,1,1,0,1,1,1"></script>
    
    ### 访问统计
<div id="statistic">
<div class="content"></div>
<span style="font-size:14px">流量统计支持：<a style="color:#1690ff;" href="https://v6.51.la/">51la</a></span>
</div>

<!-- js -->
<script>
// 链接替换即可，不需要后面的参数
fetch('https://v6-widget.51.la/v6/JkxJmzzWDhbGjOFf/quote.js').then(res => res.text()).then((data) => {
    let title = ['最近活跃访客', '今日人数', '今日访问', '昨日人数', '昨日访问', '本月访问', '总访问量']
    let num = data.match(/(?<=<\/span><span>).*?(?=<\/span><\/p>)/g)
    let order = [1, 3, 2, 4, 5] // 新增  可排序，如果需要隐藏则删除对应数字即可。
    // 示例：[1, 3, 2, 4, 5] 显示 ['今日人数', '昨日人数', '今日访问', '昨日访问', '本月访问']，不显示 最近活跃访客(0) 和 总访问量(6)
    for (let i = 0; i < order.length; i++) { document.querySelectorAll('#statistic .content')[0].innerHTML += '<div><span>' + title[order[i]] + '</span><span class="num">' + num[order[i]] + '</span></div>' }
});
</script>


    </div>`   
    showSecMenu();
}


