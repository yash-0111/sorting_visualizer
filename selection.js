function selectionSort(arr, container) {
    let bars = createBars(arr, container);
    let n = arr.length;
    let i = 0, j = 0;

    function sortStep() {
        if (i < n - 1) {
            if (j < n) {
                bars.forEach(bar => bar.style.backgroundColor = ""); // Reset colors
                bars[j].style.backgroundColor = "red"; // Highlight the current bar
                bars[i].style.backgroundColor = "blue"; // Highlight the minimum bar

                if (arr[j] < arr[i]) {
                    i = j;
                }

                setTimeout(() => {
                    j++;
                    sortStep();
                }, 500); // Adjust the timeout for better visibility

            } else {
                swap(arr, i, j - 1);
                updateBars(bars, arr);
                i++;
                j = i;
                sortStep();
            }
        }
    }
    sortStep();
}
