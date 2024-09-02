function mergeSort(arr, l, r, container) {
    let bars = createBars(arr, container);

    function mergeSortStep(l, r) {
        if (l < r) {
            let m = Math.floor((l + r) / 2);
            mergeSortStep(l, m);
            mergeSortStep(m + 1, r);
            merge(l, m, r);
            updateBars(bars, arr);
        }
    }

    function merge(l, m, r) {
        let n1 = m - l + 1;
        let n2 = r - m;
        let L = [], R = [];
        for (let i = 0; i < n1; i++) L[i] = arr[l + i];
        for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

        let i = 0, j = 0, k = l;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                arr[k] = L[i];
                i++;
            } else {
                arr[k] = R[j];
                j++;
            }
            k++;
        }
        while (i < n1) arr[k++] = L[i++];
        while (j < n2) arr[k++] = R[j++];
    }

    mergeSortStep(0, arr.length - 1);
}