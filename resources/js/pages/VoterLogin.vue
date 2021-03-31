<template>
  <div>
    <b-card-group deck class="mx-auto" style="width:400px">
      <b-card
        header="Login to vote"
        header-bg-variant="primary"
        class="mt-5 font-weight-bold text-variant-primary text-light"
        style="max-width: 400px"  
      >
      <label class="float-left dark-text font-weight-bold text-dark">Voter ID</label>
          <input type="text" class="form-control"/>
          <label class="mt-3 float-left dark-text font-weight-bold text-dark">Voter key</label>
          <input type="password" class="form-control"/>
      <div class="mt-4">
        <b-button block variant="success">Login to vote</b-button>
      </div>
      </b-card> 
    </b-card-group>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>
