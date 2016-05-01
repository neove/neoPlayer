/**
 * Created by Administrator on 4/28/2016.
 */
$(function(){
   (function(window,document,$){
       var media=$('#media')[0];
       var num=0;
       var song_num=data.length;
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
                   'top':'43rem'
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
           if(num==0)num=song_num;
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
           if(media.paused) {
               play();
               songInfo();
           } else {
               pause();
               stopRotate();
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




   })(window,document,jQuery);











});
