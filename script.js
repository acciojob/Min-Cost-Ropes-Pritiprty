function mincost(arr) {
    // Initialize a priority queue (min-heap) with the given array
    const priorityQueue = new MinHeap(arr);
priorityQueue.sort((a, b) => a - b);
    // Initialize the total cost
    let totalCost = 0;

    // Continue until there's only one rope left in the priority queue
    while (priorityQueue.size() > 1) {
        // Extract the two ropes with the minimum lengths
        const min1 = priorityQueue.extractMin();
        const min2 = priorityQueue.extractMin();

        // Connect the ropes and calculate the cost
        const connectedRope = min1 + min2;
        totalCost += connectedRope;

        // Put the connected rope back into the priority queue
        priorityQueue.insert(connectedRope);
    }

    // Return the total cost
    return totalCost;
}

// Implementation of MinHeap data structure
class MinHeap {
    constructor(arr = []) {
        this.heap = [];
        arr.forEach(val => this.insert(val));
    }

    size() {
        return this.heap.length;
    }

    insert(val) {
        this.heap.push(val);
        this.bubbleUp();
    }

    extractMin() {
        const min = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.sinkDown();
        }
        return min;
    }

    bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            const element = this.heap[index];
            const parentIndex = Math.floor((index - 1) / 2);
            const parent = this.heap[parentIndex];
            if (parent <= element) break;
            this.heap[parentIndex] = element;
            this.heap[index] = parent;
            index = parentIndex;
        }
    }

    sinkDown() {
        let index = 0;
        const length = this.heap.length;
        const element = this.heap[0];
        while (true) {
            let leftChildIdx = 2 * index + 1;
            let rightChildIdx = 2 * index + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftChildIdx < length) {
                leftChild = this.heap[leftChildIdx];
                if (leftChild < element) {
                    swap = leftChildIdx;
                }
            }
            if (rightChildIdx < length) {
                rightChild = this.heap[rightChildIdx];
                if (
                    (swap === null && rightChild < element) ||
                    (swap !== null && rightChild < leftChild)
                ) {
                    swap = rightChildIdx;
                }
            }

            if (swap === null) break;
            this.heap[index] = this.heap[swap];
            this.heap[swap] = element;
            index = swap;
        }
    }
}

// Test cases
console.log(mincost([4, 3, 2, 6]));  // Output: 29
console.log(mincost([1, 2, 3, 4, 5]));  // Output: 33

