
// import React, { useRef, useEffect } from 'react';
// import img1 from "../../assets/HomeImages/img1.jpg";
// import img2 from "../../assets/HomeImages/img2.jpg";
// import img3 from "../../assets/HomeImages/img3.jpg";
// import img4 from "../../assets/HomeImages/img4.jpg";
// import './page1.css';


// function First() {


//   let nextBtn = document.querySelector('.next')
//   let prevBtn = document.querySelector('.prev')
  
//   let slider = document.querySelector('.slider')
//   let sliderList = slider.querySelector('.slider .list')
//   let thumbnail = document.querySelector('.slider .thumbnail')
//   let thumbnailItems = thumbnail.querySelectorAll('.item')
  
//   thumbnail.appendChild(thumbnailItems[0])
  
//   // Function for next button 
//   nextBtn.onclick = function() {
//       moveSlider('next')
//   }
  
  
//   // Function for prev button 
//   prevBtn.onclick = function() {
//       moveSlider('prev')
//   }
  
  
//   function moveSlider(direction) {
//       let sliderItems = sliderList.querySelectorAll('.item')
//       let thumbnailItems = document.querySelectorAll('.thumbnail .item')
      
//       if(direction === 'next'){
//           sliderList.appendChild(sliderItems[0])
//           thumbnail.appendChild(thumbnailItems[0])
//           slider.classList.add('next')
//       } else {
//           sliderList.prepend(sliderItems[sliderItems.length - 1])
//           thumbnail.prepend(thumbnailItems[thumbnailItems.length - 1])
//           slider.classList.add('prev')
//       }
  
  
//       slider.addEventListener('animationend', function() {
//           if(direction === 'next'){
//               slider.classList.remove('next')
//           } else {
//               slider.classList.remove('prev')
//           }
//       }, {once: true}) // Remove the event listener after it's triggered once
//   }
//   return (
//     <div>
//        <div class="slider">


// <div class="list">

//     <div class="item">
//         <img src={img1} alt=""/>

//         <div class="content">
//             <div class="title">MAGIC SLIDER</div>
//             <div class="type">FLOWER</div>
//             <div class="description">
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti temporibus quis eum consequuntur voluptate quae doloribus distinctio. Possimus, sed recusandae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, aut.
//             </div>
//             <div class="button">
//                 <button>SEE MORE</button>
//             </div>
//         </div>
//     </div>

//     <div class="item">
//         <img src={img2} alt=""/>

//         <div class="content">
//             <div class="title">MAGIC SLIDER</div>
//             <div class="type">NATURE</div>
//             <div class="description">
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti temporibus quis eum consequuntur voluptate quae doloribus distinctio. Possimus, sed recusandae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, aut.
//             </div>
//             <div class="button">
//                 <button>SEE MORE</button>
//             </div>
//         </div>
//     </div>

//     <div class="item">
//         <img src={img4} alt=""/>

//         <div class="content">
//             <div class="title">MAGIC SLIDER</div>
//             <div class="type">PLANT</div>
//             <div class="description">
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti temporibus quis eum consequuntur voluptate quae doloribus distinctio. Possimus, sed recusandae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, aut.
//             </div>
//             <div class="button">
//                 <button>SEE MORE</button>
//             </div>
//         </div>
//     </div>

//     <div class="item">
//         <img src={img3} alt=""/>

//         <div class="content">
//             <div class="title">MAGIC SLIDER</div>
//             <div class="type">NATURE</div>
//             <div class="description">
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti temporibus quis eum consequuntur voluptate quae doloribus distinctio. Possimus, sed recusandae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, aut.
//             </div>
//             <div class="button">
//                 <button>SEE MORE</button>
//             </div>
//         </div>
//     </div>

// </div>


// <div class="thumbnail">

//     <div class="item">
//         <img src={img1} alt=""/>
//     </div>
//     <div class="item">
//         <img src={img2} alt=""/>
//     </div>
//     <div class="item">
//         <img src={img4} alt=""/>
//     </div>
//     <div class="item">
//         <img src={img3} alt=""/>
//     </div>

// </div>


// <div class="nextPrevArrows">
//     <button class="prev">  </button>
//     <button class="next"> </button>
// </div>


// </div>
//     </div>
//   );
// }

// export default First;

