import React, { useEffect, useState } from 'react';
import './SortingVisualizer.css';
import { getMergeSortAnimations } from '../utils/MergeSort';
import { getQuickSortAnimations } from '../utils/QuickSort';
import { getHeapSortAnimations } from '../utils/Heap';
import { getBubbleSortAnimations } from '../utils/BubbleSort';

const SortingVisualizer = () => {
  const [arr, setArray] = useState([]);
  const [animationSpeed, setAnimationSpeed] = useState(5);

  useEffect(() => {
    resetMyArray();
  }, []);

  // Function to generate a new random array
  const resetMyArray = () => {
    const array = [];
    for (let i = 0; i < 200; i++) {
      array.push(randomIntFromInterval(5, 600));
    }
    setArray(array);
  };

  // Merge Sort Visualizer
  const myMergeSort = () => {
    const animations = getMergeSortAnimations(arr);
    animateSorting(animations, 3, animationSpeed, "red", "#86C232");
  };

  // Quick Sort Visualizer
  const myQuickSort = () => {
    const animations = getQuickSortAnimations(arr);
    animateSorting(animations, 4, animationSpeed, "red", "#86C232");
  };

  // Heap Sort Visualizer
  const myHeapSort = () => {
    const animations = getHeapSortAnimations(arr);
    animateSorting(animations, 4, animationSpeed, "red", "#86C232");
  };

  // Bubble Sort Visualizer
  const myBubbleSort = () => {
    const animations = getBubbleSortAnimations(arr);
    animateSorting(animations, 4, animationSpeed, "red", "#86C232");
  };

  // Helper function to animate different sorting algorithms
  const animateSorting = (animations, colorChangeFrequency, animationSpeed, color1, color2) => {
    const arrayBars = document.getElementsByClassName('array-bar');

    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % colorChangeFrequency < colorChangeFrequency / 2;

      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        if (arrayBars[barOneIdx] && arrayBars[barTwoIdx]) {
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const color = i % colorChangeFrequency === 0 ? color1 : color2;
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * animationSpeed);
        }
      } else {
        setTimeout(() => {
          const [barIdx, newHeight] = animations[i];
          if (arrayBars[barIdx]) {
            const barStyle = arrayBars[barIdx].style;
            barStyle.height = `${newHeight}px`;
          }
        }, i * animationSpeed);
      }
    }
  };

  // Function to handle slider change
  const handleSpeedChange = (event) => {
    setAnimationSpeed(Number(event.target.value));
  };

  return (
    <div className='arr-container'>
      <div className='arr-container2'>
      {arr.map((value, index) => (
        <div className="array-bar" key={index} style={{ backgroundColor: '#86C232', height: `${value}px` }}></div>
      ))}
      </div>
      <div className="button-container">
        <div className='txt'>Sorting Visualizer</div>
        <div className="buttons">
        <button className="btn" onClick={resetMyArray}>Shuffle Array</button>
        <button className="btn" onClick={myMergeSort}>Merge Sort</button>
        <button className="btn" onClick={myQuickSort}>Quick Sort</button>
        <button className="btn" onClick={myHeapSort}>Heap Sort</button>
        <button className="btn" onClick={myBubbleSort}>Bubble Sort</button>
        </div>
        <div className="speed-control">
          <label htmlFor="speedRange" className='ani-speed'>Animation Speed: {animationSpeed} ms</label>
          <input 
            id="speedRange"
            type="range" 
            min="1" 
            max="50" 
            value={animationSpeed} 
            onChange={handleSpeedChange}
            className="speed-slider" 
          />
        </div>
      </div>
    </div>
  );
};

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default SortingVisualizer;
