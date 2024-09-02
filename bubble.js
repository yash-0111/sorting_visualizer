async function BubbleSort(array, delay = 100) {
    const container = document.getElementById("visualization");
    createBars(array, container);
    const blocks = document.querySelectorAll(".bar");

    for (let i = 0; i < blocks.length; i++) {
        for (let j = 0; j < blocks.length - i - 1; j++) {
            blocks[j].style.backgroundColor = "#FF4949";
            blocks[j + 1].style.backgroundColor = "#FF4949";

            await new Promise(resolve =>
                setTimeout(() => resolve(), delay)
            );

            const value1 = Number(blocks[j].querySelector(".label").textContent);
            const value2 = Number(blocks[j + 1].querySelector(".label").textContent);

            if (value1 > value2) {
                // Swap elements in the DOM
                await swap(blocks[j], blocks[j + 1]);

                // Update the array values and labels
                array[j] = value2;
                array[j + 1] = value1;
                updateBars(blocks, array);
            }

            blocks[j].style.backgroundColor = "#6b5b95";
            blocks[j + 1].style.backgroundColor = "#6b5b95";
        }
        blocks[blocks.length - i - 1].style.backgroundColor = "#13CE66";
    }
}

function swap(el1, el2) {
    return new Promise(resolve => {
        const temp = el1.style.height;
        el1.style.height = el2.style.height;
        el2.style.height = temp;

        const tempValue = el1.querySelector(".label").textContent;
        el1.querySelector(".label").textContent = el2.querySelector(".label").textContent;
        el2.querySelector(".label").textContent = tempValue;

        window.requestAnimationFrame(() => {
            setTimeout(() => {
                el1.parentNode.insertBefore(el2, el1);
                resolve();
            }, 250);
        });
    });
}

function createBars(arr, container) {
    container.innerHTML = ''; // Clear previous bars
    arr.forEach(value => {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value * 5}px`; // Scale height
        bar.style.width = `30px`; // Fixed width
        bar.style.margin = "0 2px"; // Margin for spacing

        // Create label
        const label = document.createElement("div");
        label.classList.add("label");
        label.textContent = value;
        label.style.position = 'absolute';
        label.style.bottom = '100%';
        label.style.left = '50%';
        label.style.transform = 'translateX(-50%)';
        label.style.fontSize = '12px';
        label.style.color = '#000';

        bar.appendChild(label);
        container.appendChild(bar);
    });
}

function updateBars(bars, arr) {
    arr.forEach((value, index) => {
        bars[index].style.height = `${value * 5}px`;
        bars[index].querySelector(".label").textContent = value;
    });
}
