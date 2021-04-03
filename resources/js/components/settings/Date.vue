<template>

    <div>
        
            <div class="col-1 text- left mt-2 mb-2">
                

            </div>
                <b-card-group deck class="mx-auto" style="width: 800px">
              
                  <b-card   
                    header="Election Dates" 
                    header-bg-variant="primary"
                    class="font-weight text-light"
                    style="max-width: 800px margin-left: 150px"
                    >

                        <b-form-group
                        
                        >
                        <b-card class="date">
                        <h6 class="start"><b> Start Date  </b></h6>
                        <b-card-text class="float-left">Sat., April 3, 2021</b-card-text> 
                         <h6 class="end"><b> End Date  </b></h6>
                        <b-card-text id="right" class="float-right">Sat., April 3, 2021</b-card-text> 
                        <br><br>
                         <h6 class="start"><b> Timezone </b></h6>
                        
                        <div class="dropdown">
                        <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Dropdown link
                        </a>

                        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                        </div>
                          
                        </b-card>
                        <p></p>
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
       
<style>
    .start{
        font-size: 13px;
    }
    .date{
        color: black;
        font-size: 13px;
    }
    .end{
        text-align: right;
        margin-top: -22px;
        font-size: 13px;
        margin-right: 250px;
    }
    #right{
        margin-right: 207px;
    }
    #dropdownMenuButton{
        width: 655px;
        text-align: left;
    }
    
    
</style>