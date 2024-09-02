document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("visualize").addEventListener("click", visualizeSorting);
});

function createBars(arr, container) {
    container.innerHTML = ''; // Clear previous bars
    let bars = [];
    arr.forEach(value => {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value * 5}px`; // Scale height
        bar.style.width = `30px`; // Fixed width
        bar.style.margin = "0 2px"; // Margin for spacing
        
        // Create label
        let label = document.createElement("div");
        label.classList.add("label");
        label.textContent = value;
        bar.appendChild(label);
        
        container.appendChild(bar);
        bars.push(bar);
    });
    return bars;
}

function updateBars(bars, arr) {
    arr.forEach((value, index) => {
        bars[index].style.height = `${value * 3}px`;
        bars[index].querySelector(".label").textContent = value;
    });
}

function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function visualizeSorting() {
    const size = parseInt(document.getElementById("array-size").value);
    const elements = document.getElementById("array-elements").value.split(',').map(Number);
    const algorithm = document.getElementById("algorithm").value;
    const visualizationContainer = document.getElementById("visualization");
    
    if (size < 1 || size > 10 || elements.length !== size || Math.max(...elements) >= 50) {
        alert("Please enter a valid array size (1-10) and elements (values less than 50).");
        return;
    }

    visualizationContainer.innerHTML = ""; 

    switch (algorithm) {
        case "bubble":
            bubbleSort(elements, visualizationContainer);
            displayCodeAndComplexity('bubble');
            break;
        case "selection":
            selectionSort(elements, visualizationContainer);
            displayCodeAndComplexity('selection');
            break;
        case "insertion":
            insertionSort(elements, visualizationContainer);
            displayCodeAndComplexity('insertion');
            break;
        case "merge":
            mergeSort(elements, 0, elements.length - 1, visualizationContainer);
            displayCodeAndComplexity('merge');
            break;
        case "quick":
            quickSort(elements, 0, elements.length - 1, visualizationContainer);
            displayCodeAndComplexity('quick');
            break;
    }
}

function displayCodeAndComplexity(algorithm) {
    const codeOutput = document.getElementById("code");
    const timeComplexity = document.getElementById("time-complexity");
    const spaceComplexity = document.getElementById("space-complexity");

    let code = "";
    let timeComp = "";
    let spaceComp = "";

    switch (algorithm) {
        case "bubble":
            code = `// C++ code for Bubble Sort\nvoid bubbleSort(int arr[], int n) {\n    for (int i = 0; i < n-1; i++) {\n        for (int j = 0; j < n-i-1; j++) {\n            if (arr[j] > arr[j+1]) {\n                swap(arr[j], arr[j+1]);\n            }\n        }\n    }\n}`;
            timeComp = "Time Complexity: O(n^2)";
            spaceComp = "Space Complexity: O(1)";
            break;
        case "selection":
            code = `// C++ code for Selection Sort\nvoid selectionSort(int arr[], int n) {\n    for (int i = 0; i < n-1; i++) {\n        int min_idx = i;\n        for (int j = i+1; j < n; j++) {\n            if (arr[j] < arr[min_idx]) {\n                min_idx = j;\n            }\n        }\n        swap(arr[min_idx], arr[i]);\n    }\n}`;
            timeComp = "Time Complexity: O(n^2)";
            spaceComp = "Space Complexity: O(1)";
            break;
        case "insertion":
            code = `// C++ code for Insertion Sort\nvoid insertionSort(int arr[], int n) {\n    for (int i = 1; i < n; i++) {\n        int key = arr[i];\n        int j = i - 1;\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j];\n            j--;\n        }\n        arr[j + 1] = key;\n    }\n}`;
            timeComp = "Time Complexity: O(n^2)";
            spaceComp = "Space Complexity: O(1)";
            break;
        case "merge":
            code = `// C++ code for Merge Sort\nvoid merge(int arr[], int l, int m, int r) {\n    int n1 = m - l + 1;\n    int n2 = r - m;\n    int L[n1], R[n2];\n    for (int i = 0; i < n1; i++)\n        L[i] = arr[l + i];\n    for (int j = 0; j < n2; j++)\n        R[j] = arr[m + 1 + j];\n    int i = 0, j = 0, k = l;\n    while (i < n1 && j < n2) {\n        if (L[i] <= R[j]) {\n            arr[k] = L[i];\n            i++;\n        } else {\n            arr[k] = R[j];\n            j++;\n        }\n        k++;\n    }\n    while (i < n1) {\n        arr[k] = L[i];\n        i++;\n        k++;\n    }\n    while (j < n2) {\n        arr[k] = R[j];\n        j++;\n        k++;\n    }\n}\n\nvoid mergeSort(int arr[], int l, int r) {\n    if (l >= r) return;\n    int m = l + (r - l) / 2;\n    mergeSort(arr, l, m);\n    mergeSort(arr, m + 1, r);\n    merge(arr, l, m, r);\n}`;
            timeComp = "Time Complexity: O(n log n)";
            spaceComp = "Space Complexity: O(n)";
            break;
        case "quick":
            code = `// C++ code for Quick Sort\nint partition(int arr[], int low, int high) {\n    int pivot = arr[high];\n    int i = (low - 1);\n    for (int j = low; j <= high - 1; j++) {\n        if (arr[j] < pivot) {\n            i++;\n            swap(arr[i], arr[j]);\n        }\n    }\n    swap(arr[i + 1], arr[high]);\n    return (i + 1);\n}\n\nvoid quickSort(int arr[], int low, int high) {\n    if (low < high) {\n        int pi = partition(arr, low, high);\n        quickSort(arr, low, pi - 1);\n        quickSort(arr, pi + 1, high);\n    }\n}`;
            timeComp = "Time Complexity: O(n log n)";
            spaceComp = "Space Complexity: O(log n)";
            break;
    }

    codeOutput.textContent = code;
    timeComplexity.textContent = timeComp;
    spaceComplexity.textContent = spaceComp;
}
