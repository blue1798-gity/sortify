export function getHeapSortAnimations(array) {
    const animations = [];
    heapSortHelper(array, animations);
    return animations;
}

function heapSortHelper(array, animations) {
    buildMaxHeap(array, animations);
    
    for (let endIdx = array.length - 1; endIdx > 0; endIdx--) {
        swap(0, endIdx, array, animations);
        siftDown(0, endIdx - 1, array, animations);
    }
}

function buildMaxHeap(array, animations) {
    const firstParentIdx = Math.floor((array.length - 1) / 2);
    
    for (let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
        siftDown(currentIdx, array.length - 1, array, animations);
    }
}

function siftDown(currentIdx, endIdx, heap, animations) {
    let childOneIdx = currentIdx * 2 + 1;
    
    while (childOneIdx <= endIdx) {
        const childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
        let idxToSwap;
        
        if (childTwoIdx > -1 && heap[childTwoIdx] > heap[childOneIdx]) {
            idxToSwap = childTwoIdx;
        } else {
            idxToSwap = childOneIdx;
        }
        
        if (heap[idxToSwap] > heap[currentIdx]) {
            swap(currentIdx, idxToSwap, heap, animations);
            currentIdx = idxToSwap;
            childOneIdx = currentIdx * 2 + 1;
        } else {
            return;
        }
    }
}

function swap(i, j, array, animations) {
    // Collect animations for color change and swap
    animations.push([i, j]);  // Indicate comparison (color change)
    animations.push([i, j]);  // Revert color back to normal
    
    // Collect the swap animation (change heights)
    animations.push([i, array[j]]);
    animations.push([j, array[i]]);
    
    // Perform the actual swap
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}