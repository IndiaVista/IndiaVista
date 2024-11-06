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

    // useEffect(() => {
    //     const sliderElement = document.querySelector('.slider');
    //     const sliderList = sliderElement.querySelector('.list');
    //     const thumbnailElement = sliderElement.querySelector('.thumbnail');

    //     function moveSlider(direction) {
    //         const sliderItems = sliderList.querySelectorAll('.item');
    //         const thumbnailItems = thumbnailElement.querySelectorAll('.item');

    //         if (direction === 'next') {
    //             sliderList.appendChild(sliderItems[0]);
    //             thumbnailElement.appendChild(thumbnailItems[0]);
    //             sliderElement.classList.add('next');
    //         } else {
    //             sliderList.prepend(sliderItems[sliderItems.length - 1]);
    //             thumbnailElement.prepend(thumbnailItems[thumbnailItems.length - 1]);
    //             sliderElement.classList.add('prev');
    //         }

    //         sliderElement.addEventListener('animationend', function () {
    //             sliderElement.classList.remove(direction === 'next' ? 'next' : 'prev');
    //         }, { once: true });
    //     }

    //     // Automatically move slider every 5 seconds
    //     const interval = setInterval(() => {
    //         moveSlider('next');
    //     }, 5000);

    //     // Clear interval on component unmount
    //     return () => clearInterval(interval);
    // }, []);
    return (
        <>
           <div id='home' 
           className="slider">
  <div className="list">
    {/* Taj Mahal */}
    <div className="item">
      <img src={img1} alt="Taj Mahal" />
      <div className="content">
        <div className="title">Taj Mahal</div>
        <div className="type">Historical Monument</div>
        <div className="description text-white">
          The Taj Mahal, located in Agra, India, is an iconic symbol of love built by Mughal Emperor Shah Jahan in memory of his wife Mumtaz Mahal. This white marble mausoleum is known for its exquisite beauty and architectural perfection.
        </div>
        <div className="button">
          <button>SEE MORE</button>
        </div>
      </div>
    </div>

    {/* India Gate */}
    <div className="item">
      <img src={img2} alt="India Gate" />
      <div className="content">
        <div className="title">India Gate</div>
        <div className="type">War Memorial</div>
        <div className="description text-white">
          India Gate, situated in New Delhi, is a war memorial honoring the soldiers who sacrificed their lives during World War I. Designed by Sir Edwin Lutyens, it stands as a symbol of bravery and valor.
        </div>
        <div className="button">
          <button>SEE MORE</button>
        </div>
      </div>
    </div>

    {/* Hawa Mahal */}
    <div className="item">
      <img src={img3} alt="Hawa Mahal" />
      <div className="content">
        <div className="title">Hawa Mahal</div>
        <div className="type">Palace of Winds</div>
        <div className="description text-white">
          Hawa Mahal, or the "Palace of Winds," is located in Jaipur, Rajasthan. Built by Maharaja Sawai Pratap Singh, this pink sandstone structure is famous for its unique design, with numerous small windows allowing royal women to observe street festivities.
        </div>
        <div className="button">
          <button>SEE MORE</button>
        </div>
      </div>
    </div>

    {/* Konark Sun Temple */}
    <div className="item">
      <img src={img4} alt="Konark Sun Temple" />
      <div className="content">
        <div className="title">Konark Sun Temple</div>
        <div className="type">Sun Temple</div>
        <div className="description text-white">
          The Konark Sun Temple, located in Odisha, India, is an architectural marvel dedicated to the Hindu sun god Surya. Built in the 13th century by King Narasimhadeva I, it is known for its chariot-shaped design and intricate carvings.
        </div>
        <div className="button">
          <button>SEE MORE</button>
        </div>
      </div>
    </div>
  </div>

  <div className="thumbnail">
    <div className="item">
      <img src={img1} alt="Taj Mahal" />
    </div>
    <div className="item">
      <img src={img2} alt="India Gate" />
    </div>
    <div className="item">
      <img src={img3} alt="Hawa Mahal" />
    </div>
    <div className="item">
      <img src={img4} alt="Konark Sun Temple" />
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
