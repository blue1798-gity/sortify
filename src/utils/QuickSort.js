export function getQuickSortAnimations(arr) {
    const animations = [];
    quickSortHelper(arr, 0, arr.length - 1, animations);
    console.log("Quick");
    return animations;
    }
    
    function quickSortHelper(arr, low, high, animations) {
    while (low < high) {
        const pivotIndex = partition(arr, low, high, animations);
        // Optimize by always sorting the smaller partition first
        if (pivotIndex - low < high - pivotIndex) {
        quickSortHelper(arr, low, pivotIndex - 1, animations);
        low = pivotIndex + 1; // Move to the larger partition
        } else {
        quickSortHelper(arr, pivotIndex + 1, high, animations);
        high = pivotIndex - 1; // Move to the smaller partition
        }
    }
    }
    
    function partition(arr, low, high, animations) {
    const pivot = arr[low];
    let left = low + 1;
    let right = high;
    
    while (left <= right) {
        if (arr[left] > pivot && arr[right] < pivot) {
        swap(arr, left, right, animations);
        }
        if (arr[left] <= pivot) left++;
        if (arr[right] >= pivot) right--;
    }
    swap(arr, low, right, animations);
    return right;
    }
    
    function swap(arr, i, j, animations) {
    animations.push([i, j]); // Indicating the comparison (color change)
    animations.push([i, j]); // Reverting the color change
    animations.push([i, arr[j]]); // Swapping heights of bars
    animations.push([j, arr[i]]); // Swapping heights of bars
    
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    }
    