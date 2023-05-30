<template>
    <div class="h-screen bg-gray-200">
        <Header />
        <div class="bg-gray-200 p-6">
            <div class="container mx-auto space-y-6 lg:space-y-12">
                <div class="bg-white p-6 rounded-lg">
                    <h2 class="text-xl font-bold mb-4">Test Your Neural Network</h2>

                    <div class="mb-4">
                        <p class="block text-gray-700 text-md font-bold mb-2">Model Selected: <span>{{ modelName }}</span></p>
                        
                        <!-- <select id="model-select" v-model="selectedModel" class="border p-2 rounded w-full">
                            <option disabled value="">Please select a model</option>
                            <option v-for="model in models" :key="model.id" :value="model.id">{{ model.name }}</option>
                        </select> -->
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="test-data">Input Test Data:</label>
                        <input id="test-data" type="text" v-model="testData" placeholder="Enter test data here"
                            class="border p-2 rounded w-full">
                    </div>

                    <button @click="runTest" class="bg-green-500 text-white p-2 rounded"
                        :disabled="!selectedModel || !testData">Run Test</button>

                    <div v-if="testResult !== null" class="mt-4">
                        <h3 class="text-lg font-bold mb-2">Test Result:</h3>
                        <p>{{ testResult }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import Header from './Header.vue';

import * as brain from 'brain.js';

export default {
    data() {
        return {
            selectedModel: '',
            testData: '',
            testResult: null,
            modelName: "N/A"
        };
    },
    components: {
        Header
    },
    created() {
        let local;
        try {
            local = JSON.parse(localStorage.getItem("testModel"));
        } catch (e) {
            console.log(e)
        };

        const name = localStorage.getItem("testModelName");


        this.selectedModel = local;
        this.modelName = name;
    },
    methods: {
        runTest() {
            const model = brain.fromJSON()
            alert(`Running test with model ${this.selectedModel} and test data: ${this.testData}`);
            // Here you would actually run your neural network test and set the result
            // this.testResult = runNeuralNetworkTest(this.selectedModel, this.testData);
        }
    }
}
</script>