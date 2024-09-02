function insertionSort(arr, container) {
    let n = arr.length;
    let bars = createBars(arr, container);
    
    let i = 1;

    function sortStep() {
        if (i < n) {
            let key = arr[i];
            let j = i - 1;
            bars.forEach(bar => bar.style.backgroundColor = ""); // Reset colors
            
            function insertionStep() {
                if (j >= 0 && arr[j] > key) {
                    bars[j].style.backgroundColor = "red"; // Highlight the bar being compared
                    bars[j + 1].style.backgroundColor = "blue"; // Highlight the position to insert
                    arr[j + 1] = arr[j];
                    updateBars(bars, arr);
                    
                    setTimeout(() => {
                        j--;
                        insertionStep();
                    }, 500); // Adjust the timeout for better visibility
                } else {
                    arr[j + 1] = key;
                    updateBars(bars, arr);
                    i++;
                    sortStep();
                }
            }
            insertionStep();
            
        }
    }
    sortStep();
}