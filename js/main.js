/**
 * Created by Administrator on 4/28/2016.
 */
$(function(){
   (function(window,document,$){
       var media=$('#media')[0];
       var num=0;
       var song_num=data.length;
       var audio_tiemr=null;
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
       //�����б�ĵ���¼�
       $('ul.song-list li').bind('click',function(){
           num=$(this).index();
           $('#media')[0].src=data[num%song_num].src;
           play();
           songLighter();
           songInfo();
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
                   'transition':        'transform 10000s linear',/*������rotate����*/
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
               'transition': 'transform 0s linear',
           });
       }
       //�󶨲��Ű�ť
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
                   //ʱ����ʾ
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
       //����
       function play() {
           media.play();
           $('.play-btn').css({
              'background': 'url("img/pause.png") no-repeat 50% 50%'//�����·��Ҫע�⣡��
           });
       }
       //��ͣ
       function pause() {
           media.pause();
           $('.play-btn').css({
               'background': 'url("img/play.png") no-repeat 50% 50%'
           });
       }
       function toTwo(a){
           return a<10 ? '0'+a : ''+a;
       }
       //��ק�ı��������
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
