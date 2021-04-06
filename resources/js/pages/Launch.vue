<template>
    <div>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

        <b-navbar variant="light" type="light">
            <b-navbar-brand>
                <b-nav-text style="color: #000000"><i class="fa fa-rocket"></i>
                    Launch Election
                </b-nav-text>
            </b-navbar-brand>
        </b-navbar>
        
        <div>
            <step-progress :steps="['Step 1','Step 2','Step 3','Step 4']" :current-step="2" icon-class="fa fa-check">
            </step-progress>
        </div>

        <div class="container" style="margin-top: 100px">
            <div class="card">
                <h5 class="card-header"> <i class="fa fa-check"></i>  Confirm Election Details</h5>
                <div class="card-body">
                    <table class="table-striped table table-bordered">
                        <tbody>
                            <tr>
                                <th>Title</th>
                                <td>Election Title</td>
                            </tr>
                            <tr>
                                <th>Start Date</th>
                                <td>Mon., April 5, 2021 11:00 PM  <a class="edit" rule="button" @click="navigate('date')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a></td>
                            </tr>
                            <tr>
                                <th>End Date</th>
                                <td>Thu., April 15, 2021 10:00 PM  <a class="edit" rule="button" @click="navigate('date')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a></td>
                            </tr>
                            <tr>
                                <th>Timezone</th>
                                <td>Asia/Urumqi  <a class="edit" rule="button" @click="navigate('date')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a></td>
                            </tr>
                            <tr>
                                <th>Email Enabled?</th>
                                <td>Enabled  <a class="edit" rule="button" @click="navigate('email_setting')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a></td>
                            </tr>
                            <tr>
                                <th>Weighted Voting Enabled?</th>
                                <td>Disabled  <a class="edit" rule="button" @click="navigate('voter_settings')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a></td>
                            </tr>
                            <tr>
                                <th>Ballot Receipt Enabled?</th>
                                <td>Disabled  <a class="edit" rule="button" @click="navigate('voter_settings')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a></td>
                            </tr>
                        </tbody>
                    </table>
                    <button class="btn">Continue <i class="fa fa-chevron-circle-right"></i></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import StepProgress from 'vue-step-progress';
import 'vue-step-progress/dist/main.css';
export default {
    components: {
        'step-progress': StepProgress
    },
    methods:{
      navigate(name){
        this.$router.push({name:name});
      }
    }
}
</script>

<style scoped>
.table-bordered, .table-bordered td, .table-bordered th {
    border: 1px solid #dee2e6;
}
.table td, .table th {
    padding: .75rem;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
}
.edit {
    color: blue;
    cursor: pointer;
}
.btn {
  background-color: DodgerBlue;
  border: none;
  color: white;
  padding: 12px 16px;
  font-size: 16px;
  cursor: pointer;
}
</style>