<template>
    <div>
        <!-- <b-button v-b-modal.modal-center>●●●</b-button>
            <b-modal
                id="modal-center"
                centered
                hide-footer
                hide-header
            >
            <div class="text-center">
                <b-icon icon="exclamation-circle" font-scale="5" variant="warning"></b-icon>
            </div>
                <h1 class="text-center font-weight-bold">Warning!</h1>
                <h6 class="text-center mb-3 font-weight-light">Are you sure you want to delete this option?</h6>
                    <div class="text-center">
                        <b-button class="mr-1" variant="primary" size="lg">Yes</b-button>
                        <b-button variant="secondary" size="lg">No</b-button>
                    </div>
            </b-modal> -->
            <div class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">Save changes</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
    </div>
</template>
