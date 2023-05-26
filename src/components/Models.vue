<template>
    <div class="h-screen bg-gray-200">
        <Header />
        <div class="bg-gray-200 p-6 pt-12">
            <div class="container mx-auto space-y-6 lg:space-y-12">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
                    <div class="bg-white p-6 rounded-lg">
                        <h2 class="text-xl font-bold mb-4">Train Using a Private Model</h2>
                        <select v-model="selectedPrivateModel" class="border p-2 rounded w-full mb-4">
                            <option disabled value="">Select a pre-saved private model</option>
                            <option v-for="model in privateModels" :key="model.id" :value="model.id">{{ model.name }}
                            </option>
                        </select>
                        <button @click="trainModel(selectedPrivateModel)" class="bg-green-500 text-white p-2 rounded mr-4"
                            :disabled="!selectedPrivateModel">Train Model</button>
                        <button @click="downloadModel(selectedPrivateModel)" class="bg-blue-500 text-white p-2 rounded"
                            :disabled="!selectedPrivateModel">Download Model</button>
                    </div>

                    <div class="bg-white p-6 rounded-lg">
                        <h2 class="text-xl font-bold mb-4">Train Using a Public Model</h2>
                        <select v-model="selectedPublicModel" class="border p-2 rounded w-full mb-4">
                            <option disabled value="">Select a pre-saved public model</option>
                            <option v-for="model in publicModels" :key="model.id" :value="model.id">{{ model.name }}
                            </option>
                        </select>
                        <button @click="trainModel(selectedPublicModel)" class="bg-green-500 text-white p-2 rounded mr-4"
                            :disabled="!selectedPublicModel">Train Model</button>
                        <button @click="downloadModel(selectedPublicModel)" class="bg-blue-500 text-white p-2 rounded"
                            :disabled="!selectedPublicModel">Download Model</button>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
                    <div class="bg-white p-6 rounded-lg">
                        <h2 class="text-xl font-bold mb-4">Have a Well-Trained Model?</h2>
                        <p>If you have a well-trained model and you would like it to be added to the public models, please
                            PM
                            me.</p>
                    </div>

                    <div class="bg-white p-6 rounded-lg">
                        <h2 class="text-xl font-bold mb-4">How to Import a Trained Model</h2>
                        <p>If you want to import a trained model, you can download the pretrained neural network JavaScript
                            function or the raw JSON weights, depending on your needs.</p>
                    </div>

                    <div class="bg-white p-6 rounded-lg">
                        <h2 class="text-xl font-bold mb-4">More Public Models Coming Soon!</h2>
                        <p>We're continuously working to add more public models to our repository. Stay tuned!</p>
                    </div>

                    <div class="bg-white p-6 rounded-lg">
                        <h2 class="text-xl font-bold mb-4">Enterprise and Commercial Use</h2>
                        <p>For enterprise or commercial use, or if you need priority support, please <a
                                href="mailto:your-email@example.com" class="underline text-blue-600">contact me</a>.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import Header from './Header.vue';

export default {
    data() {
        return {
            privateModels: [
                { id: 1, name: 'Private Model 1' },
                { id: 2, name: 'Private Model 2' },
            ],
            publicModels: [
                { id: 3, name: 'Public Model 1' },
                { id: 4, name: 'Public Model 2' },
            ],
            selectedPrivateModel: '',
            selectedPublicModel: ''
        };
    },
    components: {
        Header
    },
    methods: {
        trainModel(modelId) {
            alert(`Training model: ${modelId}`);
        },
        downloadModel(modelId) {
            alert(`Downloading model: ${modelId}`);
        }
    }
}
</script>