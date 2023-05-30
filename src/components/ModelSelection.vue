<template>
    <div class="bg-white p-6 rounded-lg flex-1">
        <h2 class="text-xl font-bold mb-4">Model Selection</h2>
        <select class="border p-2 rounded w-full" @change="modelChanged($event)">
            <option>Select a model type</option>
            <option value="basic">Basic</option>
            <option value="gpu">Basic (GPU Accelerated)</option>
            <option value="lstm">LSTM (use for text)</option>
        </select>
        <button id="trainModel" class="bg-green-500 text-white p-2 rounded mt-4" @click="trainModelClicked">Train Model</button>
    </div>
</template>

<script>
export default {
    name: 'ModelSelection',
    methods: {
        trainModelClicked() {
            this.$emit('train-model');
        },
        modelChanged(model) {
            // console.log(model.target.value)
            this.$emit('model-changed', model.target.value)
        }
    }
}
</script>
