<template>
    <div class="bg-white p-6 rounded-lg flex-1">
        <h2 class="text-xl font-bold mb-4">Interactive JSON Editor</h2>
        <div id="jsonEditor">
            <div v-for="(row, index) in jsonEditorRows" :key="index" class="grid grid-cols-2 gap-2 mb-2">
                <input type="text" v-model="row.key" placeholder="Enter key" class="border p-2 rounded">
                <select v-model="row.type" @change="changeType(index)" class="border p-2 rounded">
                    <option disabled value="">Select type</option>
                    <option>String</option>
                    <option>Number</option>
                    <option>Boolean</option>
                    <option>Array</option>
                    <option>Object</option>
                </select>
                <input type="text" v-if="row.type==='String' || row.type==='Number' || row.type==='Boolean'" v-model="row.value" placeholder="Enter value" class="border p-2 rounded">
                <textarea v-if="row.type==='Array' || row.type==='Object'" v-model="row.value" placeholder="Enter value" class="border p-2 rounded"></textarea>
            </div>
        </div>
        <button id="addJsonRow" class="bg-blue-500 text-white p-2 rounded" @click="addNewRow">+</button>
    </div>
</template>

<script>
export default {
    name: 'JsonEditor',
    data() {
        return {
            jsonEditorRows: [
                { key: '', type: '', value: '' } // Initial row
            ]
        };
    },
    methods: {
        addNewRow() {
            this.jsonEditorRows.push({ key: '', type: '', value: '' });
        },
        changeType(index) {
            if(this.jsonEditorRows[index].type !== 'Array' && this.jsonEditorRows[index].type !== 'Object') {
                this.jsonEditorRows[index].value = '';
            } else {
                this.jsonEditorRows[index].value = '[]';
            }
        }
    }
}
</script>
