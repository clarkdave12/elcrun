<template>
    <div>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
            <b-button size="sm" variant="primary" class="info" v-b-modal.modal-1><i type="button" class="fa fa-info"></i></b-button>
                <b-modal
                    id="modal-1"
                    title="Candidate Name"
                    header-bg-variant="primary"
                    modal-header-close
                    header-text-variant="light"
                    hide-footer
                    size="lg"
                >
                <b-container class="row">
                    <b-col>
                        <b-img class="mr-3" right src="https://picsum.photos/125/125/?image=58"></b-img>
                    </b-col>
                    <b-col cols="8">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </b-col>
                </b-container>

                </b-modal>
    </div>
</template>

<style>
/* .fa-info-circle{
    color: rgb(0,191,255); 
} */
.info{
    border-radius: 50%;
    height: 30px;
    width: 30px;
}

</style>
        