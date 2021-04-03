<template>
    <div>
  <b-button v-b-modal.modal-1 variant="success">+ Add Question</b-button>

  <b-modal 
  id="modal-1" 
  title="Add Ballot Question" 
  header-bg-variant="primary"
  header-text-variant="light"
  hide-footer
  size="lg"
  > 
    <div class="text-center">
        <h4 class="mt-2 mb-4">What type of question would you like to add to the ballot?</h4>
    </div>
    <b-card>
        <b-icon icon="list-ul" class="float-left mt-3" font-scale="2"></b-icon>
        <b-button class="float-right mt-4" variant="success" size="sm">Select</b-button>
        <h5 class="ml-5 mt-2 font-weight-bold">Multiple Choice</h5> 
        <p class="ml-5">Voters select one or more options from a list</p>
    </b-card>
    <b-card class="mt-1">
        <b-icon icon="list-ol" class="float-left mt-4" font-scale="2"></b-icon>
        <b-button class="float-right mt-4" variant="success" size="sm">Select</b-button>
        <h5 class="ml-5 mt-2 font-weight-bold">Ranked Choice (IRV)</h5>
        <p class="ml-5">Voters rank options by preference. Results will be determined using Instant Run-off Voting.</p>     
    </b-card>
  </b-modal>
</div>
</template>