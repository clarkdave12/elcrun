<template>
<div>
    <b-card-group class="mx-auto">
        <b-card>
            <b-card-text class="float-left">
                <h5 class="font-weight-bold">Test Election</h5>
            </b-card-text>
            <b-badge variant="secondary" class="ml-2">Building</b-badge>
            <b-card-text class="float-right">
                <h5 class="mt-1 ml-2">0 Voters</h5>
            </b-card-text>
            <b-badge variant="success" class="float-right mt-2">Free</b-badge>
        </b-card>
    </b-card-group>
    <b-card-group>
        <b-card>
            <b-card-text class="float-left">
                <h5>Ballot</h5>
            </b-card-text>
            <b-button variant="secondary" class="float-right ml-1" size="sm">●●●</b-button>
            <b-button variant="success" class="float-right" size="sm">+ Add Question</b-button>
            <b-button variant="outline-primary" class="float-right mr-1" size="sm">Import</b-button>
        </b-card>
    </b-card-group>
    <div>
        <b-card-group class="mx-auto mt-5" style="width:800px">
            <b-card>
                <b-button variant="secondary" class="float-right mt-3" size="sm">●●●</b-button>
                <h5 class="font-weight-bold">New Multiple Choice Question</h5>
                <h6>Multiple Choice</h6>
                <b-tabs class="mt-4">
                    <b-tab title="Options">
                        <b-card-group class="mx-auto mt-1">
                            <b-card>
                                <b-img class="mt-2 ml-4 mb-2" left src="https://picsum.photos/125/125/?image=58" alt="Left image"></b-img>
                                <b-card-text class="ml-3 mt-5 float-left"><h6>Name of Candidate</h6></b-card-text>
                                <b-button variant="outline-primary" class="float-right mt-5">Details</b-button>
                            </b-card>   
                        </b-card-group>
                        <b-card-group class="mx-auto mt-1">
                            <b-card>
                                <b-img class="mt-2 ml-4 mb-2" left src="https://picsum.photos/125/125/?image=58" alt="Left image"></b-img>
                                <b-card-text class="ml-3 mt-5 float-left"><h6>Name of Candidate</h6></b-card-text>
                                <b-button variant="outline-primary" class="float-right mt-5">Details</b-button>
                            </b-card>   
                        </b-card-group>
                            <b-button variant="success" class="mt-2 ml-1 mb-1 float-left">Add Option</b-button>
                    </b-tab>
                    <b-tab title="Details">
                         <h4 class="mt-2">Rules</h4>
                        <b-card class="mb-1" no-body>Voters are required to select a minimum of 1 option(s)</b-card>
                        <b-card no-body>Voters can only select 1 option</b-card>
                    </b-tab>
                    <b-tab title="Attachments">
                        <h6 class="mt-2">You can attach up to 3 documents to this question. Learn more about ballot question attachments.</h6>
                        <b-form-file v-model="file1" class="mt-3" plain></b-form-file>
                    </b-tab>
                </b-tabs>
            </b-card>
        </b-card-group>
    </div>
</div>
</template>

<script>
export default {
    data() {
      return {
        file1: null,
      }
    }

}
</script>

<style scoped>

</style>
