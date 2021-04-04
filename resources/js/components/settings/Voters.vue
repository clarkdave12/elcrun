<template>
  <div>
      
            <div class="col -1 text- left mt-2 mb-2">
            </div>
                <b-card-group deck class="mx-auto" style="width: 800px">
                    
                  <b-card   
                    header="Voters Settings" 
                    header-bg-variant="primary"
                    class="font-weight text-light"
                    style="max-width: 800px margin-left: 150px"
                    >
                     <b-card class="text-lefts">
                        <h6 class="en"><b> Weighted Voting </b></h6>
                        <b-card-text class="ena">Enabling this option will allow you to assign weights to each voter’s vote.</b-card-text>
                                     
                    <b-card class="text-left">

                    <b-card-text class="enab">Enabling this option will allow you to assign weights to each voter’s vote.</b-card-text>
                        
                    </b-card>
                    </b-card>
                    <b-card class="text-lefts">
                        <h6 class="en"><b> Ballot Receipt </b></h6>
                        <b-card-text class="ena">Enabling this option will allow voters to download a receipt that confirms their ballot <br>has been received.</b-card-text>
                        <b-card class="text-left">
                            <b-card-text class="enab">This setting cannot be changed after the election has been launched.</b-card-text>                                
                        </b-card>
                    </b-card>
                    <b-card class="text-lefts">
                        <h6 class="en"><b> Submit Ballot Confirmation</b></h6>
                        <b-card-text class="ena">When this option is enabled, voters will receive an alert when they 
                            submit their ballot<br> that allows them to continue or cancel and make additional charges.
                             This can be used<br> as a way to prevent accidental submissions or to require voters to double check ballot.</b-card-text>
                            
                    </b-card>
                    <b-form-group
                        class="text-dark"
                        >
                        <p></p>
                        <div class="form-group">
                            <label for="exampleFormControlTextarea1" class="sub"><b>Submit Ballot Confirmation Message</b></label>
                            <textarea class="form-control" id="haba" rows="3" placeholder="Default: Are you sure you want to submit your ballot?"></textarea>
                            
                        </div>
                    </b-form-group>
                    
                    <b-button style="max-width: 60px" class="botmes" block variant="success">Save</b-button>

                    
                      
                        
                    </b-card>
                </b-card-group>
                    
    </div>


</template>
<script>
  export default {
    data() {
      return {
        text: ''
      }
    }
  }
</script>
<style>
    .en{
        color: black;
    }
    .ena{
        color: black;
    }

    .sub{
        margin-left:15px
    }
    #haba{
     
        margin-left:15px;
        width:700px;
    }
    #weight{
        color: black;

    }
    .enab{
        margin-top: -12px;
        text-align: center;
        font-size: 13px;
        color:red;
      
    }




    .text-left{
        height: 40px;
        width: 470px;
        background-color: #FFDFDD;
        margin-left: 20px;
    }
</style>