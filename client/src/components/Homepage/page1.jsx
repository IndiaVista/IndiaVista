// import { useEffect } from 'react';
// import { useState } from 'react';
// import img1 from "../../assets/HomeImages/img1.jpg";
// import img2 from "../../assets/HomeImages/img2.jpg";
// import img3 from "../../assets/HomeImages/img3.jpg";
// import img4 from "../../assets/HomeImages/img4.jpg";
// import './page1.css';

// function App() {
//     const [slider, setSlider] = useState(null);
//     const [thumbnail, setThumbnail] = useState(null);

//     useEffect(() => {
//         const nextBtn = document.querySelector('.next');
//         const prevBtn = document.querySelector('.prev');
//         const sliderElement = document.querySelector('.slider');
//         const sliderList = sliderElement.querySelector('.list');
//         const thumbnailElement = sliderElement.querySelector('.thumbnail');
//         const thumbnailItems = thumbnailElement.querySelectorAll('.item');

//         setSlider(sliderElement);
//         setThumbnail(thumbnailElement);
//         thumbnailElement.appendChild(thumbnailItems[0]); // Move the first thumbnail to the end

//         // Function for next button
//         nextBtn.onclick = function () {
//             moveSlider('next');
//         }

//         // Function for prev button
//         prevBtn.onclick = function () {
//             moveSlider('prev');
//         }

//         function moveSlider(direction) {
//             const sliderItems = sliderList.querySelectorAll('.item');
//             const thumbnailItems = thumbnailElement.querySelectorAll('.item');

//             if (direction === 'next') {
//                 sliderList.appendChild(sliderItems[0]);
//                 thumbnailElement.appendChild(thumbnailItems[0]);
//                 sliderElement.classList.add('next');
//             } else {
//                 sliderList.prepend(sliderItems[sliderItems.length - 1]);
//                 thumbnailElement.prepend(thumbnailItems[thumbnailItems.length - 1]);
//                 sliderElement.classList.add('prev');
//             }

//             sliderElement.addEventListener('animationend', function () {
//                 if (direction === 'next') {
//                     sliderElement.classList.remove('next');
//                 } else {
//                     sliderElement.classList.remove('prev');
//                 }
//             }, { once: true }); // Remove the event listener after it's triggered once
//         }
//     }, []); // Empty dependency array ensures this effect runs once after initial render

//     return (
//         <>
//             <div className="slider">
//                 <div className="list">
//                     <div className="item">
//                         <img src={img1} alt="" />
//                         <div className="content">
//                             <div className="title">MAGIC SLIDER</div>
//                             <div className="type">FLOWER</div>
//                             <div className="description">
//                                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti temporibus quis eum consequuntur voluptate quae doloribus distinctio. Possimus, sed recusandae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, aut.
//                             </div>
//                             <div className="button">
//                                 <button>SEE MORE</button>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="item">
//                         <img src={img2} alt="" />
//                         <div className="content">
//                             <div className="title">MAGIC SLIDER</div>
//                             <div className="type">NATURE</div>
//                             <div className="description">
//                                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti temporibus quis eum consequuntur voluptate quae doloribus distinctio. Possimus, sed recusandae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, aut.
//                             </div>
//                             <div className="button">
//                                 <button>SEE MORE</button>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="item">
//                         <img src={img3} alt="" />
//                         <div className="content">
//                             <div className="title">MAGIC SLIDER</div>
//                             <div className="type">PLANT</div>
//                             <div className="description">
//                                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti temporibus quis eum consequuntur voluptate quae doloribus distinctio. Possimus, sed recusandae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, aut.
//                             </div>
//                             <div className="button">
//                                 <button>SEE MORE</button>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="item">
//                         <img src={img4} alt="" />
//                         <div className="content">
//                             <div className="title">MAGIC SLIDER</div>
//                             <div className="type">NATURE</div>
//                             <div className="description">
//                                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti temporibus quis eum consequuntur voluptate quae doloribus distinctio. Possimus, sed recusandae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, aut.
//                             </div>
//                             <div className="button">
//                                 <button>SEE MORE</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="thumbnail">
//                     <div className="item">
//                         <img src={img1} alt="" />
//                     </div>
//                     <div className="item">
//                         <img src={img2} alt="" />
//                     </div>
//                     <div className="item">
//                         <img src={img3} alt="" />
//                     </div>
//                     <div className="item">
//                         <img src={img4} alt="" />
//                     </div>
//                 </div>

//                 <div className="nextPrevArrows">
//                     <button className="prev">&lt;</button>
//                     <button className="next">&gt;</button>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default App;

import { useEffect } from 'react';
import { useState } from 'react';
import img1 from "../../assets/HomeImages/img1.jpg";
import img2 from "../../assets/HomeImages/img2.jpg";
import img3 from "../../assets/HomeImages/img3.jpg";
import img4 from "../../assets/HomeImages/img4.jpg";
import './page1.css';

function App() {
    const [slider, setSlider] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);

    useEffect(() => {
        const nextBtn = document.querySelector('.next');
        const prevBtn = document.querySelector('.prev');
        const sliderElement = document.querySelector('.slider');
        const sliderList = sliderElement.querySelector('.list');
        const thumbnailElement = sliderElement.querySelector('.thumbnail');
        const thumbnailItems = thumbnailElement.querySelectorAll('.item');

        // setSlider(sliderElement);
        // setThumbnail(thumbnailElement);
        // thumbnailElement.appendChild(thumbnailItems[0]); // Move the first thumbnail to the end

        // Function for next button
        nextBtn.onclick = function () {
            moveSlider('next');
        }

        // Function for prev button
        prevBtn.onclick = function () {
            moveSlider('prev');
        }

        function moveSlider(direction) {
            const sliderItems = sliderList.querySelectorAll('.item');
            const thumbnailItems = thumbnailElement.querySelectorAll('.thumbnail .item');

            if (direction === 'next') {
                sliderList.appendChild(sliderItems[0]);
                thumbnailElement.appendChild(thumbnailItems[0]);
                sliderElement.classList.add('next');
                
            } else {
                sliderList.prepend(sliderItems[sliderItems.length - 1]);
                thumbnailElement.prepend(thumbnailItems[thumbnailItems.length - 1]);
                sliderElement.classList.add('prev');
            }

            sliderElement.addEventListener('animationend', function () {
                if (direction === 'next') {
                    sliderElement.classList.remove('next');
                } else {
                    sliderElement.classList.remove('prev');
                }
            }, { once: true }); // Remove the event listener after it's triggered once
        }
    }, []); // Empty dependency array ensures this effect runs once after initial render

    return (
        <>
            <div className="slider">
                <div className="list">
                    <div className="item">
                        <img src={img1} alt="" />
                        <div className="content">
                            <div className="title">MAGIC SLIDER</div>
                            <div className="type">FLOWER</div>
                            <div className="description">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti temporibus quis eum consequuntur voluptate quae doloribus distinctio. Possimus, sed recusandae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, aut.
                            </div>
                            <div className="button">
                                <button>SEE MORE</button>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <img src={img2} alt="" />
                        <div className="content">
                            <div className="title">MAGIC SLIDER</div>
                            <div className="type">NATURE</div>
                            <div className="description">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti temporibus quis eum consequuntur voluptate quae doloribus distinctio. Possimus, sed recusandae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, aut.
                            </div>
                            <div className="button">
                                <button>SEE MORE</button>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <img src={img3} alt="" />
                        <div className="content">
                            <div className="title">MAGIC SLIDER</div>
                            <div className="type">PLANT</div>
                            <div className="description">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti temporibus quis eum consequuntur voluptate quae doloribus distinctio. Possimus, sed recusandae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, aut.
                            </div>
                            <div className="button">
                                <button>SEE MORE</button>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <img src={img4} alt="" />
                        <div className="content">
                            <div className="title">MAGIC SLIDER</div>
                            <div className="type">NATURE</div>
                            <div className="description">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti temporibus quis eum consequuntur voluptate quae doloribus distinctio. Possimus, sed recusandae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, aut.
                            </div>
                            <div className="button">
                                <button>SEE MORE</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="thumbnail">
                    <div className="item">
                        <img src={img1} alt="" />
                    </div>
                    <div className="item">
                        <img src={img2} alt="" />
                    </div>
                    <div className="item">
                        <img src={img3} alt="" />
                    </div>
                    <div className="item">
                        <img src={img4} alt="" />
                    </div>
                </div>

                <div className="nextPrevArrows">
                    <button className="prev">&lt;</button>
                    <button className="next">&gt;</button>
                </div>
            </div>
        </>
    );
}

export default App;
