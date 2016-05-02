/**
 * Created by Administrator on 4/28/2016.
 */
$(function(){
   (function(window,document,$){
       var media=$('#media')[0],
           num= 0,
           pre_num=1,
           song_num=data.length,
           audio_timer=null;

       //设置进度条和按钮
       dragX($('.pro-btn')[0],0,480);
       dragY($('.vol-btn')[0],0,80);
       $('.vol').click(function(){
          $('.vol-control').toggle();
       });
       $('.vol-control').bind('click', function () {
           return false;         //阻止冒泡
       });
       //一些初始化操作
       media.volume=.5;
       $('.vol-btn').css('top',40);
       songLighter();
       $('#media')[0].src=data[0].src;
       $('.music-info .name').text(data[0].name);
       $('.music-info .singer').text(data[0].singer);
       $('.music-info img').attr('src',data[0].songbg);

       //设置歌曲列表信息
       $('ul.song-list li').each(function(){
           $(this).find('.list-name').text(data[$(this).index()].name);
           $(this).find('.list-singer').text(data[$(this).index()].singer);
       });
       //设置歌曲列表的显示和隐藏
       $('.up-down').bind('click', function(){
           if($('.song-list').is(':visible')){
               $('.song-list').slideUp(500);
               $(this).css({
                   '-webkit-transform':'rotate3d(1,0,0,0deg)',
                   '-moz-transform'   :'rotate3d(1,0,0,0deg)',
                   '-ms-transform '   :'rotate3d(1,0,0,0deg)',
                   '-o-transform  '   :'rotate3d(1,0,0,0deg)',
                   'transform     '   :'rotate3d(1,0,0,0deg)',
                   'top':'0'
               })
           }else{
               $('.song-list').slideDown(500);
               $(this).css({
                   '-webkit-transform':'rotate3d(1,0,0,180deg)',
                   '-moz-transform'   :'rotate3d(1,0,0,180deg)',
                   '-ms-transform '   :'rotate3d(1,0,0,180deg)',
                   '-o-transform  '   :'rotate3d(1,0,0,180deg)',
                   'transform     '   :'rotate3d(1,0,0,180deg)',
                   'top':'4.3rem'
               })
           }
       });
       //当前歌曲高亮
       function songLighter(){
           $('ul.song-list li').each(function(){
               $(this).css({
                   'background':'transparent'
               });
               if($(this).index()===num%song_num){
                   $(this).css({
                       'background':'rgba(255,255,255,0.4)'
                   });
               }
           });
       }
       //前后按钮切换歌曲
       $('.pre').bind('click',function(){
           pre_num=num;
           num--;
           if(num==-1)num=song_num-1;
           $('#media')[0].src=data[num%song_num].src;
           playAudio()
       });
       $('.next').bind('click',function(){
           pre_num=num;
           num++;
           if(num==song_num)num=0;
           $('#media')[0].src=data[num%song_num].src;
           playAudio();
       });
       //歌曲列表的点击事件
       $('.song-list li').bind('click',function(){
           pre_num=num;
           num=$(this).index();
           $('#media')[0].src=data[num].src;
           playAudio();
       });
       //歌曲信息更新
       function songInfo(){
           $('.music-info .name').text(data[num%song_num].name);
           $('.music-info .singer').text(data[num%song_num].singer);
           $('.music-info img').attr('src',data[num%song_num].songbg)
               .css({
                   '-webkit-transform':'rotate(360000deg)',
                   '-moz-transform':   'rotate(360000deg)',
                   '-ms-transform':    'rotate(360000deg)',
                   '-o-transform':     'rotate(360000deg)',
                   'transform':        'rotate(360000deg)',
                   '-webkit-transition':'transform 10000s linear',/*这里用rotate不行*/
                   '-moz-transition':   'transform 10000s linear',/*这里用rotate不行*/
                   '-ms-transition':    'transform 10000s linear',/*这里用rotate不行*/
                   '-o-transition':     'transform 10000s linear',/*这里用rotate不行*/
                   'transition':        'transform 10000s linear'/*这里用rotate不行*/
               });
           if(media.ended) stopRotate();
       }
       //停止css3动画
       function stopRotate() {
           $('.music-info img').css({
               '-webkit-transform': 'rotate(0deg)',
               '-moz-transform':    'rotate(0deg)',
               '-ms-transform':     'rotate(0deg)',
               '-o-transform':      'rotate(0deg)',
               'transform':         'rotate(0deg)',
               '-webkit-transition': 'transform 0s linear',
               '-moz-transition': 'transform 0s linear',
               '-ms-transition': 'transform 0s linear',
               '-o-transition': 'transform 0s linear',
               'transition': 'transform 0s linear'
           });
       }
       //绑定播放按钮
       $('.play-btn').bind('click',function(){
           playAudio();
       });
       $('.music-info').bind('click',function(){
           playAudio();
       });
       //播放函数
       function playAudio() {
           if(media.paused) {
               play();
           } else {
               pause();
               stopRotate();
               clearInterval(audio_timer);
           }
       }
       //播放
       function play() {
           var a, b,c;
           media.play();
           songInfo();
           songLighter();
           insertLrc(num);
           clearInterval(audio_timer);
           audio_timer=setInterval(function(){
               //时间显示
               a=toTwo(Math.floor(media.currentTime/60));
               b=toTwo(Math.floor(media.currentTime%60));
               c=parseFloat(media.currentTime/media.duration)*480;
               $('.time').text(a+':'+b);
               //进度条和滑块的设置
               $('.pro-btn').css('left',c);
               $('.pro-line').css('width',c);
               //歌词的滑动
               lrcMove(media.currentTime);
               if(media.ended){
                   stopRotate();
                   clearInterval(audio_timer);
               }
           },1000);
           //改变按钮
           $('.play-btn').css({
              'background': 'url("img/pause.png") no-repeat 50% 50%'//这里的路径要注意！！
           });
       }
       //暂停
       function pause() {
           media.pause();
           pre_num=num;
           $('.play-btn').css({
               'background': 'url("img/play.png") no-repeat 50% 50%'
           });
       }
       function toTwo(a){
           return a<10 ? '0'+a : ''+a;
       }
       //拖拽改变歌曲进度 将mouseup事件放在mousedown里面
       $('.pro-btn').bind('mousedown',function(){
           pause();
           $(this).bind('mousemove',function(){
               $('.pro-line').css('width',$('.pro-btn').css('left'));
               //拖拽改变歌词滚动
               var a =parseInt($(this).css('left'))/480*media.duration;
               lrcMove(a);
           });
           $(this).bind('mouseup',function(){
               media.currentTime=parseInt($(this).css('left'))/480*media.duration;//offset().left是相对文档的？？
               play();
           })
       });

       //音量控制
       $('.vol-btn').bind('mousedown',function(){
           $(this).bind('mousemove',function(){
               media.volume=1-parseInt($(this).css('top'))/80;

           })
       });



       //歌词处理

       //parseLyric解析歌词
       function parseLyric(lrc) {
           var lyrics = lrc.split("$");
           var lrcObj = {};
           for(var i=0;i<lyrics.length;i++){
               var lyric = decodeURIComponent(lyrics[i]);
               var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
               var timeRegExpArr = lyric.match(timeReg);
               if(!timeRegExpArr)continue;
               var clause = lyric.replace(timeReg,'');

               for(var k = 0,h = timeRegExpArr.length;k < h;k++) {
                   var t = timeRegExpArr[k];
                   var min = Number(String(t.match(/\[\d*/i)).slice(1)),
                       sec = Number(String(t.match(/\:\d*/i)).slice(1));
                   var time = min * 60 + sec;
                   lrcObj[time] = clause;
               }
           }
           return lrcObj;
       }
       //将歌词放在html中
       function insertLrc(index){
           if(pre_num!=num) {

               var a = new parseLyric(data[index].lyric),
                   b = '';
               $('.lrc-list').hide().css('margin-top','0');
               for (var i in a) {
                   b += '<li class="lrc-line" time-line="' + i + '">' + a[i] + '</li>';
               }
               ;
               $('.lrc-list').html(b)
               $('.lrc-list').slideDown(1000);
           }
       }
       //歌词滑动
       function lrcMove(a){
           $('.lrc-list').find('li').each(function(){
               if(parseInt(a)==$(this).attr('time-line')){
                   $('.lrc-list').find('li').removeClass('curr');
                   $(this).addClass('curr');
                   if($(this).index()>=4){//从第四行开始滚动
                       $('.lrc-list').css('margin-top',-($(this).index()-4)*$(this).height());
                   }
               }
           });
       }

       //我喜欢的音乐点击事件
       $('ul.song-list li').find('span.love').bind('click',function(){
           if(this.on_off){
               $(this).css('background','url("img/love1.png") no-repeat 50% 50%');
               this.on_off=0;
           }else{
               $(this).css('background','url("img/love2.png") no-repeat 50% 50%');
               this.on_off=1;
           }
           return false;
       });
















       //两个单方向的条件拖拽
       function dragX(obj,start,end){
           obj.onmousedown = function (ev) {
               var ev = ev || event;
               var a = ev.clientX - this.offsetLeft;
               if (obj.setCapture) {  //  设置全局捕获，解决非标准ie下的问题
                   obj.setCapture();
               }
               document.onmousemove = function (ev) {
                   var ev = ev || event;
                   var x=ev.clientX - a;
                   if(x<start)x=start;
                   if(x>end) x=end;
                   obj.style.left =x + 'px';
               };
               document.onmouseup = function () {
                   document.onmousemove = null;
                   if(obj.releaseCapture){//取消全局捕获
                       obj.releaseCapture();
                   }
               };
               return false;/**取消默认行为，解决标准浏览器下的问题**/
           }
       }
       function dragY(obj,start,end) {
           obj.onmousedown = function (ev) {
               var ev = ev || event;
               var b = ev.clientY - this.offsetTop;
               if (obj.setCapture) {  //  设置全局捕获，解决非标准ie下的问题
                   obj.setCapture();
               }
               document.onmousemove = function (ev) {
                   var ev = ev || event;
                   var y=ev.clientY - b;
                   if(y<start)y=start;
                   if(y>end) y=end;
                   obj.style.top = y + 'px';
               };
               document.onmouseup = function () {
                   document.onmousemove = null;
                   if(obj.releaseCapture){//取消全局捕获
                       obj.releaseCapture();
                   }
               };
               return false;/**取消默认行为，解决标准浏览器下的问题**/
           }
       }






       /*******************test area**************/
       $('#f').click(function(){
           alert(media.duration)
       });


      /* //歌词的处理
       var arr_time=new Array();
       var arr_lrc=new Array();
       var stri=data[0].lyric;
       var time='';
       var lrc='';
       for(var i=0;i<stri.length;i++){
           if(stri.charAt(i)=='['){
               time=stri.substring(i+1,i+6);
               arr_time.push(time);
           }
           if(stri.charAt(i)==']'){
               if(stri.charAt(i)!='['){
                   lrc+=stri.charAt(i+1);

               }
               arr_lrc.push(lrc);
           }
       }
       alert(arr_lrc);*/












   })(window,document,jQuery);











});
