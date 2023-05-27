<template>
    <div class="bg-white p-6 rounded-lg flex-1">
      <h2 class="text-xl font-bold mb-4">Interactive JSON Editor</h2>
      <div id="jsonEditor" v-if="!showJson">
        <div v-for="(row, index) in jsonEditorRows" :key="index" class="grid grid-cols-4 gap-2 mb-2">
          <input type="text" v-model="row.key" placeholder="Enter key" class="border p-2 rounded">
          <select v-model="row.type" @change="openModal(index)" class="border p-2 rounded">
            <option disabled value="">Select type</option>
            <option disabled>String</option>
            <option>Number</option>
            <option>Boolean</option>
            <option>Array</option>
            <option>Object</option>
          </select>
          <input type="text" v-if="row.type === 'String'" v-model="row.value" placeholder="Enter value" class="border p-2 rounded">
          <input type="number" v-if="row.type === 'Number'" v-model.number="row.value" placeholder="Enter value" class="border p-2 rounded">
          <select v-if="row.type === 'Boolean'" v-model="row.value" class="border p-2 rounded">
            <option>true</option>
            <option>false</option>
          </select>
          <input type="text" v-if="row.type === 'Array' || row.type === 'Object'" v-model="row.output" placeholder="JSON output" class="border p-2 rounded" readonly>
          <div class="flex items-center">
            <button class="bg-red-500 text-white p-2 rounded ml-2 inline-flex items-center" @click="removeRow(index)">
              <svg class="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 1C5.03 1 1 5.03 1 10C1 14.97 5.03 19 10 19C14.97 19 19 14.97 19 10C19 5.03 14.97 1 10 1ZM13 13H7V7H13V13Z" fill="currentColor" />
              </svg>
              Remove
            </button>
          </div>
        </div>
      </div>
      <div v-else>
        <textarea v-model="jsonCode" class="border p-2 rounded mb-4" style="width: 100%; height: 200px;"></textarea>
        <button class="bg-blue-500 text-white p-2 rounded m-2" @click="toggleJsonEditor">Back to Editor</button>
        <button class="bg-green-500 text-white p-2 rounded m-2" @click="downloadJson">Download JSON</button>
        <button class="bg-purple-500 text-white p-2 rounded m-2" @click="saveJson">Save as Dataset</button>
      </div>
      <div class="flex" v-if="!showJson">
        <button class="bg-blue-500 text-white p-2 rounded inline-flex items-center" @click="addNewRow">
          <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16 13H13V16C13 16.55 12.55 17 12 17C11.45 17 11 16.55 11 16V13H8C7.45 13 7 12.55 7 12C7 11.45 7.45 11 8 11H11V8C11 7.45 11.45 7 12 7C12.55 7 13 7.45 13 8V11H16C16.55 11 17 11.45 17 12C17 12.55 16.55 13 16 13Z" fill="currentColor" />
          </svg>
          Add
        </button>
        <button class="bg-green-500 text-white p-2 rounded inline-flex items-center ml-2" @click="toggleJsonEditor">Save Dataset</button>
      </div>
  
      <!-- Array Modal -->
      <div v-if="showArrayModal" class="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-black opacity-50"></div> <!-- Overlay -->
        <div class="relative inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-8 align-middle max-w-lg w-full">
          <div class="p-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">Add Array Elements</h3>
            <div v-for="(item, index) in arrayModalData" :key="index" class="mt-2">
              <input type="number" :value="item" @input="updateArrayElement($event, index)" placeholder="Enter element" class="border p-2 rounded">
            </div>
            <button class="bg-blue-500 text-white p-2 rounded mt-4" @click="addArrayElement">+</button>
            <button class="bg-green-500 text-white p-2 rounded mt-4 ml-4" @click="saveArrayModalData">Save</button>
          </div>
        </div>
      </div>
  
      <!-- Object Modal -->
      <div v-if="showObjectModal" class="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-black opacity-50"></div> <!-- Overlay -->
        <div class="relative inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-8 align-middle max-w-lg w-full">
          <div class="p-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">Add Object Properties</h3>
            <div v-for="(item, index) in objectModalData" :key="index" class="mt-2 grid grid-cols-2 gap-2">
              <input type="text" :value="item.key" @input="updateObjectKey($event, index)" placeholder="Enter key" class="border p-2 rounded">
              <input type="number" :value="item.value" @input="updateObjectValue($event, index)" placeholder="Enter value" class="border p-2 rounded">
            </div>
            <button class="bg-blue-500 text-white p-2 rounded mt-4" @click="addObjectProperty">+</button>
            <button class="bg-green-500 text-white p-2 rounded mt-4 ml-4" @click="saveObjectModalData">Save</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'JsonEditor',
    data() {
      return {
        jsonEditorRows: [
          { key: '', type: '', value: '', output: '' } // Initial row
        ],
        showArrayModal: false,
        arrayModalData: [],
        currentArrayIndex: null,
        showObjectModal: false,
        objectModalData: [],
        currentObjectIndex: null,
        showJson: false,
        jsonCode: ''
      };
    },
    methods: {
      addNewRow() {
        this.jsonEditorRows.push({ key: '', type: '', value: '', output: '' });
      },
      openModal(index) {
        if (this.jsonEditorRows[index].type === 'Array') {
          this.showArrayModal = true;
          this.currentArrayIndex = index;
        } else if (this.jsonEditorRows[index].type === 'Object') {
          this.showObjectModal = true;
          this.currentObjectIndex = index;
        }
      },
      updateArrayElement(event, index) {
        this.arrayModalData[index] = Number(event.target.value);
      },
      addArrayElement() {
        this.arrayModalData.push(null);
      },
      saveArrayModalData() {
        if (this.arrayModalData.every((element) => typeof element === 'number')) {
          this.jsonEditorRows[this.currentArrayIndex].output = JSON.stringify(this.arrayModalData);
        } else {
          // Handle error when array elements are not numbers
          alert('Array elements should be numbers');
        }
        this.showArrayModal = false;
        this.arrayModalData = [];
        this.currentArrayIndex = null;
      },
      updateObjectKey(event, index) {
        this.objectModalData[index].key = event.target.value;
      },
      updateObjectValue(event, index) {
        this.objectModalData[index].value = Number(event.target.value);
      },
      addObjectProperty() {
        this.objectModalData.push({ key: '', value: null });
      },
      saveObjectModalData() {
        const keys = new Set();
        for (const item of this.objectModalData) {
          if (keys.has(item.key)) {
            // Handle error when keys are not unique
            alert('Keys should be unique within the JSON');
            return;
          }
          keys.add(item.key);
        }
        if (this.objectModalData.every((item) => typeof item.value === 'number')) {
          const obj = {};
          for (const item of this.objectModalData) {
            obj[item.key] = item.value;
          }
          this.jsonEditorRows[this.currentObjectIndex].output = JSON.stringify(obj);
        } else {
          // Handle error when object values are not numbers
          alert('Object values should be numbers');
        }
        this.showObjectModal = false;
        this.objectModalData = [];
        this.currentObjectIndex = null;
      },
      removeRow(index) {
        this.jsonEditorRows.splice(index, 1);
      },
      toggleJsonEditor() {
        this.showJson = !this.showJson;
        if (this.showJson) {
            console.log(this.jsonEditorRows)
          const jsonRows = this.jsonEditorRows.map((row) => {
            // why isnt there a macro for this :sad:
            let val;
            if(row.value) val = row.value;
            else val = row.output;

            return {
              input: row.key,
              output: val
            };
          });
          this.jsonCode = JSON.stringify(jsonRows, null, 2);
          this.$emit('input-data-updated', this.jsonCode);
        }
      },
      downloadJson() {
        const jsonData = this.jsonCode;
        this.$emit('input-data-updated', jsonData);
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonData));
        element.setAttribute('download', 'json_data.json');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      },
      saveJson() {
        const jsonData = this.jsonCode;
        this.$emit('input-data-updated', jsonData);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const element = document.createElement('a');
        element.href = url;
        element.setAttribute('download', 'json_data.json');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        URL.revokeObjectURL(url);
      }
    }
  };
  </script>
  