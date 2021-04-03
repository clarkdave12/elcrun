<template>
    <div>
        <b-button v-b-modal.modal-center variant="danger">Error Message</b-button>
            <b-modal 
                id="modal-center"
                centered
                hide-footer
                hide-header
            >   
            <div class="text-center">
                <b-icon icon="x-circle" font-scale="5" variant="danger"></b-icon>
            </div>
                <h1 class="text-center font-weight-bold">Oops...</h1>
                <h6 class="text-center mb-3 font-weight-light">Something went wrong</h6>
            </b-modal>
    </div>
</template>