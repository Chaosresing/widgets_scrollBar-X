
import React, { useState, useRef, useEffect } from 'react';

function SelectOtdel() {

  const containerRef = useRef(null);
  const [scrollLeftTo, setScrollLeft] = useState(false);
  const [scrollRight, setScrollRight] = useState(true);

  const itemsSpisok = [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6',
    'Item 7',
    'Item 8',
    'Item 9',
    'Item 10',
    'Item 11',
    'Item 12',
  ]

  // убрать кнопку скролла 
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      setScrollLeft(container.scrollLeft !== 0);
      setScrollRight(container.scrollLeft + container.clientWidth !== container.scrollWidth);
    };

    containerRef.current.addEventListener('scroll', handleScroll);

    return () => {
      containerRef.current.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // анимация скролла при прокрутки колессика
  const smoothScrollTo = (element, scrollLeft, duration) => {
    const start = element.scrollLeft;
    const change = scrollLeft - start;
    let currentTime = 0;
    const increment = 20;

    const animateScroll = () => {
      currentTime += increment;
      const val = easeInOutQuad(currentTime, start, change, duration);
      element.scrollLeft = val;
      if (currentTime < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    animateScroll();
  };

  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) {
      return c / 2 * t * t + b;
    }
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  };

  // скролл колесиком
  const handleWheel = (event) => {
    const deltaY = event.deltaY;
  
    containerRef.current.scrollLeft += event.deltaX !== 0 ? event.deltaX : deltaY;
    event.preventDefault();
  
    const scrollAmount = 130; // количество прокрутки равное 1 элементу списка
    let scrollLeft = containerRef.current.scrollLeft;
  
    if (deltaY < 0) {
      scrollLeft -= scrollAmount; 
    } else {
      scrollLeft += scrollAmount; 
    }
  
    const duration = 10; // скорость прокрутки
  
    smoothScrollTo(containerRef.current, scrollLeft, duration);
  };

  // скролл влево при нажатие кнопки 
  const handleScrollLeft = () => {
    containerRef.current.scrollTo({
      left: containerRef.current.scrollLeft - 130,
      behavior: 'smooth'
    });
  };

  // скролл вправо при нажатие кнопки 
  const handleScrollRight = () => {
    containerRef.current.scrollTo({
      left: containerRef.current.scrollLeft + 130,
      behavior: 'smooth'
    });
  };

  return (
    <div className='selectOtdel'>
      <button className={!scrollLeftTo ? ('selectOtdel__button-left inactiv') : ('selectOtdel__button-left') } onClick={handleScrollLeft}>
        <div className='selectOtdel__button-arrowLeft'></div>
      </button>

      <ul className='selectOtdel-spisok' ref={containerRef} onWheel={handleWheel} >
      { itemsSpisok.map((item, index) => (
          <li key={index}>  
            <button className='selectOtdel-spisok__item' textAlt={item}> {item} </button>
          </li>
        ))}
      </ul>

      <button className={!scrollRight ? ('selectOtdel__button-right inactiv') : ('selectOtdel__button-right')} onClick={handleScrollRight}> 
        <div className='selectOtdel__button-arrowRight'></div> 
      </button>
    </div>
  );
}
  
export default SelectOtdel;
  