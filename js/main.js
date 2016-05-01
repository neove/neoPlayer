/**
 * Created by Administrator on 4/28/2016.
 */
$(function(){
   (function(window,document,$){
       var media=$('#media')[0];
       var num=0;
       var song_num=data.length;
       var audio_tiemr=null;
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
           num--;
           if(num<=0)num=song_num-1;
           $('#media')[0].src=data[num%song_num].src;
           play();
           songLighter();
           songInfo();
       });
       $('.next').bind('click',function(){
           num++;
           $('#media')[0].src=data[num%song_num].src;
           play();
           songLighter();
           songInfo();
       });
       //歌曲列表的点击事件
       $('ul.song-list li').bind('click',function(){
           num=$(this).index();
           $('#media')[0].src=data[num%song_num].src;
           play();
           songLighter();
           songInfo();
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
                   'transition':        'transform 10000s linear',/*这里用rotate不行*/
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
               'transition': 'transform 0s linear',
           });
       }
       //绑定播放按钮
       $('.play-btn').bind('click',function(){
           playAudio();
       });
       $('.music-info').bind('click',function(){
           playAudio();
       });
       function playAudio() {
           var a, b,c;
           if(media.paused) {
               play();
               songInfo();
               clearInterval(audio_tiemr);
               audio_tiemr=setInterval(function(){
                   //时间显示
                   a=toTwo(Math.floor(media.currentTime/60));
                   b=toTwo(Math.floor(media.currentTime%60));
                   c=parseFloat(media.currentTime/media.duration)*480;
                   $('.time').text(a+':'+b);
                   $('.pro-btn').css('left',c);
                   if(media.ended){
                       stopRotate();
                       clearInterval(audio_tiemr);
                   };
               },1000)
           } else {
               pause();
               stopRotate();
               clearInterval(audio_tiemr);
           }
       }
       //播放
       function play() {
           media.play();
           $('.play-btn').css({
              'background': 'url("img/pause.png") no-repeat 50% 50%'//这里的路径要注意！！
           });
       }
       //暂停
       function pause() {
           media.pause();
           $('.play-btn').css({
               'background': 'url("img/play.png") no-repeat 50% 50%'
           });
       }
       function toTwo(a){
           return a<10 ? '0'+a : ''+a;
       }
       //拖拽改变歌曲进度
       $('.pro-btn').bind('mousedown',function(){
           pause();
       }).bind('mouseup',function(){
           media.currentTime=$(this).offset().left/480*media.duration;
           play();
       });


       /*******************test area**************/
       $('#f').click(function(){
           alert(media.duration)
       });












   })(window,document,jQuery);











});
