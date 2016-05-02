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

       //���ý������Ͱ�ť
       dragX($('.pro-btn')[0],0,480);
       dragY($('.vol-btn')[0],0,80);
       $('.vol').click(function(){
          $('.vol-control').toggle();
       });
       $('.vol-control').bind('click', function () {
           return false;         //��ֹð��
       });
       //һЩ��ʼ������
       media.volume=.5;
       $('.vol-btn').css('top',40);
       songLighter();
       $('#media')[0].src=data[0].src;
       $('.music-info .name').text(data[0].name);
       $('.music-info .singer').text(data[0].singer);
       $('.music-info img').attr('src',data[0].songbg);

       //���ø����б���Ϣ
       $('ul.song-list li').each(function(){
           $(this).find('.list-name').text(data[$(this).index()].name);
           $(this).find('.list-singer').text(data[$(this).index()].singer);
       });
       //���ø����б����ʾ������
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
       //��ǰ��������
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
       //ǰ��ť�л�����
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
       //�����б�ĵ���¼�
       $('.song-list li').bind('click',function(){
           pre_num=num;
           num=$(this).index();
           $('#media')[0].src=data[num].src;
           playAudio();
       });
       //������Ϣ����
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
                   '-webkit-transition':'transform 10000s linear',/*������rotate����*/
                   '-moz-transition':   'transform 10000s linear',/*������rotate����*/
                   '-ms-transition':    'transform 10000s linear',/*������rotate����*/
                   '-o-transition':     'transform 10000s linear',/*������rotate����*/
                   'transition':        'transform 10000s linear'/*������rotate����*/
               });
           if(media.ended) stopRotate();
       }
       //ֹͣcss3����
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
       //�󶨲��Ű�ť
       $('.play-btn').bind('click',function(){
           playAudio();
       });
       $('.music-info').bind('click',function(){
           playAudio();
       });
       //���ź���
       function playAudio() {
           if(media.paused) {
               play();
           } else {
               pause();
               stopRotate();
               clearInterval(audio_timer);
           }
       }
       //����
       function play() {
           var a, b,c;
           media.play();
           songInfo();
           songLighter();
           insertLrc(num);
           clearInterval(audio_timer);
           audio_timer=setInterval(function(){
               //ʱ����ʾ
               a=toTwo(Math.floor(media.currentTime/60));
               b=toTwo(Math.floor(media.currentTime%60));
               c=parseFloat(media.currentTime/media.duration)*480;
               $('.time').text(a+':'+b);
               //�������ͻ��������
               $('.pro-btn').css('left',c);
               $('.pro-line').css('width',c);
               //��ʵĻ���
               lrcMove(media.currentTime);
               if(media.ended){
                   stopRotate();
                   clearInterval(audio_timer);
               }
           },1000);
           //�ı䰴ť
           $('.play-btn').css({
              'background': 'url("img/pause.png") no-repeat 50% 50%'//�����·��Ҫע�⣡��
           });
       }
       //��ͣ
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
       //��ק�ı�������� ��mouseup�¼�����mousedown����
       $('.pro-btn').bind('mousedown',function(){
           pause();
           $(this).bind('mousemove',function(){
               $('.pro-line').css('width',$('.pro-btn').css('left'));
               //��ק�ı��ʹ���
               var a =parseInt($(this).css('left'))/480*media.duration;
               lrcMove(a);
           });
           $(this).bind('mouseup',function(){
               media.currentTime=parseInt($(this).css('left'))/480*media.duration;//offset().left������ĵ��ģ���
               play();
           })
       });

       //��������
       $('.vol-btn').bind('mousedown',function(){
           $(this).bind('mousemove',function(){
               media.volume=1-parseInt($(this).css('top'))/80;

           })
       });



       //��ʴ���

       //parseLyric�������
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
       //����ʷ���html��
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
       //��ʻ���
       function lrcMove(a){
           $('.lrc-list').find('li').each(function(){
               if(parseInt(a)==$(this).attr('time-line')){
                   $('.lrc-list').find('li').removeClass('curr');
                   $(this).addClass('curr');
                   if($(this).index()>=4){//�ӵ����п�ʼ����
                       $('.lrc-list').css('margin-top',-($(this).index()-4)*$(this).height());
                   }
               }
           });
       }

       //��ϲ�������ֵ���¼�
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
















       //�����������������ק
       function dragX(obj,start,end){
           obj.onmousedown = function (ev) {
               var ev = ev || event;
               var a = ev.clientX - this.offsetLeft;
               if (obj.setCapture) {  //  ����ȫ�ֲ��񣬽���Ǳ�׼ie�µ�����
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
                   if(obj.releaseCapture){//ȡ��ȫ�ֲ���
                       obj.releaseCapture();
                   }
               };
               return false;/**ȡ��Ĭ����Ϊ�������׼������µ�����**/
           }
       }
       function dragY(obj,start,end) {
           obj.onmousedown = function (ev) {
               var ev = ev || event;
               var b = ev.clientY - this.offsetTop;
               if (obj.setCapture) {  //  ����ȫ�ֲ��񣬽���Ǳ�׼ie�µ�����
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
                   if(obj.releaseCapture){//ȡ��ȫ�ֲ���
                       obj.releaseCapture();
                   }
               };
               return false;/**ȡ��Ĭ����Ϊ�������׼������µ�����**/
           }
       }






       /*******************test area**************/
       $('#f').click(function(){
           alert(media.duration)
       });


      /* //��ʵĴ���
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
