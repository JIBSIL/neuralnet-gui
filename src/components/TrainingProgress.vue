<template>
    <div class="bg-white p-6 rounded-lg flex-1">
        <h2 class="text-xl font-bold mb-4">Training Progress and ETA</h2>
        <div id="etaTimer" class="mt-4">
            <h3 class="font-bold">Status:</h3>
            <p id="status">{{ statusPretty }}</p>
            <h3 class="font-bold">Error Rate:</h3>
            <p id="error">{{ errorPretty }}</p>
        </div>
        <!-- <div class="mt-4">
            <h3 class="font-bold">Training Progress:</h3>
            <div id="progressBar" class="h-4 bg-gray-200 rounded">
                <div id="progressBarFill" class="h-full bg-green-500 rounded" style="width: 0;"></div>
            </div>
        </div> -->
    </div>
</template>

<script>
export default {
    name: 'TrainingProgress',
    data() {
        return {
            done: false,
            iterations: 0,
            error: 0,
            running: false,
            statusPretty: 'N/A',
            errorPretty: 'N/A'
        }
    },
    mounted() {
        this.emitter.on('progress-updated', (main) => {
            const isDone = main.isDone;
            const isRunning = main.isRunning;
            const error = main.error;
            const iterations = main.iterations;

            this.done = isDone;
            this.iterations = iterations === null ? this.iterations : iterations;
            this.error = error === null ? this.error : error;
            this.running = isRunning;
            console.log(`New setting for Progress. Done: ${isDone}, Progress: ${this.iterations},Error: ${this.error}. Is running: ${isRunning}`)

            // prettify for ui
            if(this.done) {
                this.statusPretty = "Done!"
            } else if (this.running) {
                this.statusPretty = "Running..."
            } else {
                this.statusPretty = "Waiting"
            }

            if(this.error) {
                this.errorPretty = `${(this.error * 100).toFixed(2)}%`
            } else {
                this.errorPretty = "N/A"
            }

        });
    },
}
</script>
