<template>
    <div>
            <div class="col-12 text-center mt-2 mb-5">
                <h2>Election Title</h2>
                <p class="col-12 text-center">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta saepe consectetur ratione at inventore velit eveniet maiores quam nam est deserunt, consequatur ullam fugiat tempora recusandae, ad minima, debitis voluptatum.  </p>
            </div>
                <b-card-group deck class="mx-auto" style="width: 800px">
                    <b-card
                    header="Vote"
                    header-bg-variant="primary"
                    class="font-weight-bold text-light"
                    style="max-width: 800px"
                    >
                        <b-form-group
                        label="Instruction"
                        v-slot="{ ariaDescribedby }"
                        class="text-dark"
                        >
                        <b-card class="text-center">
                            <b-card-text class="float-left"> Select option from the list below</b-card-text>
                        </b-card>
                            <b-form-checkbox-group
                                v-model="selected"
                                :options="options"
                                :aria-describedby="ariaDescribedby"
                                stacked
                                class="mt-3 text-dark"
                            ></b-form-checkbox-group>
                        </b-form-group>  
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
        selected: [],
        options: [
          { text: 'Option 1', value: 'option1' },
          { text: 'Option 2', value: 'option2' },
          { text: 'Option 3', value: 'option3' },
          { text: 'Option 4', value: 'option4' }
        ]
      }
    }
  }
</script>
<style scoped>

</style>