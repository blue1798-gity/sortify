export function getBubbleSortAnimations(array) {
    const animations = [];
    bubbleSortHelper(array, animations);
    return animations;
}

function bubbleSortHelper(array, animations) {
    let isSorted = false;
    let counter = 0;
    
    while (!isSorted) {
        isSorted = true;
        for (let i = 0; i < array.length - 1 - counter; i++) {
            // Push the pair of indices to change color (comparison)
            animations.push([i, i + 1]);
            // Push the same indices to revert color back to normal
            animations.push([i, i + 1]);
            
            if (array[i] > array[i + 1]) {
                // If elements need to be swapped, push the swap animation
                animations.push([i, array[i + 1]]);
                animations.push([i + 1, array[i]]);
                
                // Perform the swap in the array
                swap(array, i, i + 1);
                isSorted = false;
            } else {
                // If no swap needed, push dummy height change to keep animation in sync
                animations.push([i, array[i]]);
                animations.push([i + 1, array[i + 1]]);
            }
        }
        counter++;
    }
}

function swap(array, i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}