<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h1>Socket</h1>
          </div>

          <socket-commander></socket-commander>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <!-- <span>Card name</span> -->
            <h1>Users</h1>
            <el-button style="float: right; padding: 3px 0" type="text">Operation button</el-button>
          </div>

          <div v-for="o in 4" :key="o" class="text item">
            {{'List item ' + o }}
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import SocketCommander from 'components/SocketCommander';

  export default {
    components: {
      SocketCommander,
      //
    },
    //
  };
</script>

<style scoped>
  .box-card h1 {
    font-size: 14px;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>
