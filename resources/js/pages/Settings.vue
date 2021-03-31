<template>

    <div>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

  <b-navbar variant="light" type="light">
    <b-navbar-brand>
      <b-nav-text style="color: #000000"><i class="fa fa-cog"></i>
      Settings
      </b-nav-text>
    </b-navbar-brand>
  </b-navbar>

    <div class="row">
        <div class="col-md-3">
            <div class="sidebar">
                <a href="#"><i class="fa fa-cog"></i> General</a>
                <a href="#"><i class="fa fa-times"></i> Close Election</a>
                <a href="#"><i class="fa fa-calendar-check-o"></i> Dates</a>
                <a href="#"><i class="fa fa-users"></i> Voters</a>
                <a href="#"><i class="fa fa-life-ring"></i> Messages</a>
                <a href="#"><i class="fa fa-envelope "></i> Email</a>
                <a href="#"><i class="fa fa-pie-chart"></i> Results</a>
                <a href="#"><i class="fa fa-undo"></i> Duplicate</a>
                <a href="#"><i class="fa fa-trash"></i> Delete</a>
            </div>
        </div>
        <div class="col-md-6">
            example
        </div>
    </div>

</div>
</template>

<style>
.sidebar {
  height: 100%;
  width: 180px;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #fff;
  overflow-x: hidden;
  padding-top: 16px;
}
.sidebar a {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 20px;
  color: #000000;
  display: block;
}
/* Style links on mouse-over */
.sidebar a:hover {
  color: #f1f1f1;
}
@media screen and (max-height: 450px) {
  .sidebar {padding-top: 15px;}
  .sidebar a {font-size: 18px;}
}
</style>
