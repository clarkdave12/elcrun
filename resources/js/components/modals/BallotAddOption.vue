<template>
    <div>
  <b-button v-b-modal.modal-1 variant="success">+ Add Option</b-button>

  <b-modal 
  id="modal-1" 
  title="Add Option" 
  header-bg-variant="primary"
  header-text-variant="light"
  hide-footer
  size="lg"
  >
    <b-card>
        <b-icon icon="check-circle-fill" class="float-left mt-3" font-scale="2"></b-icon>
        <b-button class="float-right mt-4" variant="success" size="sm">Select</b-button>
        <h5 class="ml-5 mt-2">Standard Option</h5> 
        <p class="ml-5">A Candidate, Measure, Yes/No, Approve/Disapprove, etc.</p>
    </b-card>
    <b-card class="mt-1">
        <b-icon icon="pencil-square" class="float-left mt-4" font-scale="2"></b-icon>
        <b-button class="float-right mt-4" variant="success" size="sm">Select</b-button>
        <h5 class="ml-5 mt-2">Write-In Option</h5>
        <p class="ml-5">Voters can type in a response to the question.</p>     
    </b-card>
        <b-alert show variant="warning" class="mt-2">
            <p>Note: Write-in field maximum limit reached. You can only have as many "Write-In" options as the maximum number of options a voter can select. (Currently set to: 1)</p>
        </b-alert>
  </b-modal>
</div>
</template>