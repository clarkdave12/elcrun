<template>
    <div>
            <div class="text-center mt-3 mb-3">
                <h2>Election Title</h2>
            </div>
                <b-card-group deck class="mx-auto" style="width: 800px">
                    <b-card
                    header="Ballot Question"
                    header-bg-variant="primary"
                    class="font-weight-bold text-light"
                    style="max-width: 800px"
                    >
                        <b-card body-text-variant="dark">
                            <h6 class="float-left mr-2">Select <b-badge variant="primary">1</b-badge> option from list below.</h6>
                            <p class="font-weight-light">* Required</p>
                        </b-card>
                              <b-card class="mt-1" body-text-variant="dark">
                                <label class="container">
                                  <input type="checkbox" checked="checked">
                                  <b-img class="float-center mr-3" left src="https://picsum.photos/125/125/?image=58" alt="Left image"></b-img>
                                  <span class="checkmark mt-5 mr-2"></span>
                                  <h6 class="float-left ml-2 mt-5">Option 1</h6>
                                  <b-icon class="float-right mt-5" icon="info-circle-fill" variant="primary" font-scale="1"></b-icon>
                                </label>
                                                   
                              </b-card>
                              <b-card class="mt-1" body-text-variant="dark">
                                  <label class="container">
                                    <input type="checkbox" checked="checked">
                                    <b-img class="float-center mr-3" left src="https://picsum.photos/125/125/?image=58" alt="Left image"></b-img>
                                    <span class="checkmark mt-5"></span>
                                    <h6 class="float-left ml-2 mt-5">Option 2</h6>
                                    <b-icon class="float-right mt-5" icon="info-circle-fill" variant="primary" font-scale="1"></b-icon>
                                  </label>                            
                              </b-card> 
                              <b-card class="mt-1" body-text-variant="dark">
                              <label class="container">
                                    <input type="checkbox" checked="checked">
                                    <b-img class="float-center mr-3" left src="https://picsum.photos/125/125/?image=58" alt="Left image"></b-img>
                                    <span class="checkmark mt-5"></span>
                                    <h6 class="float-left ml-2 mt-5">Option 3</h6>
                                    <b-icon class="float-right mt-5" icon="info-circle-fill" variant="primary" font-scale="1"></b-icon>                             
                                  </label>
                                  
                              </b-card> 
                    </b-card>
                </b-card-group>
                <b-card-group deck class="mx-auto mt-2" style="width: 800px">               
                    <b-card style="max-width: 800px">
                        <b-button block variant="success">Submit ballot</b-button>
                    </b-card>
                </b-card-group>    
    </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    }
  }
</script>
<style scoped>
p{
  color: red;
}
.container {
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 30px;
  width: 30px;
  background-color: #eee;
  border-radius: 50%;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #08d808;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 12px;
  top: 9px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>