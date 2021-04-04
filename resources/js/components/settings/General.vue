<template>
  <div>

            <div class="col -1 text- left mt-2 mb-2">
            </div>
                <b-card-group deck class="mx-auto" style="width: 800px">

                  <b-card
                    header="General Settings"
                    header-bg-variant="primary"
                    class="font-weight text-light"
                    style="max-width: 800px margin-left: 150px"
                    >

                        <h6 class="en"><b>Title</b></h6>
                        <input type="title" class="form-control" id="textb" rows="3" placeholder="(COPY) OMSMC DEMO ELECTION">


                    <b-form-group
                        class="description"
                        >
                        <p></p>
                        <div class="form-group">
                            <label for="exampleFormControlTextarea1" class="des"><b>Description</b></label>
                            <textarea class="form-control" id="descript" rows="3" placeholder="Insert Description"></textarea>

                        </div>
                        <h6 class="length">Max Length: 5,000 characters. (5000 remaining)</h6>
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
    #textb{
        height: 35px;
    }

    .description{
        color:black;
        text-align: left;
    }
    .discrip{
        height: 25px;
        width: 750px;
    }
    #icon{
        background-color: #EBF4FA;
    }
    .length{
        color: #AFDCEC ;
        font-size: 12px;
    }
    #descript{
        height: 300px;
        width: 730px;
        color:turquoise;
    }


</style>
