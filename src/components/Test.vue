<template>
    <div class="h-screen bg-gray-200">
        <Header />
        <div class="bg-gray-200 p-6">
            <div class="container mx-auto space-y-6 lg:space-y-12">
                <div class="bg-white p-6 rounded-lg">
                    <h2 class="text-xl font-bold mb-4">Test Your Neural Network</h2>

                    <div class="mb-4">
                        <p class="block text-gray-700 text-md font-bold mb-2">Model Selected: <span>{{ modelName }}</span>
                        </p>
                        <p class="block text-gray-700 text-md mb-2">INFO: This only works with Basic neural networks
                            (LSTM/GPU are not supported)</p>

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
            const model = new brain.NeuralNetwork();

            model.fromJSON(this.selectedModel);

            let input = this.testData;
            
            try {
                input = JSON.parse(this.testData)
                if (!Array.isArray(input)) {
                    const temp = input;
                    input = [];
                    input.push(temp)
                }
            } catch (e) { console.log(e) }

            console.log(input)

            const modelOutput = model.run(input)

            this.$swal.fire({
                title: "Success!",
                html: `<p class="text-white">Output: ${modelOutput}</p>`,
                icon: 'success',
                customClass: {
                    popup: 'p-2 rounded-lg bg-gray-600 shadow-lg sm:p-3',
                    title: 'text-2xl font-medium text-white truncate',
                    input: 'bg-white text-center',
                    confirmButton: 'bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mx-2',
                    cancelButton: 'bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:gray-blue-500 rounded mx-2',
                }
            })
            // alert(`Running test with model ${this.selectedModel} and test data: ${this.testData}`);
            // Here you would actually run your neural network test and set the result
            // this.testResult = runNeuralNetworkTest(this.selectedModel, this.testData);
        }
    }
}
</script>