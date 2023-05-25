<template>
    <div class="bg-white p-6 rounded-lg flex-1">
        <h2 class="text-xl font-bold mb-4">Input Data</h2>
        <div id="inputData">
            <div class="grid grid-cols-2 gap-2 mb-2">
                <input type="text" placeholder="Enter input data" class="border p-2 rounded">
                <input type="text" placeholder="Enter output data" class="border p-2 rounded">
            </div>
        </div>
        <button id="addInputRow" class="bg-blue-500 text-white p-2 rounded">+</button>
    </div>
</template>

<script>
export default {
    name: 'InputData',
}
</script>
