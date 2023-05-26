<template>
    <div class="h-screen bg-gray-200">
        <Header />
        <div class="bg-gray-200 p-6">
        <div class="container mx-auto">
            <div class="bg-white p-6 rounded-lg">
                <h2 class="text-xl font-bold mb-4">How to Use</h2>
                <ol class="list-decimal list-inside">
                    <li>Select a data set from the "Data Selection" dropdown menu.</li>
                    <li>Enter your input and output data in the "Input Data" section. Click on the "+" button to add more
                        rows of data.</li>
                    <li>Select a model type from the "Model Selection" dropdown menu.</li>
                    <li>Click on the "Train Model" button to start the model training process.</li>
                    <li>Monitor the training progress using the ETA timer and progress bar.</li>
                    <li>Once the model is trained, you can view the output data and retrain the model if necessary.</li>
                </ol>
            </div>
            <div class="bg-white p-6 rounded-lg mt-6">
                <h2 class="text-xl font-bold mb-4">Frequently Asked Questions</h2>
                <details class="mb-4">
                    <summary class="font-bold mb-2">How long does the training process take?</summary>
                    <p>The training process can take anywhere from a few seconds to several hours, depending on the
                        complexity of the model and the size of the data set. You can monitor the progress using the ETA
                        timer and progress bar.</p>
                </details>
                <details class="mb-4">
                    <summary class="font-bold mb-2">Can I use my own data set?</summary>
                    <p>Currently, the application supports pre-defined data sets. We are working on a feature to allow users
                        to upload their own data sets. Stay tuned!</p>
                </details>
                <details class="mb-4">
                    <summary class="font-bold mb-2">What types of models can I train?</summary>
                    <p>The application supports a variety of neural network models. You can choose the model type from the
                        "Model Selection" dropdown menu.</p>
                </details>
                <!-- Add more FAQs here -->
            </div>
        </div>
    </div>
    </div>
</template>
  
<script>
import Header from './Header.vue';

export default {
    name: 'FAQ',
    components: {
        Header
    }
}
</script>