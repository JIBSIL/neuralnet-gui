<template>
    <div class="h-screen bg-gray-200">
        <Header />
        <div class="bg-gray-200 p-6">
            <div class="container mx-auto">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
                    <div class="flex flex-col space-y-6 h-full">
                        <DataSelection />
                        <ModelSelection @train-model="handleTrainModel" @model-changed="handleModelUpdate" />
                    </div>
                    <div class="flex flex-col space-y-6 h-full">
                        <InputData @input-data-updated="handleInputDataUpdate" />
                        <TrainingProgress />
                    </div>
                </div>
                <HelpAndInstructions />
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
                    <Advertising />
                    <FollowUs />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
whitetext {
    color: white
}
</style>

<script>
import DataSelection from './DataSelection.vue';
import ModelSelection from './ModelSelection.vue';
import InputData from './InputData.vue';
import TrainingProgress from './TrainingProgress.vue';
import HelpAndInstructions from './HelpAndInstructions.vue';
import Advertising from './Advertising.vue';
import FollowUs from './FollowUs.vue';
import Header from './Header.vue';

import * as brain from 'brain.js';

export default {
    components: {
        DataSelection,
        ModelSelection,
        InputData,
        TrainingProgress,
        HelpAndInstructions,
        Advertising,
        FollowUs,
        Header
    },
    data() {
        return {
            dataset: {},
            model: "",
            done(title, message, model) {
                return new Promise((resolve) => {
                    this.$swal.fire({
                        title,
                        html: `<p class="text-white">${message}</p>`,
                        icon: 'success',
                        confirmButtonText: 'Save',
                        denyButtonText: 'Cancel',
                        customClass: {
                            popup: 'p-2 rounded-lg bg-gray-600',
                            title: 'text-2xl font-medium text-white truncate',
                            input: 'bg-white text-center',
                            confirmButton: 'bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mx-2',
                            cancelButton: 'bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:gray-blue-500 rounded mx-2',
                        }
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.$swal.fire({
                                title: "Name your Model",
                                html: `<p class="text-white">Select a name for your model</p>`,
                                input: 'text',
                                icon: 'success',
                                confirmButtonText: 'Save',
                                denyButtonText: 'Cancel',
                                showLoaderOnConfirm: true,
                                preConfirm: (input) => {
                                    const obj = localStorage.getItem("models");
                                    let parsed;
                                    if(obj) {
                                        try {
                                            parsed = JSON.parse(obj);
                                        } catch(e) {
                                            parsed = {}
                                        }
                                    } else {
                                        parsed = {}
                                    }
                                    parsed[input] = model;
                                    localStorage.setItem("models", JSON.stringify(parsed))
                                    return;
                                },
                                allowOutsideClick: () => !Swal.isLoading(),
                                customClass: {
                                    popup: 'p-2 rounded-lg bg-gray-600 shadow-lg sm:p-3',
                                    title: 'text-2xl font-medium text-white truncate',
                                    input: 'bg-white text-center',
                                    confirmButton: 'bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mx-2',
                                    cancelButton: 'bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:gray-blue-500 rounded mx-2',
                                }
                            }).then(() => {
                                console.log('redirect');
                                this.$router.push('models')
                                resolve()
                            })
                        } else {
                            resolve()
                        }
                    })
                })
            },
            error(title, message) {
                this.$swal.fire({
                    title,
                    html: `<p class="text-white">${message}</p>`,
                    icon: 'error',
                    customClass: {
                        popup: 'p-2 rounded-lg bg-gray-600 shadow-lg sm:p-3',
                        title: 'text-2xl font-medium text-white truncate',
                        input: 'bg-white text-center',
                        confirmButton: 'bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mx-2',
                        cancelButton: 'bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:gray-blue-500 rounded mx-2',
                    }
                })
            }
        }
    },
    methods: {
        handleInputDataUpdate(inputDataRows) {
            this.dataset = inputDataRows;
        },
        handleModelUpdate(model) {
            console.log('Updating to ' + model)
            this.model = model;
            const isLSTM = this.model === 'lstm' ? true : false;
            this.emitter.emit('model-changed', isLSTM);
        },
        handleTrainModel() {
            // Your existing train model logic
            let dataset = JSON.parse(this.dataset);
            for (let i = 0; i < dataset.length; i++) {
                try {
                    dataset[i].input = JSON.parse(dataset[i].input)
                    if (!Array.isArray(dataset[i].input)) {
                        const temp = dataset[i].input;
                        dataset[i].input = [];
                        dataset[i].input.push(temp)
                    }
                } catch (e) { }

                try {
                    dataset[i].output = JSON.parse(dataset[i].output)
                    if (!Array.isArray(dataset[i].output)) {
                        const temp = dataset[i].output;
                        dataset[i].output = [];
                        dataset[i].output.push(temp)
                    }
                } catch (e) { }
            }

            const config = {
                binaryThresh: 0.5,
                hiddenLayers: [3], // array of ints for the sizes of the hidden layers in the network
                activation: 'sigmoid', // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
                log: (msg) => {
                    // console.log(msg)
                    this.emitter.emit('progress-updated', {
                        isDone: false,
                        isRunning: true,
                        error: msg.error,
                        iterations: msg.iterations
                    });
                }
            };

            let net;
            const type = this.model

            if (type === "basic") {
                net = new brain.NeuralNetwork(config)
            } else if (type === "gpu") {
                net = new brain.NeuralNetworkGPU(config)
            } else if (type === "lstm") {
                net = new brain.recurrent.LSTM(config)
            } else {
                this.error("Input Error", "No network selected! Select one under \"Model Selection\"")
                throw new Error("No network selected")
            }

            net.train(dataset);

            this.emitter.emit('progress-updated', {
                isDone: true,
                isRunning: false,
                error: null,
                iterations: null
            })

            console.log(`NN output: ${net.run([1, 0])}`)
            this.done("Success!", "Model successfully trained. Would you like to save it?", net.toJSON())
        }
    }
}
</script>
