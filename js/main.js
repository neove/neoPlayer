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
           if(num<0)num=song_num;
           $('#media')[0].src=data[num%song_num].src;
           play();
           songLighter();
       });
       $('.next').bind('click',function(){
           num++;
           $('#media')[0].src=data[num%song_num].src;
           play();
           songLighter();
       });

       //�󶨲��Ű�ť
       $('.play-btn').bind('click',function(){
           playAudio();
       });
       function playAudio() {
           if(media.paused) {
               play();
           } else {
               pause();
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
