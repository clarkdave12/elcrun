<template>
    <div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
            <div class="col-1 text- left mt-2 mb-2">
                

            </div>
                <b-card-group deck class="mx-auto" style="width: 800px">
              
                  <b-card   
                    header="Email Settings" 
                    header-bg-variant="primary"
                    class="font-weight text-light"
                    style="max-width: 800px margin-left: 150px"
                    >

                        <b-form-group
                        
                        >
                        <b-card class="text-leftss">
                        <h6 class="en"><b> Enable Email </b></h6>
                        <b-card-text class="float-left">Enabling this option will allow you 
                          to add an email address for your each of your voters.</b-card-text>
                        </b-card>
                        <b-button style="max-width: 60px" class="botem" block variant="success">Save</b-button>

                        </b-form-group> 

                    </b-card>
                </b-card-group>
                
    </div>
</template>

<script>
  export default {
    data() {
      return {
        selected: [],
        options: [
          
        ]
      }
    }
  }
</script>
<style scoped>
.float-left{
  margin-right: 100px;

}
.botem{
  
  margin-top: 20px;
    font-size: 14px;
    size: 80px;
    background-color:#30F404;
}
.en{
    font-size: 14px;
    size: 80px;
    color:black;
}
.float-left{
  color:black;
}

.text-leftss{
width: 700px;
height: 100px;
}

</style>