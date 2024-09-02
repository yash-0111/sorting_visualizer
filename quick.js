function quickSort(arr, low, high, container) {
    let bars = createBars(arr, container);

    function quickSortStep(low, high) {
        if (low < high) {
            let pi = partition(low, high);
            quickSortStep(low, pi - 1);
            quickSortStep(pi + 1, high);
        }
    }

    function partition(low, high) {
        let pivot = arr[high];
        let i = low - 1;
        for (let j = low; j <= high - 1; j++) {
            if (arr[j] < pivot) {
                i++;
                swap(arr, i, j);
                updateBars(bars, arr);
            }
        }
        swap(arr, i + 1, high);
        updateBars(bars, arr);
        return i + 1;
    }

    quickSortStep(low, high);
}
