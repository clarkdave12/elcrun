<template>
    <div>
        <b-button variant="outline-primary" v-b-modal.modal><b-icon class="mr-1" icon="cloud-arrow-up-fill"></b-icon>Import</b-button>
        <b-modal 
        id="modal"
        title="Import Ballot"
        header-bg-variant="primary"
        header-text-variant="light"
        hide-footer
        size="lg"
        >
            <b-card border-variant="light">
                    <div class="dot float-left"><h6 class="text-center">1</h6></div>
                    <h5 class="float-left ml-4 font-weight-bold">Read import instructions</h5>
                    <p class="float-left ml-5">To get started, <b-link href="https://electionrunner.com/support/kb/ballot/how-to-import-your-ballot/">click here</b-link> to read the instructions for importing your ballot and to download the import templates.</p>
            </b-card>
            <b-card border-variant="light" class="mt-2">
                <div class="dot float-left"><h6 class="text-center">2</h6></div>
                    <b-form-group class="font-weight-bold ml-5" v-slot="{ ariaDescribedby }">
                        <h5 class="font-weight-bold">What are you importing?</h5>
                        <b-form-radio class="font-weight-normal" v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="A">Questions</b-form-radio>
                        <b-form-radio class="font-weight-normal" v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="B">Options</b-form-radio>
                    </b-form-group>
            </b-card>
            <b-card border-variant="light" class="mt-2">
                <div class="dot float-left"><h6 class="text-center">3</h6></div>
                <h5 class="float-left font-weight-bold ml-4">Select the <b-badge variant="warning">questions</b-badge> import file</h5>
                <b-form-file v-model="file" class="float-left ml-5" plain></b-form-file>
            </b-card>
        </b-modal>
        
    </div>
</template>
<script>
  export default {
    data() {
      return {
        selected: '',
        file: null
      }
    }
  }
</script>
<style scoped>
.dot {
  height: 25px;
  width: 25px;
  background-color: skyblue;
  border-radius: 50%;
}
h6 {
    text-align: center;
    color: white;
}
</style>