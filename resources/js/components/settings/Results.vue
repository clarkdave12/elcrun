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
                        <h6 class="en"><b> Hide Results During Election </b></h6>
                        <b-card-text class="ena">Enabling this option will hide the election results from the election 
                            administrator until<br> the election has ended. Voters will not be able to view election 
                            results regardless of <br>this setting. This setting cannot be changed after 
                            your election launches.</b-card-text>
                        <b-card class="text-left">
                            <b-card-text class="enab">This setting cannot be changed after the election has been launched.</b-card-text>                                
                        </b-card>
                    </b-card>
                    <b-card class="text-lefts">
                        <h6 class="en"><b> Allow Duplicate Write-In Values</b></h6>
                        <b-card-text class="ena">Enabling this option will allow voters to provide the same values for 
                            all write-in options<br> on a given ballot question.</b-card-text>
                            
                    </b-card>
      
                    <p></p>
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