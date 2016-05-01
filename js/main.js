/**
 * Created by Administrator on 4/28/2016.
 */
$(function(){
   (function(window,document,$){
       var media=$('#media')[0];
       //���ý������Ͱ�ť
       dragX($('.pro-btn')[0],0,480);
       dragY($('.vol-btn')[0],0,80);
       $('.vol').click(function(){
          $('.vol-control').toggle();
       });
       $('.vol-control').bind('click', function () {
           return false;         //��ֹð��
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

       }
       //��ͣ
       function pause() {
           media.pause();
          
       }








   })(window,document,jQuery);
});
