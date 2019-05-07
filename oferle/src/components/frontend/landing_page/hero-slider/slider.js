import React from "react"
import Script from 'react-load-script';
import $ from "jquery";
{/* <Script
          url="https://code.jquery.com/jquery-2.2.4.min.js"
          async defer
          onLoad={this.load}
        /> */}
        <Script
          url="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js"
          async defer
          onLoad={slickload}
        />



export function slickload()
{


$(document).ready(function() {

    var time = 2;
  var $status = $('.pagingInfo');
  var $bar,
    $slick,
    isPause,
    tick,
    percentTime;

  $slick = $('#hero-slider');

  console.log($slick)
  $slick.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
        var i = (currentSlide ? currentSlide : 0) + 1;
        $status.text(i + '  OUT OF  ' + slick.slideCount);
    });

    console.log(" Slick in slide ", $slick.slick)
   
//   $slick.slick({
//     arrows: true,
//     speed: 500,
//     adaptiveHeight: false
//   });

//   $bar = $('.slider-progress .progress');

//   function startProgressbar() {
//     resetProgressbar();
//     percentTime = 0;
//     isPause = false;
//     tick = setInterval(interval, 20);
//   }

//   function interval() {
//     if (isPause === false) {
//       percentTime += 1 / (time + 0.1);
//       $bar.css({
//         width: percentTime + "%"
//       });
//       if (percentTime >= 100) {
//         $slick.slick('slickNext');
//         startProgressbar();
//       }
//     }
//   }

//   function resetProgressbar() {
//     $bar.css({
//       width: 0 + '%'
//     });
//     clearTimeout(tick);
//   }

//   startProgressbar();

//   $('.slick-next, .slick-prev').click(function() {
//     startProgressbar();
//   });

  })

}