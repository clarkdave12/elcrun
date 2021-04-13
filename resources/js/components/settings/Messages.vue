<template>
  <div>
            <div class="col -1 text- left mt-2 mb-2">
            </div>
                <b-card-group deck class="mx-auto" style="width: 800px">
              
                  <b-card   
                    header="Election Messages" 
                    header-bg-variant="primary"
                    class="font-weight-bold text-light"
                    style="max-width: 800px margin-left: 150px"
                    >
                    <b-form-group
                        class="text-dark"
                        >
                        <div class="Elecmessage">
                            Login Instructions
                        </div>
                        <p></p>
                        <h6>This is the text that will appear on the election.</h6>
                        <div class="form-group">
                            <label for="exampleFormControlTextarea1">Example textarea</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Login Instructions..."></textarea>
                            
                        </div>
                    </b-form-group>
                    <b-form-group
                        class="text-dark"
                        >
                        <div class="AfterElec">
                            Vote Confirmation
                        </div>
                        <p></p>
                        <h6>This is the text that your voters will see after successfully submitting their ballot.</h6>
                        <div class="form-group">
                            <label for="exampleFormControlTextarea1">Example textarea</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" style="font-family: arial" placeholder="Thank you for voting for this election."></textarea>
                            
                        </div>
                    </b-form-group>
                    <b-form-group
                        class="text-dark"
                        >
                        <div class="AfterElec">
                            After Election
                        </div>
                        <p></p>
                        <h6>This is the text that your voters will see when they visit your election after it has ended. You can use this field to post the winners of the election.</h6>
                        <div class="form-group">
                            <label for="exampleFormControlTextarea1">Example textarea</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Voting for this election has closed! Please contact your election administrator if you have any questions."></textarea>
                            
                        </div>
                    <button type="button" class="btn btn-success float-start mt-2">Save</button>

                    </b-form-group>
                      
                        
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
.mes1{
    text-size-adjust: 100px;
}
.botmes{
    font-size: 14px;
    size: 80px;
    background-color:#30F404;
}
</style>
