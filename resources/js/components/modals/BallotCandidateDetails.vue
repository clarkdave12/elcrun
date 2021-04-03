<template>
    <div>
        <b-button v-b-modal.modal-lg variant="outline-primary" v-b-modal.modal-center>Details</b-button>
            <b-modal 
                id="modal-center" 
                centered title="Option Details"
                header-bg-variant="primary"
                modal-header-close
                header-text-variant="light"
                hide-footer
                size="lg"
            >
                <h6>Question</h6>
                    <b-card no-body style="max-width:300px">
                        <h6 class="ml-2">BOARD OF DIRECTORS</h6>
                    </b-card>
                <h6 class="mt-2">Title</h6>
                    <b-img class="mr-3" right src="https://picsum.photos/125/125/?image=58"></b-img>
                <h6 class="float-right mt-5 mr-2">Photo</h6>
                    <b-card no-body style="max-width:200px">
                        <h6 class="ml-2">Candidate Name</h6>
                    </b-card>
                <h6 class="mt-2">Short Description</h6>
                    <b-card style="max-width:400px">
                        <h6>Short Description</h6>
                    </b-card>
                <h6 class="mt-4">Description</h6>
                    <b-card >
                        <h6 class="ml-2">Description</h6>
                    </b-card>
            </b-modal>
    </div>
</template>