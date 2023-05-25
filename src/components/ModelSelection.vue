<template>
    <div class="bg-white p-6 rounded-lg flex-1">
        <h2 class="text-xl font-bold mb-4">Model Selection</h2>
        <select class="border p-2 rounded w-full">
            <option>Select a model type</option>
            <!-- Add options here -->
        </select>
        <button id="trainModel" class="bg-green-500 text-white p-2 rounded mt-4">Train Model</button>
    </div>
</template>

<script>
export default {
    name: 'ModelSelection',
}
</script>
