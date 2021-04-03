<template>
<div>
            <div class="col-1 text- left mt-2 mb-2">
                

            </div>
                <b-card-group deck class="mx-auto" style="width: 800px">
              
                  <b-card   
                    header="Delete Election" 
                    header-bg-variant="primary"
                    class="font-weight text-light"
                    style="max-width: 800px margin-left: 150px"
                    >

                        <b-form-group
                        >
                        <b-card class="text-left1">
                        <b-card-text class="dup">Are you sure you want to delete this election? This action is not reversible. 
                            Please contact support if you need to make a change to an election that has already launched.
                        </b-card-text>
                    
                                                    
                        </b-card>
                            <p></p>
                            <b-button style="max-width: 140px" class="botdel" block variant="success">Delete Election</b-button>
                        </b-form-group> 

                    </b-card>
                </b-card-group>

                
    </div>
</template>

<style>
.botdel{
    font-size: 14px;
    size: 100px;
    background-color: red;
}
    .dup{
        color: #302B2A;
        font-family: Arial;
        font-size: 15px;
    }
</style>
