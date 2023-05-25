<template>
    <div class="bg-white p-6 rounded-lg flex-1">
        <h2 class="text-xl font-bold mb-4">Training Progress and ETA</h2>
        <div id="etaTimer" class="mt-4">
            <h3 class="font-bold">ETA:</h3>
            <p id="eta">N/A</p>
        </div>
        <div class="mt-4">
            <h3 class="font-bold">Training Progress:</h3>
            <div id="progressBar" class="h-4 bg-gray-200 rounded">
                <div id="progressBarFill" class="h-full bg-green-500 rounded" style="width: 0;"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TrainingProgress',
}
</script>
